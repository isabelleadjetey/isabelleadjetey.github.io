# Lab CCNA: Rotte Statiche e il Mistero delle "Rotte di Ritorno" 

*🎯 **Obiettivo:** Comprendere a fondo il routing statico e risolvere il classico ticket SNOC del "Ping in Timeout" causato da una rotta di ritorno mancante.*

Molto spesso, in una rete complessa, si è convinti di aver garantito l'accesso a un server, ma i ping continuano a fallire. Questo laboratorio ti svelerà perché "il viaggio di andata non basta".

---

## 1. Topologia del Lab

![Topologia Routing](file:///C:/Users/isabe/.gemini/antigravity/brain/e1926068-084e-433a-8d7b-494500d949c7/static_routing_return_routes_schematic_1776958551111.png)

Configura in PNETLab **due router** (R1 e R2) connessi tra loro, e **due PC** (uno per lato):
*   **LAN 1 (PC1):** 192.168.10.0/24 (collegata a Gi0/1 di R1)
*   **LAN 2 (PC2):** 192.168.20.0/24 (collegata a Gi0/1 di R2)
*   **Link R1-R2:** 10.0.0.0/30 (collegata sulle interfacce Gi0/0 di entrambi)

---

## 2. Preparazione (Layer 1 e 2)
Copia e incolla queste configurazioni base per "accendere" i tuoi router.

### Su R1
```text
enable
configure terminal
! Interfaccia verso PC1
interface GigabitEthernet 0/1
 ip address 192.168.10.254 255.255.255.0
 no shutdown
 exit
! Interfaccia verso R2
interface GigabitEthernet 0/0
 ip address 10.0.0.1 255.255.255.252
 no shutdown
 exit
```

### Su R2
```text
enable
configure terminal
! Interfaccia verso PC2
interface GigabitEthernet 0/1
 ip address 192.168.20.254 255.255.255.0
 no shutdown
 exit
! Interfaccia verso R1
interface GigabitEthernet 0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown
 exit
```

**Sui PC:**
*   **PC1:** `ip 192.168.10.10 255.255.255.0 192.168.10.254` 
*   **PC2:** `ip 192.168.20.10 255.255.255.0 192.168.20.254`

---

## 3. Scena del Crimine: Il Ping Fallito (Perché?)
Dal **PC1** fai un ping verso **PC2** (`ping 192.168.20.10`).
Il ping fallirà e ti darà l'errore: `Destination host unreachable`.

**L'Analisi dello SNOC:**
Questo succede perché R1 non sa assolutamente dove si trovi la rete `192.168.20.0`. Se dai su R1 il comando `show ip route`, vedrai che conosce solo la `192.168.10.0` (la sua LAN) e la `10.0.0.0` (il collegamento con R2). Per R1, PC2 non esiste nell'universo.

---

## 4. La Soluzione a metà (L'Andata)
Dobbiamo dire a R1 come arrivare a LAN 2. Creiamo una **Rotta Statica**.
*   *Sintassi:* `ip route [ReteDestinazione] [SubnetMask] [NextHop]`

Su **R1**, incolla questo:
```text
configure terminal
ip route 192.168.20.0 255.255.255.0 10.0.0.2
```

### Il "Timeout" Misterioso
Vai di nuovo su **PC1** e riprova il `ping 192.168.20.10`.
Questa volta non vedrai "Unreachable", ma vedrai i temuti **asterischi (*) di Timeout**.

**Cos'è successo?**
1. PC1 ha mandato il pacchetto a R1.
2. R1 ora conosce la strada verso LAN 2, quindi lo "lancia" a R2 (Next Hop `10.0.0.2`).
3. R2 manda il pacchetto a PC2. Il pacchetto è arrivato a destinazione con successo!
4. PC2 risponde felice: *"Sì, sono qui!"*, e manda la risposta (Echo Reply) a R2. L'IP di destinazione della risposta è `192.168.10.10` (PC1).
5. **IL DISASTRO:** R2 riceve il pacchetto destinato a LAN 1. R2 guarda la sua Routing Table e dice: *"Chi diamine è 192.168.10.0? Non conosco nessuna strada per arrivarci"* e **BUTTA IL PACCHETTO**.

È mancata la **Rotta di Ritorno**.

---

## 5. La Soluzione Finale
Dobbiamo "insegnare" a R2 come tornare verso la rete di PC1.

Su **R2**, incolla questo:
```text
configure terminal
ip route 192.168.10.0 255.255.255.0 10.0.0.1
```

Ripeti il ping da PC1 e... Magia! 🟢🟢🟢🟢🟢

> Nello SNOC, se vedi un ping "Timeout", significa al 99% che la rotta di andata c'è (altrimenti darebbe Unreachable), ma **esiste un firewall o un router nel mezzo che non ha la rotta per rispondere**. Controlla sempre la tabella di routing di **chi riceve**!

---

## 6. Sfida Avanzata: 3 Router e la "Default Route"

Sei pronta per il livello successivo? Aggiungiamo un terzo router (R3) per simulare l'uscita verso Internet.

![Topologia Challenge](file:///C:/Users/isabe/.gemini/antigravity/brain/e1926068-084e-433a-8d7b-494500d949c7/static_routing_challenge_schematic_1776958840123.png)

### La Sfida SNOC
Invece di usare normali rotte statiche, esploreremo la **Default Route** (`0.0.0.0 0.0.0.0`). È come dire al router: *"Per qualsiasi indirizzo che non conosci, usa questa porta d'uscita"*.

1.  **R1** non deve sapere nulla di reti esterne. Deve avere solo una Default Route verso R2.
2.  **R2** fa da passacarte tra la tua azienda (R1) e l'ISP (R3).
3.  **R3** (ISP) possiede l'indirizzo `8.8.8.8` e deve avere una rotta per rimandare i pacchetti indietro.

### Configurazione di Routing

**Su R1 (Il router di sede):**
```text
! Default Route: Se non sai dove inviare il pacchetto, dallo a R2
ip route 0.0.0.0 0.0.0.0 10.0.12.2
```

**Su R2 (Il router Core aziendale):**
```text
! R2 deve conoscere esattamente dov'è la LAN di PC1
ip route 192.168.10.0 255.255.255.0 10.0.12.1

! E inoltra tutto il traffico sconosciuto verso Internet (R3)
ip route 0.0.0.0 0.0.0.0 10.0.23.2
```

**Su R3 (Il router ISP esterno):**
```text
! L'ISP DEVE sapere come ritornare verso la tua sede!
ip route 192.168.10.0 255.255.255.0 10.0.23.1
```

Dal **PC 1** prova a pingare `8.8.8.8`. Riuscirà ad arrivarci grazie a R1, attraverserà R2 e, grazie alla rotta di ritorno su R3, il pacchetto tornerà indietro vivo e vegeto!

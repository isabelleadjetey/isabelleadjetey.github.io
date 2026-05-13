# Lab CCNA: Routing Ad Anello e Floating Static Routes

*🎯 **Obiettivo:** Gestire rotte statiche in una topologia Enterprise ad anello per evitare Loop, garantendo ridondanza in caso di failover grazie alle **Floating Static Routes** (manipolazione della Administrative Distance).*

Questo lab simula tre filiali aziendali collegate in **Alta Affidabilità (HA)**. In uno scenario ad anello, se il collegamento principale cade, il traffico deve instradarsi automaticamente sul percorso più lungo, passando per un'altra filiale.

---

## 1. Topologia del Lab (Il Triangolo Infrangibile)

![Topologia Ring](file:///C:/Users/isabe/.gemini/antigravity/brain/e1926068-084e-433a-8d7b-494500d949c7/static_routing_ring_schematic_1777047537480.png)

Configura in PNETLab **tre router** (R1, R2, R3) connessi a triangolo, con un **PC** per ogni router:
*   **LAN 1 (R1):** 192.168.10.0/24 
*   **LAN 2 (R2):** 192.168.20.0/24 
*   **LAN 3 (R3):** 192.168.30.0/24 

*Collegamenti P2P (Punto-Punto) tra i Router:*
*   **Link R1-R2:** 10.0.12.0/30 (Es. Gi0/0 su R1 e Gi0/0 su R2)
*   **Link R2-R3:** 10.0.23.0/30 (Es. Gi0/1 su R2 e Gi0/1 su R3)
*   **Link R3-R1:** 10.0.13.0/30 (Es. Gi0/2 su R3 e Gi0/2 su R1)

---

## 2. Preparazione (Interfacce Layer 3)
Assicurati di aver configurato tutti gli indirizzi IP e aver dato `no shutdown` a tutte e 3 le interfacce per router (una per la LAN, due per il ring).

**Esempio di convenzione IP sulle /30:**
*   R1: `.1` sui link verso R2 e R3.
*   R2: `.2` sul link verso R1, `.1` sul link verso R3.
*   R3: `.2` sui link verso R1 e R2.

---

## 3. Sfida: Instradamento Normale (La Via Breve)
Vogliamo che **PC1** comunichi con **PC2**. Il percorso più breve e logico è il collegamento diretto **R1 -> R2**.

**Su R1 (Andata Diretta):**
```text
configure terminal
! Per andare in LAN 2, vai dritto a R2
ip route 192.168.20.0 255.255.255.0 10.0.12.2
```

**Su R2 (Ritorno Diretto):**
```text
configure terminal
! Per rispondere a LAN 1, torna indietro dritto a R1
ip route 192.168.10.0 255.255.255.0 10.0.12.1
```

> [!TIP]
> Verifica con il comando `ping` da PC1 verso PC2. In condizioni normali, i pacchetti faranno R1 <-> R2. Fino a qui, niente di nuovo.

---

## 4. Disaster Recovery: La Rotta di Salvataggio
Cosa succede se il cavo in fibra ottica sotterraneo tra R1 e R2 viene tranciato per errore da un escavatore? Se capita (e credimi, capita spesso!), R1 e R2 non possono più parlarsi direttamente. Ma c'è la scappatoia: **passare da R3**.

Dobbiamo istruire R1 e R2 dicendo: *"Se il cavo diretto è morto, usate R3 come backup"*.

Per farlo usiamo una **Floating Static Route**. È identica a una rotta normale, ma **alla fine del comando ci aggiungiamo un numero** per dirgli di usarla solo come piano B. Quel numero cambia l'**Administrative Distance (AD)**: di default è 1, noi la mettiamo a 10 (peggiore di 1, quindi ignorata finché la primaria non cade).

**Su R1 (Rotta di Salvataggio via R3):**
```text
configure terminal
! Se il link diretto a R2 cade, per arrivare in LAN 2 usa R3!
! (Notare il "10" alla fine del comando)
ip route 192.168.20.0 255.255.255.0 10.0.13.2 10
```

> [!WARNING]
> Riprendi il documento precedente: il salvataggio deve avere sempre anche la Rotta di Ritorno! R3 e R2 devono sapere come comportarsi.

**Su R2 (Ritorno di Salvataggio via R3):**
```text
configure terminal
! Per tornare in LAN 1, usa R3 come backup
ip route 192.168.10.0 255.255.255.0 10.0.23.2 10
```

**Su R3 (L'Anello Intermedio):**
R3 non è la destinazione in nessuno dei due casi, deve solo fare da passacarte per l'andata e per il ritorno quando i due poli sono in disastro.
R3 avrà quindi rotte statiche normalissime verso LAN 1 e LAN 2, in quanto è il fulcro di salvataggio.
```text
configure terminal
! Rotta di "Inoltro" da R2 verso LAN 1
ip route 192.168.10.0 255.255.255.0 10.0.13.1
! Rotta di "Inoltro" da R1 verso LAN 2
ip route 192.168.20.0 255.255.255.0 10.0.23.1
```

---

## 5. Verifica SNOC (Il Banco di Prova)
Una volta configurato l'anello, usa `show ip route` su R1: la Floating Route con AD 10 **non sarà visibile** nella tabella di routing (perché R1 preferisce la strada diretta che ha AD 1). È rimasta nell'ombra.

Ora stacca virtualmente in PNETLab il cavo che collega R1 a R2 e osserva:
1. Ridai il comando `show ip route` su R1: la rotta verso `10.0.12.2` è sparita, ed **è magicamente apparsa la rotta verso `10.0.13.2`**.
2. Il Ping da PC1 a PC2, a parte magari uno o due pacchetti persi per il timeout di convergenza, **tornerà a funzionare**, facendo il mega giro via R3.

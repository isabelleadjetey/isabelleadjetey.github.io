# Lab CCNA: eBGP Peering (PNETLab Edition)

Questo laboratorio ti guida nella configurazione di una sessione **eBGP** tra la tua rete aziendale e un Internet Service Provider (ISP). In PNETLab, puoi usare nodi Cisco IOL (IOS on Linux) o Dynamips per questo esercizio.

---

## 1. Topologia del Lab
Trascina due router sulla tua dashboard di PNETLab e collegali come segue:

*   **R1 (Azienda):** AS 65001
*   **R2 (ISP):** AS 65002

**Connessione Fisica:** Link tra `G0/0` di R1 e `G0/0` di R2.

---

## 2. Piano di Indirizzamento (Addressing)

| Dispositivo | Interfaccia | IP Address | Subnet Mask |
| :--- | :--- | :--- | :--- |
| **R1** | GigabitEthernet0/0 | `192.168.12.1` | `255.255.255.252` (/30) |
| **R1** | Loopback 0 | `1.1.1.1` | `255.255.255.255` (/32) |
| **R2** | GigabitEthernet0/0 | `192.168.12.2` | `255.255.255.252` (/30) |
| **R2** | Loopback 0 | `2.2.2.2` | `255.255.255.255` (/32) |

---

## 3. Guida Passo-Passo

### Step 1: Configurazione Base (IP)
Prima del BGP, assicurati che i due router riescano a pingarsi tra loro.

**Su R1:**
```text
interface loopback 0
 ip address 1.1.1.1 255.255.255.255
interface g0/0
 ip address 192.168.12.1 255.255.255.252
 no shutdown
```

**Su R2:**
```text
interface loopback 0
 ip address 2.2.2.2 255.255.255.255
interface g0/0
 ip address 192.168.12.2 255.255.255.252
 no shutdown
```
*   **Check:** Lancia un `ping 192.168.12.2` da R1. Se non risponde, controlla i cavi in PNETLab!

---

### Step 2: Configurazione eBGP (Il Peering)
Ora facciamo in modo che i router si annuncino le proprie Loopback.

**Su R1:**
```text
router bgp 65001
 neighbor 192.168.12.2 remote-as 65002
 network 1.1.1.1 mask 255.255.255.255
```

**Su R2:**
```text
router bgp 65002
 neighbor 192.168.12.1 remote-as 65001
 network 2.2.2.2 mask 255.255.255.255
```

---

## 4. Verifica e "Snooper Challenge"

### La Verifica
Dopo circa 30-60 secondi (il BGP è lento!), dovresti vedere un log che dice:
`%BGP-5-ADJCHANGE: neighbor 192.168.12.2 Up`

Esegui su R1:
*   `show ip bgp summary`: Dovresti vedere un `1` sotto la colonna `PfxRcd`.
*   `show ip route bgp`: Dovresti vedere la rotta per `2.2.2.2` con il prefisso **B**.

### 🚨 La SNOOC Challenge (Troubleshooting)
Immagina che il BGP non salga e resti in stato `Active`. 
**Situazione tipica da ticket:** Se su R1 scrivi `network 1.1.1.0 mask 255.255.255.0` invece di quella corretta (/32), il BGP **non annuncerà nulla**.
*   **Perché?** Perché il BGP è un pignolo: annuncia una sottorete **solo se** la trova scritta nel modo identico nella tabella di routing (`show ip route`). Dato che la tua Loopback è una /32, lui ignora l'ordine di annunciare una /24.

---

---

## 5. L'Occhio dello SNOC: Il Ruolo di Wireshark (Approfondimento)

In un ambiente di produzione SNOC, non sempre abbiamo accesso a entrambi i router di una sessione BGP. Spesso vediamo solo quello che succede sul nostro "cavo". Wireshark è lo strumento che ci permette di smontare i pacchetti per capire perché una sessione non sale o perché il traffico non fluisce.

### A. Diagnostica "Invisibile" (TCP Porta 179)
Dato che il BGP usa il protocollo **TCP (porta 179)**, Wireshark ci mostra la salute della connessione prima ancora che il BGP inizi a parlare:
*   **TCP Retransmissions (Righe Nere/Rosse):** Segnalano che un router sta provando a contattare il vicino ma non riceve risposta (ACK). Se le vedi, il problema è quasi sempre di Layer 1/2 (cavo giù) o Layer 3 (IP sbagliato o filtro Firewall).
*   **SYN / SYN-ACK:** Vedere questo scambio significa che il "contatto fisico" tra i router è avvenuto con successo.

### B. Analisi dei Messaggi BGP
Usando il filtro `bgp` su Wireshark, puoi analizzare le quattro fasi della vita di un peering:
1.  **OPEN:** È il contratto iniziale. Qui puoi controllare se i numeri di **AS (Autonomous System)** dichiarati dai due router coincidono con la configurazione.
2.  **KEEPALIVE:** Sono i battiti del cuore. Se passano più di 180 secondi (Hold Time) senza vederne uno, la sessione morirà (Idle).
3.  **UPDATE:** È il contenuto reale. Aprendo un pacchetto di Update, puoi leggere:
    *   **NLRI (Network Layer Reachability Information):** L'indirizzo IP e la Mask che stanno venendo annunciati.
    *   **AS-Path:** La lista di AS che la rotta ha già attraversato (fondamentale per evitare loop).
    *   **Next Hop:** L'indirizzo IP del "mittente" a cui inviare i dati per quella rotta.
4.  **NOTIFICATION:** Il "messaggio d'addio". Se vedi questo pacchetto, il BGP ti sta dicendo esattamente **perché** sta chiudendo la sessione (es. "Hold Timer Expired" o "Bad Peer AS").

### C. Come catturare in PNETLab
Per attivare questa "super-vista" sui tuoi router:
1.  Fai **tasto destro sull'icona del Router** (es. R1).
2.  Seleziona **Capture** -> Scegli l'interfaccia collegata al vicino (es. `G0/0` o `E0/0`).
3.  Se Wireshark è già aperto e la sessione è già *Established*, lancia il comando `clear ip bgp * soft` sul router per forzare lo scambio di nuovi messaggi da osservare.

# Lab CCNA: ACL Standard ed Estese (PNETLab)

*🎯 **Obiettivo:** Configurare il "Buttafuori" della rete per proteggere i server aziendali.*

In questo laboratorio useremo **PNETLab** per simulare un'architettura reale dove dobbiamo filtrare chi può accedere a cosa.

---

## 1. Topologia del Lab

![Topologia Schematica 3 LAN](file:///C:/Users/isabe/.gemini/antigravity/brain/e1926068-084e-433a-8d7b-494500d949c7/acl_lab_schematic_3lan_1776872685094.png)

Configura il router R1 con tre sottoreti fisiche (una per switch) e una Loopback:
*   **Segmento LAN 1 (Users A):** 192.168.10.0/24 (Gi0/1)
*   **Segmento LAN 2 (Users B):** 192.168.20.0/24 (Gi0/2)
*   **Segmento Server (Farm):** 192.168.30.0/24 (Gi0/3)
*   **Internet (Loopback):** 8.8.8.8/32 (Interface Lo0)

---

## 2. Esercizio 1: ACL Standard (Il Buttafuori pigro)
Vogliamo impedire a **tutto il dipartimento Guest** (172.16.0.0) di parlare con i **Server**.

### Configurazione su R1 (Il router che collega i segmenti)
```text
! 1. Crea l'ACL Standard (IP sorgente e basta)
access-list 10 deny 172.16.0.0 0.0.255.255
access-list 10 permit any  <-- Ricorda: se non metti questo, blocchi TUTTI!

! 2. Applica l'ACL (Regola: Più vicino possibile alla DESTINAZIONE)
interface GigabitEthernet 0/2 (quella che va verso i Server)
 ip access-group 10 out       <-- Applica in uscita verso i server
```

---

## 3. Esercizio 2: ACL Estesa (Il Buttafuori chirurgo)
Ora vogliamo essere più precisi. Vogliamo che i **Client** (192.168.10.0) possano usare il **Sito Web** dei Server (porta 80/443) ma non possano fare nient'altro (niente Ping, niente Telnet).

### Configurazione su R1
```text
! 1. Crea l'ACL Estesa (Sorgente, Destinazione e Protocollo)
ip access-list extended PROTEZIONE_WEB_SRV
 permit tcp 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255 eq 80
 permit tcp 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255 eq 443
 deny ip any any (opzionale, già implicito)

! 2. Applica l'ACL (Regola: Più vicino possibile alla SORGENTE)
interface GigabitEthernet 0/1 (quella che viene dai Client)
 ip access-group PROTEZIONE_WEB_SRV in  <-- Applica in entrata nel router
```

---

## 4. Verifica e Troubleshooting

### La prova del nove (Ping e Telnet)
1.  Prova a fare un **PING** dai Client ai Server: dovrebbe fallire (scartato dall'ACL estesa).
2.  Prova a simulare una connessione web: `telnet 192.168.20.10 80` (se risponde "Open", l'ACL sta funzionando!).

### Comandi Show
*   **`show ip access-lists`**: Guarda i numeri accanto a `matches`. Se aumentano mentre provi a pingare, significa che l'ACL sta facendo il suo lavoro.
*   **`show ip interface [id]`**: Scorri fino a vedere `Inbound access list is ...` per essere sicura di averla applicata sulla porta giusta.

---

## 5. Sfida SNOC: L'Implicit Deny
Aggiungi un'ACL che permetta il traffico ICMP (ping) ma dimentica il `permit any`. Osserva come tutta la navigazione web smette di funzionare improvvisamente. In produzione, questo errore causa ticket di gravità massima!

Hai tutto chiaro per montare questa topologia in PNETLab? 🛠️

---

### Appendice: Configurazione Interfacce Router R1 (3 LAN + Loopback)
Copia e incolla questi comandi nella console del router **R1**:

```text
enable
configure terminal

! --- INTERFACCIA LAN 1 ---
interface GigabitEthernet 0/1
 description *** LAN 1 - USERS A ***
 ip address 192.168.10.1 255.255.255.0
 no shutdown
 exit

! --- INTERFACCIA LAN 2 ---
interface GigabitEthernet 0/2
 description *** LAN 2 - USERS B ***
 ip address 192.168.20.1 255.255.255.0
 no shutdown
 exit

! --- INTERFACCIA SERVER FARM ---
interface GigabitEthernet 0/3
 description *** SERVER FARM ***
 ip address 192.168.30.1 255.255.255.0
 no shutdown
 exit

! --- INTERFACCIA INTERNET (VIRTUALE) ---
interface Loopback 0
 description *** SIMULATED INTERNET ***
 ip address 8.8.8.8 255.255.255.255
 exit

write memory
```

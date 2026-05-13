# CCNA Journey: Soluzioni del Super Quiz "Sede Sorint" ✅

Di seguito trovi le soluzioni commentate alle 25 domande di preparazione. Usale per verificare il tuo livello di comprensione dopo aver provato a rispondere nel file delle domande.

---

### Sezione 1: Layer 2 (Switching & STP)
1.  **EtherChannel:** La banda totale diminuisce (es. da 400Mbps a 300Mbps), ma il Port-channel resta in stato "Up" (SU). Il traffico viene ridistribuito sui link restanti senza interruzioni.
2.  **STP:** Usa la **Bridge Priority** (default 32768). I BPDU vengono inviati ogni **2 secondi**.
3.  **VLAN/Trunk:** No. Una porta Access appartiene a una sola VLAN. Per trasportare più VLAN serve un **Trunk** che aggiunge i Tag 802.1Q.
4.  **STP States:** **Listening** (15 sec) e **Learning** (15 sec). In totale 30 secondi di ritardo prima del Forwarding.
5.  **DTP:** Per evitare attacchi di **"VLAN Hopping"** o negoziazioni di trunk non autorizzate. Spegnere la negoziazione (`nonegotiate`) è una best practice di sicurezza.

### Sezione 2: Layer 3 (Routing & OSPF)
6.  **Router-on-a-Stick:** Serve a identificare a quale sotto-interfaccia logica appartiene ogni frame che arriva dall'unico cavo fisico (multiplexing basato sul VLAN ID).
7.  **OSPF:** La metrica è il **Costo**, calcolato come `100 Mbps / Larghezza di banda del link`.
8.  **AD:** Sceglierà la **Rotta Statica** perché ha l'Administrative Distance più bassa (1 contro 110 dell'OSPF).
9.  **OSPF ID:** 1. Comando manuale (`router-id`), 2. IP Loopback più alto, 3. IP interfaccia fisica attiva più alto.
10. **Default Route:** Il comando è `default-information originate`.

### Sezione 3: IP Services (NAT & DHCP)
11. **NAT/PAT:** I **Numeri di Porta** (TCP/UDP) univoci assegnati a ogni sessione.
12. **DHCP:** Trasforma i broadcast DHCP in unicast diretti a un server remoto. Va configurato sull'interfaccia (Gateway) che riceve i broadcast dai PC.
13. **DORA:** Il **Request**. Lo invia il PC (Client) per confermare l'IP che gli è stato offerto dal server.
14. **DHCP Pool:** Bisogna usare il comando globale `ip dhcp excluded-address [inizio] [fine]`.
15. **Static NAT:** Si usa per i **Server** interni che devono essere raggiungibili dall'esterno su un IP pubblico fisso e costante.

### Sezione 4: Security (Hardening & Port Security)
16. **Port Security:** `Shutdown` mette la porta in `err-disabled` (spenta). `Restrict` lascia la porta `Up` ma scarta il traffico illegale e incrementa il contatore delle violazioni.
17. **Sticky:** Scrive il MAC imparato direttamente nella `running-config`, rendendolo persistente dopo il salvataggio (`wr`).
18. **DHCP Snooping:** Lo switch scarta il pacchetto e può bloccare la porta, perché le offerte DHCP sono permesse solo su porte "Trusted".
19. **SSH:** Un **Hostname** e un **Domain-name** (servono per generare le chiavi RSA).
20. **Portfast:** Perché disabilita i controlli STP iniziali; se collegata a un altro switch, potrebbe creare un loop di rete istantaneo.

### Sezione 5: IPv6, Monitoraggio & Troubleshooting
21. **IPv6:** `2001:DB8::ABCD:0:1` (Gli zeri consecutivi diventano `::`, ma solo una volta!).
22. **IPv6 LL:** Prefisso `FE80::/10`. Servono per la comunicazione nel segmento locale e per l'auto-configurazione.
23. **Syslog:** Per conservare i log nel tempo (gli switch hanno buffer limitati) e per centralizzare l'analisi degli eventi SNOC.
24. **Troubleshooting L2:** `S`=Layer 2, `D`=Down. Significa che l'EtherChannel è configurato ma non è attivo (probabile mismatch di configurazione).
25. **CDP:** Perché trasmette informazioni sensibili (modello, IP, versione OS) in chiaro, facilitando il riconoscimento della rete da parte di un attaccante.

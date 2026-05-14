# CCNA Journey: Soluzioni del Super Quiz "Enterprise Core" ✅

In questo documento trovi le domande del quiz integrate con le relative soluzioni commentate. Usalo per il ripasso finale e per verificare la tua comprensione dei concetti chiave.

---

### Sezione 1: Layer 2 (Switching & STP)

1.  **DOMANDA: Se hai un EtherChannel LACP composto da 4 link fisici e uno di questi si rompe, cosa succede alla banda totale e allo stato del Port-channel?**
    **SOLUZIONE:** La banda totale diminuisce (es. da 400Mbps a 300Mbps), ma il Port-channel resta in stato "Up" (SU). Il traffico viene ridistribuito sui link restanti in modo trasparente e senza interruzioni di servizio.

2.  **DOMANDA: Qual è il parametro principale che STP usa per eleggere il Root Bridge e ogni quanto viene inviato il messaggio BPDU?**
    **SOLUZIONE:** STP usa il **Bridge ID**, composto da **Bridge Priority** (default 32768) e MAC Address. I messaggi BPDU (Bridge Protocol Data Units) vengono inviati ogni **2 secondi**.

3.  **DOMANDA: Una porta in modalità "Access" può trasportare traffico di più VLAN contemporaneamente? Perché?**
    **SOLUZIONE:** No. Una porta in modalità Access appartiene a una sola VLAN per definizione. Per trasportare traffico di più VLAN su un unico collegamento fisico è necessario un **Trunk**, che aggiunge i Tag 802.1Q ai frame.

4.  **DOMANDA: Quali sono i due stati di transizione che una porta attraversa prima di arrivare in "Forwarding" nell'STP classico (802.1D)? Quanto dura ciascuno?**
    **SOLUZIONE:** La porta attraversa gli stati di **Listening** (15 secondi) e **Learning** (15 secondi). In totale, occorrono 30 secondi prima che il traffico inizi a fluire.

5.  **DOMANDA: Perché in una rete sicura (SNOC) è consigliabile usare il comando `switchport nonegotiate`?**
    **SOLUZIONE:** Per prevenire attacchi di **VLAN Hopping**. Disabilitando il protocollo DTP (Dynamic Trunking Protocol), impediamo che un malintenzionato possa negoziare un trunk non autorizzato e accedere a VLAN a cui non dovrebbe avere accesso.

---

### Sezione 2: Layer 3 (Routing & OSPF)

6.  **DOMANDA: Perché è necessario il protocollo 802.1Q (dot1Q) su un'interfaccia Router-on-a-Stick?**
    **SOLUZIONE:** Serve a permettere al router di "capire" a quale VLAN appartiene ogni frame che arriva sull'interfaccia fisica condivisa. Senza il tag 802.1Q, il router non saprebbe a quale sotto-interfaccia logica (sub-interface) destinare il pacchetto.

7.  **DOMANDA: Qual è la metrica predefinita usata da OSPF e come viene calcolata?**
    **SOLUZIONE:** La metrica è il **Costo**. Viene calcolata dividendo la *Reference Bandwidth* (default 100 Mbps) per la larghezza di banda dell'interfaccia. Minore è il costo, migliore è la rotta.

8.  **DOMANDA: Se un router impara la rotta per la stessa rete sia tramite OSPF (AD 110) che tramite una Rotta Statica (AD 1), quale sceglierà di inserire nella tabella di routing?**
    **SOLUZIONE:** Sceglierà la **Rotta Statica**, perché ha l'Administrative Distance (AD) più bassa. Il router preferisce sempre la fonte di routing che ritiene più affidabile (AD minore).

9.  **DOMANDA: Qual è l'ordine di priorità per l'elezione del OSPF Router ID?**
    **SOLUZIONE:** 1. Comando manuale (`router-id`), 2. IP più alto tra le interfacce Loopback attive, 3. IP più alto tra le interfacce fisiche attive.

10. **DOMANDA: Qual è il comando OSPF per propagare la rotta di default verso gli altri router della rete?**
    **SOLUZIONE:** Il comando è `default-information originate` (all'interno della configurazione `router ospf`).

---

### Sezione 3: IP Services (NAT & DHCP)

11. **DOMANDA: In una configurazione NAT Overload (PAT), cos'è che permette a centinaia di PC di navigare usando un solo indirizzo IP pubblico?**
    **SOLUZIONE:** L'uso dei **numeri di porta** (TCP/UDP) univoci. Il router mappa la coppia "IP Privato + Porta Sorgente" a una porta univoca sull'IP Pubblico esterno.

12. **DOMANDA: Cosa fa il comando `ip helper-address` e dove va configurato esattamente?**
    **SOLUZIONE:** Trasforma i broadcast DHCP provenienti dai client in messaggi unicast diretti a un server DHCP remoto. Va configurato sull'interfaccia (o sub-interface) che fa da Gateway per i client.

13. **DOMANDA: Qual è il terzo passaggio del processo DHCP (la "R" di DORA) e chi invia quel messaggio?**
    **SOLUZIONE:** È il **DHCP Request**. Viene inviato dal Client (PC) per confermare al server che accetta l'offerta di indirizzo IP ricevuta precedentemente.

14. **DOMANDA: Se vuoi evitare che il server DHCP assegni l'IP del gateway (es. .254) a un PC, quale comando devi usare?**
    **SOLUZIONE:** Bisogna usare il comando in configurazione globale: `ip dhcp excluded-address 192.168.10.254`.

15. **DOMANDA: In quale scenario useresti un NAT Statico 1-a-1 invece del PAT?**
    **SOLUZIONE:** Quando hai un **Server interno** (es. Web o Mail) che deve essere sempre raggiungibile dall'esterno su un IP pubblico dedicato e fisso, senza dipendere dal cambio dinamico delle porte.

---

### Sezione 4: Security (Hardening & Port Security)

16. **DOMANDA: Qual è la differenza tra la violazione `Shutdown` e `Restrict` in termini di stato della porta fisica?**
    **SOLUZIONE:** Con `Shutdown` la porta viene disabilitata completamente (stato `err-disabled`). Con `Restrict`, la porta rimane `Up` (accesa), ma scarta il traffico non autorizzato, incrementa un contatore e invia un avviso Syslog.

17. **DOMANDA: Qual è il vantaggio principale di usare `sticky` invece dell'apprendimento dinamico standard nel Port Security?**
    **SOLUZIONE:** Il comando `sticky` scrive automaticamente i MAC address imparati nella configurazione in esecuzione (`running-config`). Questo li rende persistenti anche dopo un riavvio (previa salvataggio).

18. **DOMANDA: Cosa succede se uno switch riceve un messaggio "DHCP Offer" su una porta classificata come "Untrusted"?**
    **SOLUZIONE:** Lo switch scarta immediatamente il pacchetto. Questo previene l'attacco di "Rogue DHCP Server", dove un PC malevolo tenta di fingersi il server DHCP della rete.

19. **DOMANDA: Quali sono i due requisiti fondamentali sul router/switch prima di poter generare le chiavi RSA per l'SSH?**
    **SOLUZIONE:** Il dispositivo deve avere configurato un **Hostname** e un **IP Domain-name**.

20. **DOMANDA: Perché il comando `spanning-tree portfast` va configurato SOLO sulle porte verso i PC e mai tra gli switch?**
    **SOLUZIONE:** Perché Portfast disabilita i controlli STP per prevenire loop. Se collegato a un altro switch, un errore di cablaggio creerebbe un loop istantaneo che farebbe cadere l'intera rete.

---

### Sezione 5: IPv6, Monitoraggio & Troubleshooting

21. **DOMANDA: Comprimi il seguente indirizzo IPv6: `2001:0DB8:0000:0000:0000:ABCD:0000:0001`.**
    **SOLUZIONE:** `2001:DB8::ABCD:0:1` (Si rimuovono gli zeri iniziali e la sequenza più lunga di gruppi di soli zeri viene sostituita da `::`).

22. **DOMANDA: Qual è il prefisso standard degli indirizzi Link-Local in IPv6? A cosa servono?**
    **SOLUZIONE:** Il prefisso è `FE80::/10`. Servono per la comunicazione all'interno del singolo segmento di rete (Layer 2) e per l'auto-configurazione delle interfacce.

23. **DOMANDA: Perché è fondamentale avere un server Syslog centralizzato in uno SNOC invece di guardare i log localmente?**
    **SOLUZIONE:** Per tre motivi: 1. I log non vanno persi se il dispositivo si riavvia. 2. È possibile correlare eventi tra diversi dispositivi. 3. Gli switch hanno una memoria limitata per i log locali (buffer).

24. **DOMANDA: Se il comando `show etherchannel summary` mostra lo stato `(SD)`, cosa sta succedendo al link?**
    **SOLUZIONE:** `S` significa Layer 2, `D` significa Down. Il Port-channel è configurato ma non è attivo, indicando probabilmente un mismatch nei protocolli o nei parametri tra i due switch.

25. **DOMANDA: Perché è considerato una falla di sicurezza lasciare CDP attivo sulle porte rivolte verso l'esterno dell'azienda?**
    **SOLUZIONE:** Perché il protocollo CDP trasmette informazioni sensibili (modello del dispositivo, versione IOS, indirizzi IP di management) in chiaro, fornendo a un potenziale attaccante una mappa dettagliata della nostra rete.

---
*(Creato per Isabelle - CCNA Allineamento 2026)*

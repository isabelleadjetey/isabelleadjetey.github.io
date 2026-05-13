# CCNA Journey: Super Quiz di Preparazione "Sede Sorint" (25 Domande) 🚀

Questo quiz è progettato per testare la tua preparazione a 360° in vista dell'allineamento di giovedì. Copre Layer 2, Layer 3, Sicurezza, Servizi IP e Troubleshooting.

---

## 📝 Le Domande

### Sezione 1: Layer 2 (Switching & STP)
1.  **EtherChannel:** Se hai un EtherChannel LACP composto da 4 link fisici e uno di questi si rompe, cosa succede alla banda totale e allo stato del Port-channel?
2.  **Spanning Tree:** Qual è il parametro principale che STP usa per eleggere il Root Bridge e ogni quanto viene inviato il messaggio BPDU?
3.  **VLAN/Trunk:** Una porta in modalità "Access" può trasportare traffico di più VLAN contemporaneamente? Perché?
4.  **STP States:** Quali sono i due stati di transizione che una porta attraversa prima di arrivare in "Forwarding" nell'STP classico (802.1D)? Quanto dura ciascuno?
5.  **DTP:** Perché in una rete sicura (SNOC) è consigliabile usare il comando `switchport nonegotiate`?

### Sezione 2: Layer 3 (Routing & OSPF)
6.  **Router-on-a-Stick:** Perché è necessario il protocollo 802.1Q (dot1Q) su un'interfaccia Router-on-a-Stick?
7.  **OSPF:** Qual è la metrica predefinita usata da OSPF e come viene calcolata?
8.  **Administrative Distance:** Se un router impara la rotta per la stessa rete sia tramite OSPF (AD 110) che tramite una Rotta Statica (AD 1), quale sceglierà di inserire nella tabella di routing?
9.  **OSPF Router ID:** Qual è l'ordine di priorità per l'elezione del Router ID (chi vince tra Loopback, Fisiche e comando manuale)?
10. **Default Route:** Qual è il comando OSPF per propagare la rotta di default verso gli altri router della rete?

### Sezione 3: IP Services (NAT & DHCP)
11. **NAT/PAT:** In una configurazione NAT Overload, cos'è che permette a centinaia di PC di navigare usando un solo indirizzo IP pubblico?
12. **DHCP:** Cosa fa il comando `ip helper-address` e dove va configurato esattamente?
13. **DORA:** Qual è il terzo passaggio del processo DHCP (la "R" di DORA) e chi invia quel messaggio?
14. **DHCP Pool:** Se vuoi evitare che il server DHCP assegni l'IP del gateway (es. .254) a un PC, quale comando devi usare?
15. **Static NAT:** In quale scenario useresti un NAT Statico 1-a-1 invece del PAT?

### Sezione 4: Security (Hardening & Port Security)
16. **Port Security:** Qual è la differenza tra la violazione `Shutdown` e `Restrict` in termini di stato della porta fisica?
17. **MAC Address Sticky:** Qual è il vantaggio principale di usare `sticky` invece dell'apprendimento dinamico standard?
18. **DHCP Snooping:** Cosa succede se uno switch riceve un messaggio "DHCP Offer" su una porta classificata come "Untrusted"?
19. **SSH:** Quali sono i due requisiti fondamentali sul router/switch prima di poter generare le chiavi RSA per l'SSH?
20. **Portfast:** Perché il comando `spanning-tree portfast` va configurato SOLO sulle porte verso i PC e mai tra gli switch?

### Sezione 5: IPv6, Monitoraggio & Troubleshooting
21. **IPv6 Compression:** Comprimi il seguente indirizzo secondo le regole ufficiali: `2001:0DB8:0000:0000:0000:ABCD:0000:0001`.
22. **IPv6 Link-Local:** Qual è il prefisso standard degli indirizzi Link-Local in IPv6? A cosa servono?
23. **Syslog:** Perché è fondamentale avere un server Syslog centralizzato in uno SNOC invece di guardare i log localmente?
24. **Troubleshooting L2:** Se il comando `show etherchannel summary` mostra lo stato `(SD)`, cosa sta succedendo al link?
25. **CDP/LLDP:** Perché è considerato una falla di sicurezza lasciare CDP attivo sulle porte rivolte verso l'esterno dell'azienda?

---

## ✅ Soluzioni

Le soluzioni sono state spostate in un file separato per permetterti di testare la tua preparazione senza distrazioni:

👉 **[CCNA_Mega_Lab_Quiz_Solutions.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/CCNA_Mega_Lab_Quiz_Solutions.md)**

Buona fortuna con il test! 🚀

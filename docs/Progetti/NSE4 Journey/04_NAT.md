# Lesson 4: Network Address Translation (NAT)

## Modalità di NAT
- **Firewall Policy NAT:** Il NAT viene configurato direttamente all'interno della singola regola firewall.
- **Central NAT:** Tabella NAT separata dalle regole di sicurezza (stile Cisco ASA/CheckPoint). Utile per reti molto complesse.

## Source NAT (SNAT)
Maschera l'IP sorgente della rete privata verso l'esterno.
- **Use Outgoing Interface Address:** Tutti i client escono con l'unico IP pubblico dell'interfaccia WAN. Applica il PAT (Port Address Translation) per differenziare le connessioni.
- **Dynamic IP Pool:** Usa un range o IP pubblici aggiuntivi.
  - *Overload:* Default. Molti-a-uno o molti-a-pochi. Applica il PAT.
  - *One-to-One:* Senza PAT. Se ho 5 IP pubblici, solo 5 PC interni possono navigare simultaneamente.
  - *Fixed Port Range:* Assegna blocchi di porte fissi agli IP interni.

## Destination NAT (DNAT)
Espone servizi interni su Internet.
- Si realizza creando oggetti **VIP (Virtual IPs)**.
- Mappa un IP Pubblico esterno a un IP Privato interno (es. un Web Server).
- I VIPs nelle policy scavalcano le regole di blocco classiche per quel traffico in ingresso.

## Session Helpers
- Permettono a protocolli complessi (es. FTP, SIP) di funzionare attraverso il NAT.
- Modificano l'indirizzo IP all'interno del *payload* (Layer 7), dato che il NAT puro agisce solo a Layer 3.

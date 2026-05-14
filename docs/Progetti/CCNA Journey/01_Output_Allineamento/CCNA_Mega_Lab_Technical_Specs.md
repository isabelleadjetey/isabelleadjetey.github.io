# Technical Specifications: CCNA Mega Lab "Enterprise Core"

> **DOCUMENTO DI SPECIFICA TECNICA**  
> **Oggetto:** Implementazione e Hardening di un'infrastruttura di rete Enterprise.  
> **Status:** Challenge / Assessment.

---

## 1. Obiettivo del Progetto
L'obiettivo è la realizzazione di una rete gerarchica resiliente e sicura. Il candidato deve configurare l'intera infrastruttura partendo dai dispositivi "factory default", assicurando connettività end-to-end, ridondanza di Layer 2 e protezione contro gli attacchi comuni.

---

## 2. Topologia di Rete
![Topologia di Rete CCNA Mega Lab](../04_Risorse_Tecniche/mega_lab_topology.png)

---

## 3. Tabella di Indirizzamento (Requisiti IP)

| Dispositivo | Interfaccia / VLAN | Indirizzo IP | Gateway |
| :--- | :--- | :--- | :--- |
| **R1** | Gi0/0 (Verso ISP) | 203.0.113.2/30 | ISP IP |
| **R1** | Sub-interfaces | VLAN 10 & 20 | N/A |
| **PC-1** | VLAN 10 | DHCP | DHCP |
| **PC-2** | VLAN 10 | DHCP | DHCP |
| **SRV-MGMT**| VLAN 20 | 192.168.20.100/24 | 192.168.20.254 |
| **Loopback ISP**| Simulazione Internet | 8.8.8.8/32 | N/A |

---

## 3. Elenco dei Task Operativi

### Task 1: Infrastruttura Layer 2 (Switching)
1.  **Segmentazione**: Creare le VLAN 10 (DATI) e 20 (MGMT) su tutti gli switch.
2.  **Ridondanza Link**: Configurare un EtherChannel LACP (modalità attiva) tra SW-ACC e SW-CORE.
3.  **Trunking**: Configurare i link tra gli switch e verso il router come Trunk 802.1Q, permettendo solo le VLAN necessarie.
4.  **Ottimizzazione STP**: Eleggere forzatamente lo SW-CORE come Root Bridge per tutte le VLAN.
5.  **Accesso Rapido**: Abilitare PortFast sulle porte dedicate ai PC e al Server.

### Task 2: Connettività Layer 3 (Routing)
1.  **Inter-VLAN Routing**: Implementare l'architettura Router-on-a-Stick su R1.
2.  **Routing Dinamico**: Configurare OSPF (Area 0) per scambiare le rotte interne.
3.  **Gateway Esterno**: Configurare una rotta di default verso l'ISP.
4.  **Propagazione**: Assicurarsi che R1 annunci automaticamente la rotta di default agli altri dispositivi OSPF.

### Task 3: Servizi Enterprise
1.  **Indirizzamento**: Configurare R1 come DHCP Server per la VLAN 10, escludendo gli IP dei gateway.
2.  **Risoluzione Nomi**: Integrare il DNS di Google (8.8.8.8) nelle offerte DHCP.
3.  **Connettività WAN**: Implementare il NAT Overload (PAT) sull'interfaccia esterna di R1.
4.  **Sincronizzazione**: Configurare i dispositivi per sincronizzare l'orario con il server di management.

### Task 4: Sicurezza e Hardening (SNOC Standard)
1.  **Accesso Criptato**: Disabilitare Telnet e abilitare SSH (RSA 1024+).
2.  **Protezione Layer 2**: 
    *   Configurare il Port Security (Sticky MAC) sulle porte degli utenti.
    *   Implementare il DHCP Snooping per prevenire Rogue DHCP Server.
3.  **Legal Warning**: Aggiungere un Banner MOTD con avviso legale su ogni dispositivo.

---

## 4. Criteri di Accettazione (Verifica)
Il progetto si considera concluso con successo solo se:
*   [ ] PC-1 riceve un indirizzo IP corretto via DHCP.
*   [ ] PC-1 riesce a completare un `ping 8.8.8.8`.
*   [ ] L'EtherChannel rimane operativo anche se uno dei link fisici viene rimosso.
*   [ ] L'accesso SSH è protetto da utente locale e password secret.

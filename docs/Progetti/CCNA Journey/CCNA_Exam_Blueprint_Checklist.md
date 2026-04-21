# CCNA 200-301 Full Blueprint Checklist

Questo documento serve a tracciare i progressi del tuo **CCNA Journey**. La lista segue pedissequamente i 6 domini ufficiali di Cisco, con l'aggiunta di una sezione speciale per le competenze SNOC (BGP).

---

## 🏛️ Dominio 1: Network Fundamentals (20%) - [x] COMPLETATO
*   `[x]` Spiegare il ruolo e la funzione dei componenti di rete (Router, Switch L2/L3, Firewall, Access Point, Endpoint).
*   `[x]` Descrivere le caratteristiche delle architetture di rete (2-tier, 3-tier, Spine-leaf).
*   `[x]` Confrontare i protocolli OSI vs TCP/IP.
*   `[x]` IPv4: Subnetting (VLSM) e configurazione.
*   `[x]` IPv6: Unicast, Anycast, Link-local e configurazione base.
*   `[x]` Fondamenti di Virtualizzazione e Cloud.

---

## 🏗️ Dominio 2: Network Access (20%) - [x] COMPLETATO
*   `[x]` Configurazione e verifica delle **VLAN** (Normal range e Voice VLAN).
    *   *📄 Recap:* [VLAN_Trunking_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/VLAN_Trunking_Recap.md)
*   `[x]` Configurazione del **Trunking** (802.1Q) e Native VLAN.
*   `[x]` Protocolli di scoperta: CDP e LLDP.
*   `[x]` **STP (Spanning Tree Protocol)**: Concetti base e Rapid PVST+.
    *   *📄 Recap:* [STP_RSTP_Fundamentals.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/STP_RSTP_Fundamentals.md)
*   `[x]` **EtherChannel** (LACP): Aggregazione di link.
    *   *📄 Recap:* [EtherChannel_LACP_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/EtherChannel_LACP_Recap.md)
*   `[x]` Concetti Wireless: WLC, AP, SSID, Encryption (WPA2/WPA3).

---

## 🗺️ Dominio 3: IP Connectivity (25%) - [/] IN CORSO
*   `[x]` Interpretare i componenti della routing table (Prefix, Mask, Next Hop, AD, Metric).
*   `[x]` Routing Statico (Default route, Network route, Floating static).
*   `[x]` **OSPFv2 Single Area**: Configurazione e neighbor adjacency.
    *   *📄 Recap:* [OSPF_Lab_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/OSPF_Lab_Recap.md)
*   `[x]` **FHRP (First Hop Redundancy Protocol)**: Concetti e HSRP.
    *   *📄 Recap:* [HSRP_FHRP_Lab_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/HSRP_FHRP_Lab_Recap.md)
*   `[x]` OSPFv2 Multi-area (Completato tramite Lab 20-1).

---

## 🛠️ Dominio 4: IP Services (10%) - [/] IN CORSO
*   `[x]` **NAT (Network Address Translation)**: Statico, Dinamico e PAT.
    *   *📄 Recap:* [NAT_Lab_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/NAT_Lab_Recap.md)
*   `[x]` **DHCP**: Client, Server e Relay Agent (ip helper-address).
    *   *📄 Recap:* [DHCP_Lab_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/DHCP_Lab_Recap.md)
*   `[ ]` NTP, SNMP, Syslog (Configurazione e analisi).
*   `[ ]` Perceptive di QoS (Quality of Service): Classification, Marking, Queuing.

---

## 🔐 Dominio 5: Security Fundamentals (15%) - [/] IN CORSO
*   `[x]` Password Policy, Password Encryption, SSH.
    *   *📄 Recap:* [Security_Device_Hardening.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/Security_Device_Hardening.md)
*   `[x]` **Access Control Lists (ACL)**: Standard ed Estese.
    *   *📄 Recap:* [ACL_Standard_Extended_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/ACL_Standard_Extended_Recap.md)
*   `[x]` Layer 2 Security: Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI).
    *   *📄 Recap:* [L2_Security_Hardening_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/L2_Security_Hardening_Recap.md)
*   `[x]` VPN Concepts: IPsec e GRE.
    *   *📄 Recap:* [VPN_Concepts_Fundamentals.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/VPN_Concepts_Fundamentals.md)
*   `[ ]` Configurare e verificare il wireless security (WPA, WPA2, WPA3).

---

## 🤖 Dominio 6: Automation & Programmability (10%) - [ ] DA INIZIARE
*   `[ ]` Confrontare la gestione tradizionale vs Controller-based (SDN).
*   `[ ]` REST API e formati dati (JSON).
*   `[ ]` Concetti di Configuration Management (Ansible, Puppet, Chef).

---

## 🚀 Sezione Speciale: Competenze SNOC (Extra CCNA) - [x] COMPLETATO
*   `[x]` Fondamenti di **BGP** (AS, Path Vector, eBGP vs iBGP).
    *   *📄 Recap:* [BGP_Basics_Recap.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/BGP_Basics_Recap.md)
*   `[x]` Laboratorio Pratico di Peering eBGP.
    *   *📄 Lab:* [Lab_BGP_Peer_Basic.md](file:///c:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/Lab_BGP_Peer_Basic.md)
*   `[x]` Analisi pacchetti BGP con Wireshark.

---

## 📚 Risorse di Studio
*   **Jeremy's IT Lab (YouTube):** Utilizzato per il consolidamento dei **Domini 1 e 2** (VLAN, STP, EtherChannel, Fundamentals).
*   **Packet Tracer / PNETLab:** Utilizzati per tutti i laboratori pratici documentati.

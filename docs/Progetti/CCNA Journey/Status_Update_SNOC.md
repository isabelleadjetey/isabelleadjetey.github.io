# CCNA & SNOC Integration: Status Update

**Data:** Maggio 2026
**Obiettivo:** Condivisione sintetica dei progressi di studio e allineamento per l'operatività all'interno del team SNOC.

---

## 1. Sommario Argomenti: CCNA e Oltre

Di seguito la mappa delle competenze consolidate, con evidenza del "ponte" tra la teoria dell'esame e le applicazioni pratiche quotidiane per i nostri clienti Enterprise.

| Ambito | Argomenti Coperti (Core CCNA) | Oltre la CCNA (Prospettiva SNOC) |
| :--- | :--- | :--- |
| **Network Fundamentals** | Modelli OSI/TCP-IP, IPv4/IPv6, Subnetting | Lettura rapida delle topologie nei ticket aziendali. |
| **Layer 2 (Switching)** | VLAN, 802.1Q Trunk, Spanning Tree (STP), EtherChannel | Prevenzione dei loop L2 e ridondanza fisica (LACP). |
| **Layer 3 (Routing)** | Static Routing, OSPFv2 (Single/Multi-Area), FHRP (HSRP) | Gestione di gateway ridondati e convergenza OSPF. |
| **IP Services (Servizi)** | NAT/PAT, DHCP Server & Relay, NTP, Syslog, SNMP | **Core SNOC:** Sincronizzazione dei log per analisi post-incidente e lettura allarmi di monitoraggio. |
| **Security** | Device Hardening (SSH/Secret), ACL Standard ed Estese | Chiusura porte non sicure e filtri sul traffico. |
| **BGP (Oltre la CCNA)** | eBGP, Path Vector, Autonomous Systems | **Focus Sorint:** Dialogo con ISP esterni e troubleshooting su asimmetrie o neighbor caduti. |

---

## 2. Applicazione Pratica (Hands-on)

Per evitare un approccio puramente mnemonico, ogni dominio teorico è stato testato su **PNETLab** simulando problemi reali:
*   **Costruzione "Sede Centrale":** Implementazione completa da zero di una LAN aziendale (dal Layer 2 fino all'uscita su Internet via NAT).
*   **Troubleshooting:** Analisi approfondita di casi tipici come i "ping timeout" causati da mancanza di rotte di ritorno, anziché limitarsi alla configurazione dell'andata.

---

## 3. Next Steps & Operatività

Le mie priorità per le prossime due settimane si dividono tra chiusura del programma teorico e ingresso nell'operatività del team:

1.  **Chiusura Studio:** Sicurezza Layer 2 (Port Security) e ripasso su QoS e Automazione.
2.  **Operatività in Turno:** Mi ritengo pronta per iniziare ad affiancare i colleghi Senior (o prendere in carico primi ticket base) sulle seguenti tematiche:
    *   Verifica allarmi su tool di monitoraggio (SNMP).
    *   Ricerca e analisi eventi sui log accentrati (Syslog).
    *   Verifiche di base sulla connettività interna e tabelle di routing.

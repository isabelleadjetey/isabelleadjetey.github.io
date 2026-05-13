# Master Cheat Sheet: Cisco IOS Commands (CCNA Ready)

Questo documento raccoglie i comandi fondamentali per la configurazione, la gestione e il troubleshooting di reti Cisco Enterprise.

---

## 1. Navigazione e Gestione Sistema
*   `enable`: Entra in modalità privilegiata.
*   `configure terminal`: Entra in modalità di configurazione globale.
*   `hostname [NOME]`: Cambia il nome del dispositivo.
*   `service password-encryption`: Cripta le password salvate localmente.
*   `banner motd # [TESTO] #`: Imposta il messaggio di avviso legale.
*   `line console 0` -> `logging synchronous`: Evita l'interruzione del comando da parte dei log.

## 2. Layer 2: Switching e Ridondanza
*   `vlan [ID]` -> `name [NOME]`: Crea e nomina una VLAN.
*   `switchport mode access` -> `switchport access vlan [ID]`: Assegna porta a VLAN.
*   `switchport mode trunk`: Abilita il trunking 802.1Q.
*   `channel-group [ID] mode active`: Configura EtherChannel (LACP).
*   `spanning-tree vlan [ID] root primary`: Elezione forzata del Root Bridge.

## 3. Layer 3: Routing e OSPF
*   `interface [INT].[ID]` -> `encapsulation dot1Q [ID]`: Configurazione sub-interface per Router-on-a-Stick.
*   `ip route 0.0.0.0 0.0.0.0 [NEXT_HOP]`: Configura la rotta statica di default.
*   `router ospf [PROCESS_ID]`: Avvia il processo OSPF.
*   `network [RETE] [WILDCARD] area 0`: Annuncia la rete nell'Area 0 (Backbone).
*   `passive-interface [INT]`: Disabilita l'invio di pacchetti Hello su interfacce LAN.

> **FOCUS CCNA:** La **Wildcard Mask** è l'inverso della maschera di rete. 
> Esempio: `/24` (255.255.255.0) -> `0.0.0.255`.

## 4. Sicurezza (Hardening)
*   `switchport port-security`: Abilita la sicurezza sulla porta.
*   `switchport port-security mac-address sticky`: Memorizza dinamicamente i MAC address.
*   **Modalità di Violazione:**
    *   `shutdown`: Disabilita la porta (stato err-disable).
    *   `restrict`: Blocca traffico, invia Syslog, incrementa contatore.
    *   `protect`: Blocca traffico (silenzioso).
*   `crypto key generate rsa`: Crea chiavi per SSH.
*   `transport input ssh`: Abilita esclusivamente l'accesso SSH.

## 5. Servizi IP e Monitoraggio
*   `ip nat inside source list [ACL] interface [OUT] overload`: Configura il PAT (NAT Overload).
*   `ip dhcp pool [NOME]`: Crea l'ambito di indirizzamento DHCP.
*   `ip dhcp snooping`: Previene attacchi di Rogue DHCP Server.
*   `logging host [IP]`: Centralizzazione dei log su server Syslog.
*   `ntp server [IP]`: Sincronizzazione dell'orario di rete.

## 6. Comandi di Verifica (Troubleshooting)
Utilizza questi comandi per rispondere alle domande tecniche e verificare lo stato della rete:

*   `show ip interface brief`: Verifica stato fisico e logico delle interfacce.
*   `show vlan brief`: Controlla l'assegnazione delle porte alle VLAN.
*   `show ip route`: Visualizza la tabella di routing.
*   `show etherchannel summary`: Controlla lo stato dei bundle di link.
*   `show ip nat translations`: Verifica le traslazioni NAT attive.
*   `show cdp neighbors`: Visualizza i dispositivi Cisco adiacenti.

---
*(Creato per Isabelle - Preparazione Allineamento CCNA 2026)*

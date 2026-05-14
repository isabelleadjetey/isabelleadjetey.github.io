# Master Cheat Sheet: Cisco IOS Commands (CCNA Comprehensive)

> **OBIETTIVO:** Riferimento rapido per configurazione, sicurezza e troubleshooting in ambienti Cisco Enterprise.

---

## 1. Gestione Base e Sicurezza Accessi
*   `enable` / `disable`: Entra/Esci dalla modalità privilegiata.
*   `configure terminal`: Accesso alla configurazione globale.
*   `service password-encryption`: Cripta le password in chiaro nel file di config.
*   `enable secret [PASSWORD]`: Password criptata per l'accesso privilegiato.
*   `line console 0` -> `password [PWD]` -> `login`: Protegge l'accesso fisico.
*   `line vty 0 15` -> `transport input ssh` -> `login local`: Forza l'uso di SSH.
*   `crypto key generate rsa modulus 2048`: Genera chiavi per SSH v2.
*   `ip domain-name [DOMINIO]`: Necessario per la generazione chiavi SSH.

## 2. Layer 2: Switching, VLAN e STP
*   **VLAN & Trunking:**
    *   `vlan [ID]` -> `name [NAME]`: Creazione VLAN.
    *   `switchport mode access` -> `switchport access vlan [ID]`: Porta utente.
    *   `switchport mode trunk`: Porta di collegamento tra switch.
    *   `switchport trunk native vlan [ID]`: Cambia la VLAN nativa (Default 1).
    *   `switchport trunk allowed vlan [LIST]`: Limita le VLAN sul trunk.
*   **EtherChannel (LACP):**
    *   `interface range [INT_LIST]` -> `channel-group [ID] mode active`.
    *   `interface port-channel [ID]` -> `switchport mode trunk`.
*   **Spanning Tree (STP):**
    *   `spanning-tree vlan [ID] root primary`: Forza lo switch a essere Root Bridge.
    *   `spanning-tree portfast`: Abilita inoltro immediato su porte PC.
    *   `spanning-tree bpduguard enable`: Spegne la porta se riceve BPDU (Sicurezza).

## 3. Layer 3: Routing (IPv4 & IPv6)
*   **Interfaccia & Sub-interfaccia:**
    *   `ip address [IP] [MASK]`: Assegna IP a interfaccia fisica.
    *   `interface [INT].[VLAN]` -> `encapsulation dot1Q [VLAN]`: Router-on-a-Stick.
*   **Static Routing:**
    *   `ip route 0.0.0.0 0.0.0.0 [NEXT_HOP]`: Rotta di default.
    *   `ip route [RETE] [MASK] [NEXT_HOP]`: Rotta statica specifica.
*   **Dynamic Routing (OSPFv2):**
    *   `router ospf [PID]`: Avvia OSPF.
    *   `network [IP] [WILDCARD] area [ID]`: Abilita OSPF su interfaccia.
    *   `passive-interface [INT]`: Blocca Hello packets verso la LAN.
    *   `default-information originate`: Propaga la rotta di default.
*   **IPv6:**
    *   `ipv6 unicast-routing`: Abilita il routing IPv6 globalmente.
    *   `ipv6 address [PREFIX::ID]/64`: Assegna indirizzo GUA.
    *   `ipv6 address fe80::[ID] link-local`: Assegna indirizzo Link-Local.

## 4. Servizi IP (DHCP, NAT, ACL)
*   **DHCP Server:**
    *   `ip dhcp pool [NAME]` -> `network [NET] [MASK]` -> `default-router [IP]`.
    *   `ip dhcp excluded-address [START] [END]`: Riserva IP (es. per gateway).
*   **NAT / PAT (NAT Overload):**
    *   `ip nat inside` (su interfaccia LAN) / `ip nat outside` (su interfaccia WAN).
    *   `access-list 1 permit [RETE] [WILDCARD]`.
    *   `ip nat inside source list 1 interface [WAN_INT] overload`.
*   **Access Control Lists (ACL):**
    *   **Standard (1-99):** `access-list [ID] permit/deny [RETE] [WILDCARD]`.
    *   **Extended (100-199):** `access-list [ID] [PROTO] [SRC] [DST] [PORT]`.
    *   `interface [INT]` -> `ip access-group [ID] in/out`: Applica l'ACL.

## 5. Security & Infrastructure Hardening
*   **Port Security:**
    *   `switchport port-security`: Attivazione.
    *   `switchport port-security maximum [N]`: Limite MAC address.
    *   `switchport port-security violation [shutdown|restrict|protect]`.
    *   `switchport port-security mac-address sticky`.
*   **DHCP Snooping:**
    *   `ip dhcp snooping` -> `ip dhcp snooping vlan [ID]`.
    *   `interface [INT]` -> `ip dhcp snooping trust`: Porta verso il server DHCP.
*   **First Hop Redundancy (HSRP):**
    *   `standby [ID] ip [VIRTUAL_IP]`.
    *   `standby [ID] priority [VAL]`: (Default 100, più alto vince).
    *   `standby [ID] preempt`: Permette al router prioritario di riprendere il ruolo.

## 6. VPN & IPsec (Concetti Fondamentali)
*   **Site-to-Site VPN**: Connette due sedi (Router-to-Router).
*   **Remote Access VPN**: Connette utente remoto alla sede (Client-to-Gate).
*   **I 3 Pilastri di IPsec**:
    *   **Confidenzialità**: Criptazione dei dati (AES, 3DES).
    *   **Integrità**: Verifica che i dati non siano stati alterati (SHA, MD5).
    *   **Autenticazione**: Verifica l'identità dei peer (Certificati, PSK).
*   **GRE (Generic Routing Encapsulation)**: Tunneling semplice (non criptato) usato per trasportare traffico multicast/routing dentro IPsec.

## 7. Automation & Programmability (Teoria/CLI)
*   **JSON (Data Format):** Key-Value pairs, oggetti `{ }`, array `[ ]`.
*   **YAML:** Identazione significativa, usato in Ansible.
*   **REST API:** Verbi HTTP (GET, POST, PUT, DELETE).
*   **Cisco DNA Center:** Gestione centralizzata (Intent-Based Networking).
*   **LLDP / CDP:**
    *   `show cdp neighbors` / `show lldp neighbors`: Scoperta vicini.

## 7. Master Troubleshooting Table
| Comando | Cosa verifica |
| :--- | :--- |
| `show ip interface brief` | Stato fisico (Status) e logico (Protocol) interfacce. |
| `show vlan brief` | Corretta assegnazione porte alle VLAN. |
| `show ip route` | Tabella di routing (C=Connected, S=Static, O=OSPF). |
| `show ip ospf neighbor` | Relazione di adiacenza (Stato FULL è l'obiettivo). |
| `show etherchannel summary` | Stato Port-channel (P=Bundled, D=Down, S=Suspended). |
| `show spanning-tree vlan [ID]` | Verifica Root Bridge e stati porte (FWD, BLK). |
| `show mac address-table` | Associazioni MAC-Porta imparate dallo switch. |
| `show running-config` | Configurazione attuale in RAM. |
| `ping` / `traceroute` | Verifica connettività e percorso. |

---
*(Ultimo aggiornamento per Isabelle - CCNA SNOC Readiness 2026)*

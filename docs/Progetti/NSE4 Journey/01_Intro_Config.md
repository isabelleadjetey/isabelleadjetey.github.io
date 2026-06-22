# Lesson 1: Introduction and Initial Configuration

## Piattaforma e Architettura
- I firewall FortiGate non lavorano solo sul perimetro, ma integrano funzionalità UTM (Unified Threat Management) e NGFW (Next-Generation Firewall).
- **SPU (Security Processing Units):** Chip hardware dedicati per accelerare il traffico senza gravare sulla CPU principale.
  - *Content Processor (CP):* Analizza le signature (es. antivirus, IPS).
  - *Network Processor (NP):* Velocizza l'inoltro dei pacchetti (fast path).
  - *Security Processor (SP):* Dedicato all'intrusion prevention su modelli di fascia alta.
- **FortiGuard:** Servizio cloud di Fortinet che fornisce aggiornamenti in tempo reale (signature AV, IPS, Web Filtering) tramite query live (FDN).

## Virtual Domains (VDOMs)
- Suddividono logicamente un singolo FortiGate fisico in più firewall virtuali indipendenti.
- Fino a 10 VDOMs creabili di default senza licenze aggiuntive.
- Ogni VDOM ha le proprie policy, rotte e interfacce.
- **Modalità Operative:** Ogni VDOM può operare in *NAT Mode* (Default, routing L3) o *Transparent Mode* (L2, senza routing IP).

## Gestione Amministrativa
- **Accesso:** GUI o CLI. Il profilo `super_admin` ha poteri globali, mentre altri amministratori possono essere limitati a singoli VDOM.
- **Sicurezza Managment:** 
  - Impostare *Trusted Hosts* (permettere il login solo da IP specifici).
  - *Override Idle Timeout* (default 5 minuti).
  - Autenticazione a due fattori (2FA) con **FortiToken** (fisico o mobile, 2 licenze gratuite incluse).
- **Interfacce:** È necessario definire un Default Gateway per permettere al FortiGate di contattare FortiGuard. Supporto per VLAN (tagging 802.1Q) e funzionalità DHCP/DNS Server.

# CCNA Mega Lab (Jeremy's IT Lab) — Tracker

Questo documento riassume tutte le istruzioni del Mega Lab. Usalo come checklist per tracciare i tuoi progressi.

---

## Part 1 - Initial setup
- [ ] Configurare l'Hostname corretto su ogni router e switch.
- [ ] Impostare `enable secret jeremysitlab` (Type 9 se disponibile, altrimenti Type 5).
- [ ] Creare l'utente locale `cisco` con secret `ccna`.
- [ ] Configurare la console: `login local`, `exec-timeout 30 0`, `logging synchronous`.

## Part 2 - VLANs, Layer-2 EtherChannel
- [ ] Office A: L2 EtherChannel 'PortChannel1' (PAgP) tra DSW-A1 e DSW-A2.
- [ ] Office B: L2 EtherChannel 'PortChannel1' (LACP) tra DSW-B1 e DSW-B2.
- [ ] Trunk links (Access to Distribution): disabilitare DTP (`switchport nonegotiate`), Native VLAN 1000, allowed VLANs (A: 10,20,40,99 | B: 10,20,30,99).
- [ ] VTPv2: DSW come Server (Domain `JeremysITLab`), ASW come Client.
- [ ] Creare le VLAN: 10 (PCs), 20 (Phones), 30 (Servers B), 40 (Wi-Fi A), 99 (Management).
- [ ] Configurare porte d'accesso sugli ASW (assegnare VLAN, disabilitare DTP).
- [ ] Link ASW-A1 a WLC1: Trunk (VLAN 40 e 99 Native), disabilitare DTP.
- [ ] Disabilitare (shutdown) tutte le porte non utilizzate.

## Part 3 - IP Addresses, Layer-3 EtherChannel, HSRP
- [ ] Abilitare `ip routing` sui Core e Distribution switches.
- [ ] R1: Interfacce G0/0/0 e G0/1/0 come DHCP client. IP statici sulle altre.
- [ ] L3 EtherChannel tra CSW1 e CSW2 (PAgP, `no switchport`, `ip address`).
- [ ] Configurare IP point-to-point sulle interfacce routed (CSW, DSW).
- [ ] Configurare l'IP statico sul Server SRV1.
- [ ] Configurare IP di Management (SVI 99) sugli switch Access con default gateway.
- [ ] Configurare HSRPv2 sui DSW per ogni VLAN. Priority +5 per l'Active router e abilitare preemption.

## Part 4 - Rapid Spanning Tree Protocol
- [ ] Configurare `spanning-tree mode rapid-pvst` su Access e Distribution.
- [ ] Root Bridge = Active Router HSRP. Secondary = Standby HSRP.
- [ ] Abilitare `spanning-tree portfast` e `spanning-tree bpduguard enable` sulle porte verso gli host (incluso WLC).

## Part 5 - Static and Dynamic Routing
- [ ] OSPFv2 (Process 1, Area 0) su R1, CSW e DSW. Router ID = Loopback IP.
- [ ] Comando `network` con wildcard esatta sugli switch, abilitazione a livello interfaccia su R1.
- [ ] `passive-interface` su Loopback e SVI (tranne la SVI 99).
- [ ] `ip ospf network point-to-point` sui link fisici OSPF.
- [ ] R1: Rotta statica di default ricorsiva verso Internet.
- [ ] R1: Rotta statica di default Floating come backup (AD più alta).
- [ ] R1: `default-information originate` in OSPF.

## Part 6 - Network Services (DHCP, NAT, NTP, SNMP, ecc.)
- [ ] DHCP Pools su R1 per PC, Telefoni, Wi-Fi e Mgmt (escludere primi 10 IP, impostare gateway, dns, WLC ip).
- [ ] `ip helper-address` sulle SVI dei DSW puntando a R1 Loopback.
- [ ] DNS: A-records su SRV1 per google, youtube, jeremysitlab.
- [ ] NTP: R1 come NTP master (stratum 5). Switch si sincronizzano/autenticano con R1.
- [ ] SNMP: Community `SNMPSTRING` in Read-Only.
- [ ] Syslog: Inviare i log al server SRV1.
- [ ] FTP: Scaricare nuovo IOS su R1 da SRV1, riavviare, cancellare vecchio file.
- [ ] SSH: RSA 1024, ACL 1 (solo VLAN 99) applicata alle VTY. Accesso locale.
- [ ] NAT/PAT: Static NAT per SRV1. Dynamic PAT con ACL 2 e POOL1 su R1.
- [ ] Disabilitare CDP globalmente, abilitare LLDP. Disabilitare LLDP Tx sulle porte d'accesso.

## Part 7 - Security (ACLs e Layer-2 Security)
- [ ] Extended ACL `OfficeA_to_OfficeB`: permit ICMP A->B, deny IP A->B, permit IP any any.
- [ ] Port Security (F0/1 d'accesso): max MAC necessari, azione `restrict`, mac `sticky`.
- [ ] DHCP Snooping: Abilitato per tutte le VLAN, porte Trunk come `trust`, no option 82, rate-limit.
- [ ] DAI: Abilitato per VLAN, porte Trunk `trust`, validazioni arp aggiuntive.

## Part 8 - IPv6
- [ ] Abilitare `ipv6 unicast-routing`.
- [ ] IPv6 verso Internet statici.
- [ ] IPv6 con `eui-64` sui link tra R1 e CSW.
- [ ] IPv6 `enable` (solo Link-Local) sui PortChannel L3 (CSW1-CSW2).
- [ ] Rotte statiche di default IPv6 (normale e floating fully-specified).

## Part 9 - Wireless
- [ ] Accedere alla GUI del WLC (https://10.0.0.7) da un PC (admin/adminPW12).
- [ ] Creare Dynamic Interface "Wi-Fi" su VLAN 40 (IP .4, GW .1, DHCP 10.0.0.76).
- [ ] Creare WLAN "Wi-Fi" (WPA2 Personal, AES, PSK cisco123).
- [ ] Verificare associazione dei LWAP.

import os

directory = r"C:\Users\isabe\.gemini\antigravity\scratch\portfolio-repo\docs\Progetti\CCNA Journey\02_Knowledge_Base"

cheatsheets = {
    "ACL_Standard_Extended": "- **Standard ACL:** Controlla solo Source IP (1-99). Applicala vicino alla DEstination.\n- **Extended ACL:** Controlla Source/Dest IP e Port (100-199). Applicala vicino alla SOurce.\n- **Regola d'oro:** Implicit Deny alla fine di ogni ACL.",
    "Automation_Programmability": "- **JSON:** Usa `{\"chiave\": \"valore\"}`.\n- **REST Verbs:** GET (Leggi), POST (Crea), PUT (Aggiorna), DELETE (Rimuovi).\n- **Ansible:** Agentless, usa SSH e Playbook in YAML.",
    "BGP_Basics": "- **eBGP:** Tra AS diversi. AD = 20.\n- **iBGP:** Stesso AS. AD = 200.\n- **Comando:** `router bgp [ASN]` -> `neighbor [IP] remote-as [ASN]`.",
    "CDP_LLDP_Fundamentals": "- **CDP:** Cisco proprietary. Abilitato di default. `show cdp neighbors`.\n- **LLDP:** Open standard (IEEE 802.1AB). Disabilitato di default. `show lldp neighbors`.\n- **Sicurezza:** Disabilitare verso le porte di accesso end-user.",
    "DHCP_Lab": "- **DORA:** Discover (B), Offer (U), Request (B), Acknowledge (U).\n- **Relay:** `ip helper-address [IP]` applicato sulla SVI del gateway.\n- **Exclude:** `ip dhcp excluded-address [IP]` si fa prima del pool.",
    "EtherChannel_LACP": "- **LACP (Open):** Active / Passive.\n- **PAgP (Cisco):** Desirable / Auto.\n- **Requisiti:** Stessa velocit, duplex, VLAN su tutti i link fisici.",
    "HSRP_FHRP_Lab": "- **HSRP (Cisco):** Active / Standby. Virtual MAC: 0000.0c07.acXX.\n- **VRRP (Open):** Master / Backup.\n- **Preemption:** Disabilitata di default, serve per far riprendere il ruolo all'Active se torna online.",
    "IP_Services_Monitoring": "- **NTP:** Sincronizza orologi (UDP 123). Stratum 1 = Orologio atomico.\n- **Syslog:** UDP 514. Livelli da 0 (Emergencies) a 7 (Debugging).\n- **TFTP vs FTP:** TFTP (UDP 69, no auth), FTP (TCP 20/21, auth).",
    "L2_Security_Advanced_DAI_IPSG": "- **DHCP Snooping:** Blocca DHCP rogue. Porte trunk = trust.\n- **DAI (Dynamic ARP Inspection):** Blocca ARP spoofing usando il database del DHCP Snooping.\n- **IPSG:** Blocca IP spoofing.",
    "L2_Security_Hardening": "- **Port Security:** `switchport port-security`. Default: max 1 MAC, violazione Shutdown.\n- **Violazioni:** Protect (droppa, no log), Restrict (droppa, log), Shutdown (err-disable).\n- **Sticky:** Salva il MAC in running-config.",
    "NAT_Lab": "- **Static NAT:** 1 a 1 (Server interni verso Internet).\n- **Dynamic NAT:** Pool di IP pubblici.\n- **PAT (NAT Overload):** Molti IP privati su 1 IP pubblico usando porte (Overload).",
    "OSPF_Lab": "- **AD:** 110. **Metrica:** Cost (Reference BW / Interface BW).\n- **DR/BDR Election:** Si fa su reti Multiaccess (Ethernet). Vince Priority pi alta, poi Router ID pi alto.\n- **Router ID:** 1) Manuale, 2) Max Loopback, 3) Max Interfaccia fisica.",
    "QoS_Fundamentals": "- **VoIP:** DSCP EF (46) / CoS 5.\n- **LLQ:** Coda con priorit assoluta (per voce).\n- **Policing vs Shaping:** Policing taglia (drop), Shaping rallenta (buffer).",
    "SNMP_Fundamentals": "- **Versioni:** v1/v2c (Community string in chiaro), v3 (Auth & Privacy, criptato).\n- **Componenti:** NMS (Manager), Agent (Device), MIB (Database OID).\n- **Trap vs Inform:** Trap (non confermati), Inform (confermati dall'NMS).",
    "STP_RSTP_Fundamentals": "- **Elezioni Root:** Priorit minima vince (default 32768 + VLAN ID), poi MAC address minore.\n- **Stati classici (802.1D):** Blocking -> Listening -> Learning -> Forwarding (50 sec).\n- **RSTP (802.1w):** Discarding -> Learning -> Forwarding (Meno di 5 sec).",
    "Security_Device_Hardening": "- **Password:** `enable secret` usa hash (Type 5 MD5, Type 9 scrypt).\n- **SSH:** Serve hostname, domain-name, e chiavi RSA (`crypto key generate rsa`).\n- **VTY:** `transport input ssh` per bloccare Telnet.",
    "VLAN_Trunking": "- **Trunk:** Trasporta pi VLAN aggiungendo un Tag 802.1Q (4 byte).\n- **Native VLAN:** Traffico non taggato sul trunk (default VLAN 1).\n- **DTP:** Dynamic Trunking Protocol (Cisco). Meglio disabilitarlo `switchport nonegotiate`.",
    "VPN_Concepts_Fundamentals": "- **IPsec:** Cripta, Autentica, Integra, Anti-Replay.\n- **GRE:** Crea tunnel e supporta multicast/routing, ma NON cripta.\n- **GRE over IPsec:** Il mix perfetto usato nelle aziende.",
    "Wireless_Architecture_Security": "- **WLC:** Gestisce roaming, QoS, autenticazione (Control Plane).\n- **CAPWAP:** UDP 5246 (Control) / 5247 (Data).\n- **WPA3:** Sostituisce 4-way handshake con SAE (blocca attacchi dizionario offline)."
}

for filename in os.listdir(directory):
    if not filename.endswith("_Recap.md"):
        continue
    filepath = os.path.join(directory, filename)
    
    # find matching cheat sheet
    matched_cs = None
    for key, content in cheatsheets.items():
        if key in filename:
            matched_cs = content
            break
            
    if not matched_cs:
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    # Replace the placeholder cheat sheet
    for i, line in enumerate(lines):
        if "### 🎯 Cheat Sheet per l'Esame" in line:
            lines = lines[:i+1]
            lines.append("\n" + matched_cs + "\n")
            break
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)

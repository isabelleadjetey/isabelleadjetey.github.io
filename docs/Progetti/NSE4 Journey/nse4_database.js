const nse4Database = [
    // ----------------------------------------------------
    // DOMAIN 1: System, Fabric & Automation
    // ----------------------------------------------------
    { 
        id: "SYS-001",
        domain: "System, Fabric & Automation", 
        q: "What is the primary purpose of the Fortinet Security Fabric?", 
        options: [
            "To replace dynamic routing protocols with a centralized controller", 
            "To provide a single pane of glass for management and automated threat response across multiple Fortinet devices", 
            "To encrypt all internal LAN traffic using IPsec", 
            "To bypass NAT for specific trusted applications"
        ], 
        correct: 1, 
        exp: "Il Security Fabric permette a dispositivi multipli (FortiGate, FortiAnalyzer, FortiClient, ecc.) di condividere threat intelligence in tempo reale e rispondere automaticamente alle minacce in modo coordinato, visibile da una singola dashboard (Single Pane of Glass)." 
    },
    { 
        id: "SYS-002",
        domain: "System, Fabric & Automation", 
        q: "Refer to the CLI output. What does the state 'backup' indicate in an FGCP High Availability (HA) cluster?<br><br><pre><code>diagnose sys ha status\n...\nMaster: 128 FortiGate-A\nSlave: 128 FortiGate-B (backup)</code></pre>", 
        options: [
            "The device is offline and waiting to be replaced.", 
            "The device is operating in Active-Active mode and processing traffic.", 
            "The device is in Active-Passive mode and is monitoring the primary unit, ready to take over if it fails.", 
            "The device is currently syncing its configuration from FortiManager."
        ], 
        correct: 2, 
        exp: "In una configurazione HA Active-Passive, il nodo secondario appare come 'Slave' o 'backup'. Non elabora traffico di rete attivo, ma sincronizza le sessioni (se abilitato) e monitora l'heartbeat per subentrare immediatamente in caso di guasto del Master." 
    },
    { 
        id: "SYS-003",
        domain: "System, Fabric & Automation", 
        q: "Which protocol is used by default for FortiTelemetry (Security Fabric communication) between Fortinet devices?", 
        options: [
            "TCP port 8013", 
            "UDP port 514", 
            "TCP port 443", 
            "TCP port 10443"
        ], 
        correct: 0, 
        exp: "FortiTelemetry (fondamentale per il Security Fabric) utilizza di default la porta TCP 8013. Deve essere abilitata sulle interfacce che collegano i dispositivi del Fabric." 
    },
    { 
        id: "SYS-004",
        domain: "System, Fabric & Automation", 
        q: "In an Automation Stitch, what defines the event that starts the automated action?", 
        options: [
            "Action", 
            "Trigger", 
            "Webhook", 
            "Schedule"
        ], 
        correct: 1, 
        exp: "Un Automation Stitch in FortiOS è composto da un 'Trigger' (l'evento scatenante, come un log di compromissione o un webhook) e un' 'Action' (la reazione, come mettere un IP in quarantena o inviare una mail)." 
    },

    // ----------------------------------------------------
    // DOMAIN 2: Firewall Policies & NAT
    // ----------------------------------------------------
    { 
        id: "FPN-001",
        domain: "Firewall Policies & NAT", 
        q: "When configuring a firewall policy, what is the default behavior if no policy matches the traffic?", 
        options: [
            "Traffic is routed to the default gateway.", 
            "Traffic is dropped by the implicit deny policy.", 
            "Traffic is logged and allowed.", 
            "Traffic is sent to the FortiAnalyzer for inspection."
        ], 
        correct: 1, 
        exp: "In fondo a tutte le policy c'è sempre la policy invisibile 'Implicit Deny' (ID 0). Tutto il traffico che non fa match con una policy esplicita superiore viene scartato." 
    },
    { 
        id: "FPN-002",
        domain: "Firewall Policies & NAT", 
        q: "What is the difference between SNAT (Source NAT) and DNAT (Destination NAT) on a FortiGate?", 
        options: [
            "SNAT translates the destination IP, DNAT translates the source IP.", 
            "SNAT uses Virtual IPs (VIPs), DNAT uses IP Pools.", 
            "SNAT is used for internal users accessing the Internet, DNAT is used (via VIPs) to expose internal servers to the Internet.", 
            "SNAT encrypts the payload, DNAT encrypts the header."
        ], 
        correct: 2, 
        exp: "Il Source NAT (SNAT) maschera gli IP privati interni con un IP pubblico per navigare su Internet. Il Destination NAT (DNAT), realizzato in FortiOS tramite i Virtual IP (VIP), traduce l'IP pubblico di destinazione in un IP privato interno per permettere accessi dall'esterno verso i server locali." 
    },
    { 
        id: "FPN-003",
        domain: "Firewall Policies & NAT", 
        q: "Which NAT type allocates a single public IP address and uses different source ports to track individual internal connections (Overload)?", 
        options: [
            "One-to-One IP Pool", 
            "Overload IP Pool (PAT)", 
            "Fixed Port Range", 
            "Port Forwarding VIP"
        ], 
        correct: 1, 
        exp: "L'Overload (noto nell'industria come PAT) mappa migliaia di connessioni interne su un singolo IP pubblico, modificando le porte sorgente (Source Ports) per tenere traccia delle sessioni." 
    },
    { 
        id: "FPN-004",
        domain: "Firewall Policies & NAT", 
        q: "In FortiOS, what must be done to allow traffic matched by a Virtual IP (VIP) through the firewall?", 
        options: [
            "Create a policy with the internal private IP as the destination.", 
            "Create a policy with the VIP object as the destination.", 
            "Enable Central NAT.", 
            "No policy is needed; VIPs bypass firewall policies automatically."
        ], 
        correct: 1, 
        exp: "Quando configuri un VIP, l'indirizzo di destinazione nei pacchetti viene modificato (DNAT). Tuttavia, nella Firewall Policy, devi selezionare l'oggetto VIP stesso come 'Destination', non l'IP privato reale del server." 
    },

    // ----------------------------------------------------
    // DOMAIN 3: Routing & SD-WAN
    // ----------------------------------------------------
    { 
        id: "RSW-001",
        domain: "Routing & SD-WAN", 
        q: "Which routing type takes precedence over the regular routing table in FortiOS?", 
        options: [
            "Static Route", 
            "OSPF Route", 
            "Policy Route", 
            "Connected Route"
        ], 
        correct: 2, 
        exp: "Le Policy Routes (PBR) bypassano la tabella di routing standard. Vengono valutate per prime. Se un pacchetto fa match con una Policy Route, viene inoltrato secondo le regole di quest'ultima, ignorando le rotte statiche o dinamiche (OSPF/BGP)." 
    },
    { 
        id: "RSW-002",
        domain: "Routing & SD-WAN", 
        q: "In an SD-WAN deployment, what is the purpose of an SLA (Service Level Agreement) target?", 
        options: [
            "To encrypt traffic over the WAN link.", 
            "To monitor link quality (Latency, Jitter, Packet Loss) and steer traffic to the best performing link.", 
            "To limit the bandwidth used by specific applications.", 
            "To authenticate remote FortiGates."
        ], 
        correct: 1, 
        exp: "I target SLA monitorano costantemente lo stato dei link tramite health check (es. ping). In base a regole SD-WAN predefinite (es. 'Lowest Cost SLA'), il FortiGate sposta dinamicamente il traffico sul link con la latenza o il jitter migliore." 
    },
    { 
        id: "RSW-003",
        domain: "Routing & SD-WAN", 
        q: "Refer to the routing table output. Which route is a Default Route?<br><br><pre><code>S* 0.0.0.0/0 [10/0] via 192.168.1.254, port1\nC 192.168.1.0/24 is directly connected, port1\nO 10.0.0.0/8 [110/2] via 192.168.1.2, port1</code></pre>", 
        options: [
            "192.168.1.0/24", 
            "10.0.0.0/8", 
            "0.0.0.0/0", 
            "None of the above"
        ], 
        correct: 2, 
        exp: "La rotta 0.0.0.0/0 è la rotta di default (Quad-Zero). Intercetta tutto il traffico per il quale il firewall non ha una rotta più specifica e lo invia al Default Gateway (in questo caso 192.168.1.254)." 
    },
    { 
        id: "RSW-004",
        domain: "Routing & SD-WAN", 
        q: "What is the primary benefit of configuring SD-WAN Zones?", 
        options: [
            "It allows SD-WAN rules to apply only to specific IP addresses.", 
            "It simplifies firewall policy creation by grouping SD-WAN members into logical zones.", 
            "It automatically configures IPsec VPNs between sites.", 
            "It replaces the need for NAT."
        ], 
        correct: 1, 
        exp: "Le SD-WAN Zones ti permettono di raggruppare più interfacce fisiche (es. wan1, wan2). Nelle Firewall Policy, invece di creare regole separate per ogni porta, usi semplicemente l'oggetto 'Zone' (es. 'virtual-wan-link' o una custom zone)." 
    },

    // ----------------------------------------------------
    // DOMAIN 4: IPsec & SSL VPN
    // ----------------------------------------------------
    { 
        id: "ISV-001",
        domain: "IPsec & SSL VPN", 
        q: "During the setup of an IPsec VPN, what is negotiated during IKE Phase 1?", 
        options: [
            "The specific IP subnets that are allowed to traverse the VPN (Quick Mode).", 
            "A secure, authenticated channel (ISAKMP SA) to protect further negotiations.", 
            "The NAT configuration for the tunnel.", 
            "The SSL certificate for the remote users."
        ], 
        correct: 1, 
        exp: "L'IKE Phase 1 stabilisce un tunnel di base crittografato e autenticato (ISAKMP SA) tra i due peer. Tutte le negoziazioni successive (inclusa la Phase 2 per le chiavi IPsec reali e le reti permesse) avverranno in modo sicuro all'interno di questo tunnel." 
    },
    { 
        id: "ISV-002",
        domain: "IPsec & SSL VPN", 
        q: "What mode of SSL VPN provides a remote user with an IP address on the internal network and full network access via a virtual adapter?", 
        options: [
            "Web Mode", 
            "Tunnel Mode", 
            "Proxy Mode", 
            "Transparent Mode"
        ], 
        correct: 1, 
        exp: "Il 'Tunnel Mode' SSL VPN richiede il FortiClient. Installa una scheda di rete virtuale sul PC remoto, assegna un IP interno e instrada tutto il traffico attraverso il tunnel. Il 'Web Mode' invece offre accesso limitato solo tramite un portale web nel browser, senza software." 
    },
    { 
        id: "ISV-003",
        domain: "IPsec & SSL VPN", 
        q: "Which protocol is encapsulated by IPsec ESP (Encapsulating Security Payload) to provide data confidentiality?", 
        options: [
            "TCP port 443", 
            "UDP port 500", 
            "IP Protocol 50", 
            "IP Protocol 51 (AH)"
        ], 
        correct: 2, 
        exp: "ESP (Encapsulating Security Payload) utilizza l'IP Protocol numero 50 per criptare e autenticare il traffico dei dati (Phase 2). AH (Authentication Header) usa il protocollo 51, ma non offre crittografia. IKE usa UDP 500/4500." 
    },
    { 
        id: "ISV-004",
        domain: "IPsec & SSL VPN", 
        q: "In an IPsec VPN, what is the purpose of NAT Traversal (NAT-T)?", 
        options: [
            "To translate the internal IP to the external IP.", 
            "To encapsulate ESP packets in UDP port 4500 so they can pass through an intermediate NAT device.", 
            "To allow SSL VPNs to operate over IPsec.", 
            "To compress the VPN payload."
        ], 
        correct: 1, 
        exp: "L'IP Protocol 50 (ESP) non ha il concetto di 'porte' (TCP/UDP), quindi i router intermedi non riescono a farne il NAT (PAT). Il NAT-T risolve il problema 'imbustando' i pacchetti ESP all'interno di pacchetti UDP porta 4500, facilmente nattabili." 
    },

    // ----------------------------------------------------
    // DOMAIN 5: Security Profiles & Inspection
    // ----------------------------------------------------
    { 
        id: "SPI-001",
        domain: "Security Profiles & Inspection", 
        q: "What is a key difference between Proxy-based and Flow-based inspection modes in FortiOS?", 
        options: [
            "Flow-based caches the entire file before scanning, Proxy-based scans packet by packet.", 
            "Proxy-based buffers the file completely before scanning (more secure), while Flow-based scans on the fly (faster).", 
            "Only Flow-based supports Web Filtering.", 
            "Proxy-based cannot be used in a NAT environment."
        ], 
        correct: 1, 
        exp: "Il Proxy-based funge da intermediario completo: scarica l'intero file in memoria, lo analizza e poi lo passa all'utente (offrendo massima sicurezza e funzionalità). Il Flow-based analizza i pacchetti 'al volo' man mano che passano (massime performance, ma niente buffering del payload completo)." 
    },
    { 
        id: "SPI-002",
        domain: "Security Profiles & Inspection", 
        q: "Which inspection method allows the FortiGate to scan the payload of HTTPS traffic by acting as a Man-in-the-Middle (MITM)?", 
        options: [
            "Certificate Inspection", 
            "Deep Packet Inspection (Full SSL Inspection)", 
            "Application Control", 
            "DNS Filtering"
        ], 
        correct: 1, 
        exp: "La Deep Packet Inspection (Full SSL Inspection) decripta, ispeziona e recripta il traffico HTTPS. Richiede che i client si fidino del certificato CA del FortiGate (per evitare errori del browser). La 'Certificate Inspection' legge solo il certificato in chiaro, senza decriptare il payload." 
    },
    { 
        id: "SPI-003",
        domain: "Security Profiles & Inspection", 
        q: "In Web Filtering, what happens if an end user attempts to visit a URL categorized as 'Warning'?", 
        options: [
            "The connection is immediately dropped.", 
            "The user is presented with a block page and cannot proceed.", 
            "The user sees a FortiGuard page warning them about the category, but they can click 'Proceed' to access the site.", 
            "The traffic is allowed silently, but an email is sent to the admin."
        ], 
        correct: 2, 
        exp: "L'azione 'Warning' nel Web Filter informa l'utente che il sito potrebbe non essere consono, ma lascia all'utente la responsabilità di cliccare sul bottone 'Proceed' per proseguire. L'azione 'Block' invece nega totalmente l'accesso." 
    },
    { 
        id: "SPI-004",
        domain: "Security Profiles & Inspection", 
        q: "Which Fortinet feature relies on FortiGuard signatures to detect and block exploits against known software vulnerabilities?", 
        options: [
            "Web Filtering", 
            "Data Leak Prevention (DLP)", 
            "Intrusion Prevention System (IPS)", 
            "Antivirus"
        ], 
        correct: 2, 
        exp: "L'IPS (Intrusion Prevention System) analizza il traffico alla ricerca di pattern (firme FortiGuard) che indicano un tentativo di sfruttare una vulnerabilità nota (exploit) nei sistemi o nelle reti." 
    },

    // ----------------------------------------------------
    // DOMAIN 6: ZTNA & User Authentication
    // ----------------------------------------------------
    { 
        id: "ZUA-001",
        domain: "ZTNA & User Authentication", 
        q: "What is the core principle of Zero Trust Network Access (ZTNA) compared to traditional VPNs?", 
        options: [
            "It grants broad network access once a user authenticates to the perimeter.", 
            "It continuously verifies the user's identity and device posture per-session before granting access to specific applications.", 
            "It relies entirely on IP addresses for trust.", 
            "It requires hardware tokens for all connections."
        ], 
        correct: 1, 
        exp: "Mentre una VPN tradizionale garantisce l'accesso a intere reti una volta stabilito il tunnel, lo ZTNA ('Never Trust, Always Verify') autorizza le connessioni alle singole applicazioni su base per-sessione, controllando costantemente i tag di sicurezza del dispositivo tramite FortiClient." 
    },
    { 
        id: "ZUA-002",
        domain: "ZTNA & User Authentication", 
        q: "Which authentication protocol allows FortiGate to securely query Windows Active Directory for user credentials?", 
        options: [
            "RADIUS", 
            "LDAP", 
            "TACACS+", 
            "SAML"
        ], 
        correct: 1, 
        exp: "L'LDAP (Lightweight Directory Access Protocol) è il protocollo standard utilizzato dai firewall FortiGate per collegarsi ai Domain Controller Microsoft (Active Directory) ed eseguire l'autenticazione degli utenti e la mappatura dei gruppi." 
    },
    { 
        id: "ZUA-003",
        domain: "ZTNA & User Authentication", 
        q: "What role does the FortiClient EMS (Endpoint Management Server) play in ZTNA?", 
        options: [
            "It acts as the firewall terminating the ZTNA proxy.", 
            "It provisions ZTNA tags to endpoints based on compliance rules and shares them with the FortiGate.", 
            "It replaces the need for Active Directory.", 
            "It routes internet traffic for remote users."
        ], 
        correct: 1, 
        exp: "L'EMS gestisce centralmente i FortiClient. Applica regole di conformità (es. 'Antivirus aggiornato?', 'Dominio corretto?') e assegna dei Tag ZTNA (es. 'Safe_Device'). L'EMS sincronizza poi questi Tag con il FortiGate, che li usa nelle policy per bloccare o consentire gli accessi." 
    },
    { 
        id: "ZUA-004",
        domain: "ZTNA & User Authentication", 
        q: "Which feature allows a FortiGate to automatically identify logged-in users on a Windows domain without requiring them to type credentials in a captive portal?", 
        options: [
            "Local User Database", 
            "FSSO (Fortinet Single Sign-On)", 
            "IPsec VPN", 
            "Static IP Binding"
        ], 
        correct: 1, 
        exp: "L'FSSO utilizza agenti installati sui Domain Controller (o polled) per leggere gli eventi di login di Windows. Invia poi al FortiGate l'associazione IP-Utente in modo invisibile all'utente, permettendo la navigazione basata sull'identità senza ulteriori login." 
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = nse4Database;
}

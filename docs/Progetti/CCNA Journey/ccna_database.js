const ccnaDatabase = [
    // =========================================================================
    // DOMAIN 1: Network Fundamentals (20%)
    // =========================================================================
    { 
        id: "NF-001",
        domain: "Network Fundamentals", 
        q: "Refer to the exhibit. Which IPv6 address correctly represents the shortened form of the following address?<br><br><pre><code>2001:0DB8:0000:0000:0000:0000:1428:57AB</code></pre>", 
        options: [
            "2001:DB8::1428:57AB", 
            "2001:0DB8::1428:57AB", 
            "2001:DB8:0::1428:57AB", 
            "2001:DB8::0:1428:57AB"
        ], 
        correct: 0, 
        exp: "Regole IPv6: 1) Si possono omettere gli zeri iniziali di ogni blocco (0DB8 diventa DB8). 2) Una singola sequenza contigua di blocchi fatti solo di zeri può essere sostituita da un doppio due punti (::). Pertanto, 2001:DB8::1428:57AB è la forma più compressa e corretta." 
    },
    { 
        id: "NF-002",
        domain: "Network Fundamentals", 
        q: "A network administrator needs to divide the 172.16.0.0/16 network into subnets that can support exactly 500 hosts each. Which subnet mask provides the required number of hosts while wasting the fewest addresses?", 
        options: [
            "255.255.254.0 (/23)", 
            "255.255.255.0 (/24)", 
            "255.255.252.0 (/22)", 
            "255.255.248.0 (/21)"
        ], 
        correct: 0, 
        exp: "Per supportare 500 host servono 9 bit host (2^9 = 512 - 2 = 510 indirizzi validi). 32 bit totali - 9 bit host = prefisso /23. La subnet mask /23 è 255.255.254.0. Una /24 darebbe solo 254 host (insufficiente), una /22 darebbe 1022 host (troppo spreco)." 
    },
    { 
        id: "NF-003",
        domain: "Network Fundamentals", 
        q: "Which characteristic differentiates a collapsed core architecture from a three-tier hierarchical architecture?", 
        options: [
            "It combines the core and distribution layers into a single layer.", 
            "It eliminates the access layer entirely.", 
            "It uses Layer 2 switches exclusively in all tiers.", 
            "It requires all devices to connect to a single central router."
        ], 
        correct: 0, 
        exp: "Nella 'Collapsed Core Architecture' (tipica delle reti campus medio-piccole), le funzionalità del Core Layer e del Distribution Layer sono implementate negli stessi switch Layer 3, riducendo complessità e costi hardware." 
    },
    { 
        id: "NF-004",
        domain: "Network Fundamentals", 
        q: "Which of the following fields is present in an Ethernet frame header at Layer 2?", 
        options: [
            "Source IP Address", 
            "Destination MAC Address", 
            "Time to Live (TTL)", 
            "TCP Window Size"
        ], 
        correct: 1, 
        exp: "L'header del frame Ethernet Layer 2 contiene: Preamble, SFD, Destination MAC, Source MAC, Type/Length, Data Payload e FCS. Gli IP e il TTL appartengono al pacchetto Layer 3 (IP), mentre il Window Size appartiene al segmento Layer 4 (TCP)." 
    },
    { 
        id: "NF-005",
        domain: "Network Fundamentals", 
        q: "Which fiber optic cable type is typically used for long-distance WAN backbones and uses laser light as its optical transmission source?", 
        options: [
            "Single-Mode Fiber (SMF)", 
            "Multi-Mode Fiber (MMF)", 
            "Shielded Twisted Pair (STP)", 
            "Coaxial RG-6"
        ], 
        correct: 0, 
        exp: "La fibra monomodale (Single-Mode Fiber - SMF) ha un nucleo sottilissimo (circa 9 micron), usa luce laser, produce una dispersione modale minima ed è in grado di coprire distanze fino a decine di chilometri. La Multi-Mode Fiber (MMF) usa LED/VCSEL con un core più ampio (50 o 62.5 micron) per distanze campus/LAN brevi (fino a 300-500m)." 
    },
    { 
        id: "NF-006",
        domain: "Network Fundamentals", 
        q: "When an IPv6 host generates an Interface ID using the EUI-64 process from the MAC address 00:1A:A1:22:33:44, what is the resulting 64-bit Interface ID?", 
        options: [
            "021A:A1FF:FE22:3344", 
            "001A:A1FF:FE22:3344", 
            "021A:A122:3344:FFFF", 
            "FFFE:001A:A122:3344"
        ], 
        correct: 0, 
        exp: "Procedura EUI-64: 1) Si divide il MAC address a metà: 001A:A1 e 22:3344. 2) Si inserisce FFFE al centro -> 001A:A1FF:FE22:3344. 3) Si inverte il 7° bit del primo byte (Universal/Local bit): 00 in esadecimale (00000000 binario) con il 7° bit invertito diventa 00000010 binario, ossia 02 hex. Risultato finale: 021A:A1FF:FE22:3344." 
    },
    { 
        id: "NF-007",
        domain: "Network Fundamentals", 
        q: "Which layer 4 protocol characteristic accurately describes UDP compared to TCP?", 
        options: [
            "It establishes a connection using a 3-way handshake before sending data.", 
            "It is connectionless, has low overhead, and does not guarantee packet delivery.", 
            "It performs dynamic windowing to control sender transmission rate.", 
            "It guarantees in-order delivery of segments via sequence numbers."
        ], 
        correct: 1, 
        exp: "UDP (User Datagram Protocol) è connectionless e 'best-effort': non effettua handshake, ha un header minimo di 8 byte (contro i 20+ di TCP), e non garantisce né la consegna né l'ordinamento dei pacchetti, rendendolo ideale per streaming voce/video e DNS." 
    },
    { 
        id: "NF-008",
        domain: "Network Fundamentals", 
        q: "In a modern data center Spine-Leaf network topology, which statement is true?", 
        options: [
            "Leaf switches connect to each other to provide Layer 2 redundancy.", 
            "Every Leaf switch connects to every Spine switch, and Spine switches never connect to each other.", 
            "Servers connect directly to Spine switches to minimize latency.", 
            "Spine switches perform spanning-tree blocking on redundant uplinks."
        ], 
        correct: 1, 
        exp: "Nelle architetture Spine-Leaf (Clos network): ogni Leaf si collega a ogni Spine; gli switch Spine non si collegano mai tra loro, e i Leaf non si collegano tra loro. Tutto il traffico server-to-server (East-West) attraversa esattamente lo stesso numero di hop (2 hop), garantendo latenza prevedibile e costante." 
    },
    { 
        id: "NF-009",
        domain: "Network Fundamentals", 
        q: "What is the broadcast address for the subnet containing the host IP address 192.168.10.85/29?", 
        options: [
            "192.168.10.87", 
            "192.168.10.95", 
            "192.168.10.255", 
            "192.168.10.91"
        ], 
        correct: 0, 
        exp: "Una maschera /29 ha 32 - 29 = 3 bit host (blocco di 2^3 = 8 indirizzi). I multipli di 8 nell'ultimo ottetto sono: .0, .8, ... .80, .88. La subnet dell'host 192.168.10.85 inizia a 192.168.10.80 e finisce a 192.168.10.87. L'indirizzo di broadcast è l'ultimo del blocco: 192.168.10.87 (host validi da .81 a .86)." 
    },
    { 
        id: "NF-010",
        domain: "Network Fundamentals", 
        q: "Which non-overlapping 2.4 GHz wireless channels are recommended for deployment in North America (FCC) to prevent co-channel interference?", 
        options: [
            "Channels 1, 6, and 11", 
            "Channels 1, 5, 9, and 13", 
            "Channels 2, 7, and 12", 
            "Channels 36, 40, and 44"
        ], 
        correct: 0, 
        exp: "Nella banda dei 2.4 GHz ciascun canale è largo 20 o 22 MHz, ma i canali sono distanziati di soli 5 MHz. Pertanto, gli unici tre canali completamente privi di sovrapposizione spettrale sono i canali 1, 6 e 11. (I canali 36, 40, 44 appartengono alla banda dei 5 GHz)." 
    },

    // =========================================================================
    // DOMAIN 2: Network Access (20%)
    // =========================================================================
    { 
        id: "NA-001",
        domain: "Network Access", 
        q: "Refer to the exhibit. What will happen if a broadcast frame is sent by a PC in VLAN 10 connected to Switch A?<br><br><pre><code>SwitchA# show int fa0/1 trunk\nPort  Mode  Encapsulation  Status  Native vlan\nFa0/1 auto  802.1q         trunking 99\n\nSwitchB# show int fa0/1 trunk\nPort  Mode  Encapsulation  Status  Native vlan\nFa0/1 on    802.1q         trunking 1</code></pre>", 
        options: [
            "The frame will be dropped by Switch B due to a native VLAN mismatch.", 
            "The frame will cross the trunk with a VLAN 10 tag and be received normally.", 
            "The trunk will shut down automatically due to CDP errors.", 
            "The frame will cross untagged because it's a broadcast."
        ], 
        correct: 1, 
        exp: "La VLAN 10 non è la Native VLAN su nessuno dei due switch. Pertanto, il traffico della VLAN 10 viaggia regolarmente TAGGATO con header 802.1Q e viene ricevuto senza problemi da Switch B. Un mismatch sulla Native VLAN genera avvisi CDP e miscela solo il traffico untagged (VLAN 1 e 99), ma non interrompe le VLAN taggate." 
    },
    { 
        id: "NA-002",
        domain: "Network Access", 
        q: "Which Spanning Tree port feature immediately transitions an access port from blocking to forwarding, bypassing listening and learning states?", 
        options: [
            "PortFast", 
            "BPDU Guard", 
            "UplinkFast", 
            "Root Guard"
        ], 
        correct: 0, 
        exp: "La funzionalità 'PortFast' consente a una porta d'accesso collegata a un end-host (PC, server, stampante) di passare istantaneamente allo stato Forwarding, evitando i 30 secondi di attesa (Listening + Learning in 802.1D) ed evitando la generazione di Topology Change Notification (TCN)." 
    },
    { 
        id: "NA-003",
        domain: "Network Access", 
        q: "Which Cisco wireless architecture offloads RF management and client authentication to a centralized controller, while Lightweight APs handle real-time frame transmission?", 
        options: [
            "Autonomous AP architecture", 
            "Cloud-based Meraki architecture", 
            "Split-MAC (Controller-based) architecture", 
            "Mesh Wi-Fi architecture"
        ], 
        correct: 2, 
        exp: "L'architettura Split-MAC divide le funzioni del Layer 2 Wi-Fi: i Lightweight Access Point (LAP) gestiscono le operazioni real-time (invio beacon, ack, cifratura RF), mentre il WLC (Wireless LAN Controller) gestisce l'autenticazione, il roaming e le policy di sicurezza tramite tunnel CAPWAP." 
    },
    { 
        id: "NA-004",
        domain: "Network Access", 
        q: "What is the primary effect of entering the 'switchport nonegotiate' command on a Cisco switch interface configured as a trunk?", 
        options: [
            "It converts the interface into an access port.", 
            "It disables the transmission of DTP (Dynamic Trunking Protocol) negotiation frames.", 
            "It prevents the switch from negotiating PoE power requirements.", 
            "It forces the switch to accept only untagged traffic."
        ], 
        correct: 1, 
        exp: "'switchport nonegotiate' disabilita l'invio periodico dei frame DTP. Viene raccomandato dalle best practice di sicurezza per evitare attacchi di VLAN Hopping basati sulla negoziazione automatica del trunking." 
    },
    { 
        id: "NA-005",
        domain: "Network Access", 
        q: "Two switches in the same broadcast domain have the default Spanning Tree priority of 32768. Which parameter determines which switch becomes the STP Root Bridge?", 
        options: [
            "The switch with the lowest MAC address", 
            "The switch with the highest MAC address", 
            "The switch with the highest IP address on its management VLAN", 
            "The switch with the fastest physical interface speed"
        ], 
        correct: 0, 
        exp: "Il Bridge ID (BID) è composto da: Priorità (2 byte) + Extended System ID (VLAN ID) + MAC Address (6 byte). Se la priorità è identica (es. 32768), il criterio di spareggio è il MAC address più basso (Lowest MAC wins)." 
    },
    { 
        id: "NA-006",
        domain: "Network Access", 
        q: "What occurs when a port configured with BPDU Guard receives a Spanning Tree BPDU packet?", 
        options: [
            "The port transitions immediately to the blocking state and discards the packet.", 
            "The port is placed into the 'err-disabled' state and shuts down.", 
            "The switch changes the port into a designated port.", 
            "The port ignores the BPDU and continues forwarding user traffic."
        ], 
        correct: 1, 
        exp: "BPDU Guard protegge le porte d'accesso (dove è attivo PortFast). Se qualcuno collega uno switch abusivo che invia BPDU, la porta viene disattivata e posta in stato 'err-disabled' per prevenire la formazione di loop o cambi di root bridge imprevisti." 
    },
    { 
        id: "NA-007",
        domain: "Network Access", 
        q: "Which combination of EtherChannel modes will successfully negotiate an active link using the IEEE 802.3ad standard (LACP)?", 
        options: [
            "Switch 1: Active | Switch 2: Passive", 
            "Switch 1: Desirable | Switch 2: Auto", 
            "Switch 1: Passive | Switch 2: Passive", 
            "Switch 1: Auto | Switch 2: Auto"
        ], 
        correct: 0, 
        exp: "LACP (standard aperto 802.3ad) usa i comandi 'active' e 'passive'. Per formare il bundle, almeno uno dei due lati deve iniziare la negoziazione in modalità 'active'. (Desirable e Auto appartengono a PAgP, protocollo proprietario Cisco. Se entrambi i lati sono Passive, nessuno inizia la negoziazione e l'EtherChannel non sale)." 
    },
    { 
        id: "NA-008",
        domain: "Network Access", 
        q: "How many port states are defined in Rapid PVST+ (802.1w) compared to legacy 802.1D STP?", 
        options: [
            "3 states: Discarding, Learning, Forwarding", 
            "5 states: Blocking, Listening, Learning, Forwarding, Disabled", 
            "2 states: Blocking and Forwarding", 
            "4 states: Listening, Learning, Forwarding, Broken"
        ], 
        correct: 0, 
        exp: "Rapid STP (802.1w) semplifica gli stati da 5 a soli 3: Discarding (che unifica i vecchi stati Disabled, Blocking e Listening di 802.1D), Learning e Forwarding." 
    },
    { 
        id: "NA-009",
        domain: "Network Access", 
        q: "What action does a Layer 2 switch take when it receives a unicast frame with a destination MAC address that is NOT present in its CAM (MAC address) table?", 
        options: [
            "It drops the frame immediately.", 
            "It floods the frame out of all ports belonging to the same VLAN, except the incoming port.", 
            "It sends an ARP request to determine which switch port owns the MAC address.", 
            "It forwards the frame out of its default gateway interface."
        ], 
        correct: 1, 
        exp: "Questo processo si chiama 'Unknown Unicast Flooding': lo switch inoltra una copia del frame su tutte le porte appartenenti alla stessa VLAN (ad eccezione della porta da cui è entrato), finché l'host di destinazione non risponde permettendo l'apprendimento del suo MAC." 
    },
    { 
        id: "NA-010",
        domain: "Network Access", 
        q: "Which Cisco wireless controller deployment mode allows local APs to locally switch client data traffic when the WAN connection to the central WLC is lost?", 
        options: [
            "Centralized (Local) Mode", 
            "FlexConnect Mode", 
            "Sniffer Mode", 
            "Bridge / Mesh Mode"
        ], 
        correct: 1, 
        exp: "La modalità FlexConnect (nota in passato come H-REAP) è progettata per le filiali remote: se il tunnel WAN CAPWAP verso il controller centrale cade, l'AP è in grado di gestire in locale l'autenticazione e il forwarding del traffico (Local Switching)." 
    },

    // =========================================================================
    // DOMAIN 3: IP Connectivity (25%)
    // =========================================================================
    { 
        id: "IC-001",
        domain: "IP Connectivity", 
        q: "Refer to the exhibit. Which route will the router use to forward an IP packet addressed to 10.1.1.50?<br><br><pre><code>R1# show ip route\nO 10.1.1.0/24 [110/65] via 192.168.1.2\nS 10.1.0.0/16 [1/0] via 172.16.1.2\nD 10.1.1.32/27 [90/30720] via 10.0.0.2\nC 10.1.1.0/25 is directly connected, Fa0/0</code></pre>", 
        options: [
            "The OSPF route (10.1.1.0/24)", 
            "The Static route (10.1.0.0/16)", 
            "The EIGRP route (10.1.1.32/27)", 
            "The Directly Connected route (10.1.1.0/25)"
        ], 
        correct: 2, 
        exp: "Regola sovrana del routing Cisco: il 'Longest Prefix Match' vince SEMPRE sull'Administrative Distance o sulla metrica. L'indirizzo 10.1.1.50 rientra nel blocco /27 (da 10.1.1.32 a 10.1.1.63). Essendo /27 la maschera più specifica (con più bit a 1), il router utilizzerà la rotta EIGRP (D)." 
    },
    { 
        id: "IC-002",
        domain: "IP Connectivity", 
        q: "What is the default OSPF cost for a FastEthernet (100 Mbps) interface if the 'auto-cost reference-bandwidth' command is left at its default value?", 
        options: [
            "1", 
            "10", 
            "100", 
            "1000"
        ], 
        correct: 0, 
        exp: "Formula costo OSPF: Reference Bandwidth (default 100 Mbps) / Interface Bandwidth (100 Mbps) = 1. Poiché il costo minimo possibile è 1, anche interfacce Gigabit (1 Gbps) o 10G avranno costo 1 se non si aumenta la reference-bandwidth con 'auto-cost reference-bandwidth 1000'." 
    },
    { 
        id: "IC-003",
        domain: "IP Connectivity", 
        q: "Which parameter MUST match between two directly connected routers for an OSPF adjacency to reach the FULL state?", 
        options: [
            "Router ID", 
            "Hello and Dead timers", 
            "OSPF Process ID", 
            "Interface OSPF priority"
        ], 
        correct: 1, 
        exp: "I requisiti indispensabili per l'adiacenza OSPF sono: 1) Stessa Area ID, 2) Hello e Dead timers identici, 3) Stessa Subnet mask, 4) Autenticazione corrispondente (se attiva), 5) MTU identica. Il Process ID è significativo solo localmente e il Router ID deve obbligatoriamente essere DIVERSO." 
    },
    { 
        id: "IC-004",
        domain: "IP Connectivity", 
        q: "In an IPv6 environment, which command correctly configures a static host route to 2001:DB8::5 using a next-hop IP of 2001:DB8:A::1?", 
        options: [
            "ipv6 route 2001:DB8::5/128 2001:DB8:A::1", 
            "ipv6 route 2001:DB8::5/64 2001:DB8:A::1", 
            "ip route v6 2001:DB8::5 2001:DB8:A::1", 
            "ipv6 route host 2001:DB8::5 2001:DB8:A::1"
        ], 
        correct: 0, 
        exp: "Una 'host route' punta a un unico specifico indirizzo IP. In IPv4 si usa la maschera /32 (255.255.255.255), mentre in IPv6 si usa il prefisso /128. La sintassi corretta è 'ipv6 route <ip>/128 <next-hop>'." 
    },
    { 
        id: "IC-005",
        domain: "IP Connectivity", 
        q: "How does a broadcast multi-access network (such as Ethernet) elect the OSPF Designated Router (DR)?", 
        options: [
            "The router with the lowest OSPF priority wins.", 
            "The router with the highest OSPF interface priority wins; if tied, highest Router ID wins.", 
            "The router that has been running the longest always preempts.", 
            "The router with the lowest Router ID is selected."
        ], 
        correct: 1, 
        exp: "In OSPF, l'elezione del DR su reti broadcast segue queste regole: 1) Vince la priorità di interfaccia più alta (default 1; priority 0 significa 'non eleggibile'). 2) A parità di priorità, vince il Router ID più alto. Nota fondamentale: l'elezione è non-preemptive (un nuovo router con ID superiore non scalza il DR già attivo)." 
    },
    { 
        id: "IC-006",
        domain: "IP Connectivity", 
        q: "Refer to the exhibit. Two OSPF routers are stuck in the EXSTART state. What is the most likely cause of this issue?<br><br><pre><code>R1# show ip ospf neighbor\nNeighbor ID  Pri  State           Dead Time  Address     Interface\n2.2.2.2        1  EXSTART/DR      00:00:34   10.0.0.2    GigabitEthernet0/0</code></pre>", 
        options: [
            "Mismatched OSPF Area IDs", 
            "Mismatched Interface MTU sizes", 
            "Duplicate Router IDs", 
            "Mismatched Hello and Dead intervals"
        ], 
        correct: 1, 
        exp: "Nello stato EXSTART i router negoziano la sequenza dei pacchetti DBD (Database Description) ed effettuano la verifica della Maximum Transmission Unit (MTU). Se c'è un disallineamento di MTU tra le due interfacce, i pacchetti DBD vengono scartati e i vicini rimangono bloccati in EXSTART o EXCHANGE." 
    },
    { 
        id: "IC-007",
        domain: "IP Connectivity", 
        q: "Which command configures a floating static route intended to serve as a backup to an existing OSPF default route?", 
        options: [
            "ip route 0.0.0.0 0.0.0.0 192.168.10.1 120", 
            "ip route 0.0.0.0 0.0.0.0 192.168.10.1 90", 
            "ip route 0.0.0.0 0.0.0.0 192.168.10.1 1", 
            "ip route 0.0.0.0 0.0.0.0 192.168.10.1 track 1"
        ], 
        correct: 0, 
        exp: "Una 'Floating Static Route' è una rotta statica con un'Administrative Distance superiore a quella del protocollo di routing principale. Poiché OSPF ha AD = 110, impostare una rotta statica con AD = 120 (o superiore) fa sì che essa rimanga inattiva, per poi comparire automaticamente nella routing table solo in caso di caduta della rotta OSPF." 
    },
    { 
        id: "IC-008",
        domain: "IP Connectivity", 
        q: "What is the primary benefit of configuring the 'passive-interface' command on a LAN-facing interface running OSPF?", 
        options: [
            "It prevents OSPF from advertising that subnet to other routers.", 
            "It stops sending OSPF Hello packets out of that interface while still advertising the connected subnet.", 
            "It increases the OSPF metric of that interface to 65535.", 
            "It allows the interface to receive OSPF updates without requiring authentication."
        ], 
        correct: 1, 
        exp: "Il comando 'passive-interface' impedisce l'invio e la ricezione di pacchetti Hello su quell'interfaccia (evitando lo spreco di banda e rischi di sicurezza da apparati non autorizzati), ma continua a inserire e pubblicizzare la subnet dell'interfaccia nel protocollo di routing." 
    },
    { 
        id: "IC-009",
        domain: "IP Connectivity", 
        q: "Which list correctly sorts the routing sources in order of their default Administrative Distance, from most trusted (lowest AD) to least trusted (highest AD)?", 
        options: [
            "Connected (0), Static (1), eBGP (20), EIGRP (90), OSPF (110), RIP (120)", 
            "Connected (0), eBGP (20), Static (1), OSPF (110), EIGRP (90), RIP (120)", 
            "Static (1), Connected (0), OSPF (110), EIGRP (90), RIP (120), eBGP (20)", 
            "Connected (0), Static (1), RIP (120), OSPF (110), EIGRP (90), eBGP (20)"
        ], 
        correct: 0, 
        exp: "Valori ufficiali di Administrative Distance (AD): Directly Connected = 0, Static = 1, eBGP = 20, EIGRP interno = 90, OSPF = 110, IS-IS = 115, RIP = 120, EIGRP esterno = 170, iBGP = 200." 
    },
    { 
        id: "IC-010",
        domain: "IP Connectivity", 
        q: "In IPv6, which protocol completely replaces the function of IPv4 ARP to resolve an IPv6 address to a destination Layer 2 MAC address?", 
        options: [
            "Neighbor Discovery Protocol (NDP) using Neighbor Solicitation and Advertisement", 
            "Dynamic Host Configuration Protocol v6 (DHCPv6)", 
            "Internet Group Management Protocol (IGMP)", 
            "Reverse Address Resolution Protocol (RARP)"
        ], 
        correct: 0, 
        exp: "In IPv6 non esistono broadcast né ARP. L'NDP (Neighbor Discovery Protocol) usa messaggi ICMPv6 di tipo Neighbor Solicitation (NS) inviati a indirizzi solicited-node multicast, e Neighbor Advertisement (NA) per risolvere i MAC address." 
    },
    { 
        id: "IC-011",
        domain: "IP Connectivity", 
        q: "Which command must be configured on a Layer 2 Cisco Catalyst switch to allow remote SSH access from workstations located in different subnets?", 
        options: [
            "ip default-gateway <ip-address>", 
            "ip route 0.0.0.0 0.0.0.0 <ip-address>", 
            "ip forward-protocol remote", 
            "ip helper-address <ip-address>"
        ], 
        correct: 0, 
        exp: "Gli switch Layer 2 puri non possiedono una tabella di routing. Per poter rispondere a sessioni SSH o ping provenienti da altre reti attraverso la Switch Virtual Interface (SVI), necessitano del comando 'ip default-gateway <ip>'." 
    },

    // =========================================================================
    // DOMAIN 4: IP Services (10%)
    // =========================================================================
    { 
        id: "IS-001",
        domain: "IP Services", 
        q: "Refer to the exhibit. Which type of NAT is configured on the router?<br><br><pre><code>ip nat pool MY_POOL 209.165.200.225 209.165.200.225 netmask 255.255.255.248\naccess-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 pool MY_POOL overload</code></pre>", 
        options: [
            "Dynamic NAT without Port Translation", 
            "Static NAT 1-to-1", 
            "Port Address Translation (PAT / NAT Overload)", 
            "NAT64 translation"
        ], 
        correct: 2, 
        exp: "La parola chiave 'overload' indica inequivocabilmente PAT (Port Address Translation). Permette a molteplici indirizzi IP privati (192.168.1.0/24) di condividere un unico IP pubblico (o pochi IP) sfruttando le porte TCP/UDP sorgente." 
    },
    { 
        id: "IS-002",
        domain: "IP Services", 
        q: "A network engineer configures 'ip helper-address 10.1.1.100' on the interface GigabitEthernet0/0. What is the primary operational effect of this command?", 
        options: [
            "It forwards DNS queries arriving on Gi0/0 to the server at 10.1.1.100.", 
            "It converts incoming broadcast DHCP Discover packets into unicast packets routed to 10.1.1.100.", 
            "It configures interface Gi0/0 to act as a DHCP server.", 
            "It synchronizes the switch system clock with the NTP server at 10.1.1.100."
        ], 
        correct: 1, 
        exp: "I router non instradano i broadcast (come il DHCP Discover su porta UDP 67). Il comando 'ip helper-address' trasforma questi broadcast in pacchetti unicast indirizzati direttamente al server DHCP (DHCP Relay Agent)." 
    },
    { 
        id: "IS-003",
        domain: "IP Services", 
        q: "Which command configures a Cisco router to act as an NTP client synchronizing its time with a public time server at 192.0.2.1?", 
        options: [
            "ntp master 192.0.2.1", 
            "ntp server 192.0.2.1", 
            "clock set 192.0.2.1", 
            "ntp peer 192.0.2.1"
        ], 
        correct: 1, 
        exp: "'ntp server <ip>' imposta il router come client per sincronizzare l'orologio di sistema dal server specificato. Il comando 'ntp master' configura invece il router stesso come sorgente NTP autoritativa." 
    },
    { 
        id: "IS-004",
        domain: "IP Services", 
        q: "Which QoS mechanism buffers excess packets in memory and transmits them at a smooth, constant rate, rather than dropping them?", 
        options: [
            "Traffic Policing", 
            "Traffic Shaping", 
            "Class-Based Marking", 
            "Weighted Fair Queueing"
        ], 
        correct: 1, 
        exp: "Differenza chiave QoS: il Traffic Policing scarta (drop) i pacchetti che superano la soglia di banda impostata. Il Traffic Shaping li trattiene in una coda (buffer) per poi trasmetterli a flusso costante senza perdite (purché il buffer non si saturi)." 
    },
    { 
        id: "IS-005",
        domain: "IP Services", 
        q: "In Cisco NAT terminology, what is an 'Inside Global' IP address?", 
        options: [
            "The real private IP address assigned to a host on the internal private network.", 
            "The public IP address representing an internal host to the outside world.", 
            "The IP address of an external host as it is known to the internal network.", 
            "The globally routable IP address assigned to the DNS root server."
        ], 
        correct: 1, 
        exp: "Terminologia NAT Cisco: 1) Inside Local = IP privato reale dell'host interno (es. 192.168.1.10). 2) Inside Global = IP pubblico con cui l'host interno si presenta all'esterno (es. 203.0.113.5). 3) Outside Global = IP pubblico reale dell'host esterno. 4) Outside Local = IP dell'host esterno come visto dalla rete interna." 
    },
    { 
        id: "IS-006",
        domain: "IP Services", 
        q: "Which SNMP version introduces message integrity, user-based authentication (HMAC-SHA/MD5), and payload encryption (AES/DES)?", 
        options: [
            "SNMPv1", 
            "SNMPv2c", 
            "SNMPv3", 
            "SNMPv4"
        ], 
        correct: 2, 
        exp: "SNMPv1 e SNMPv2c trasmettevano le community string (password) in chiaro. SNMPv3 introduce il modello di sicurezza USM (User-based Security Model) con tre livelli: noAuthNoPriv, authNoPriv, e authPriv (con cifratura dei dati)." 
    },
    { 
        id: "IS-007",
        domain: "IP Services", 
        q: "Which Syslog severity level corresponds to an 'Error' condition according to RFC 5424 / Cisco IOS standard?", 
        options: [
            "Level 1", 
            "Level 3", 
            "Level 4", 
            "Level 7"
        ], 
        correct: 1, 
        exp: "I livelli Syslog Cisco vanno da 0 a 7: 0 = Emergency, 1 = Alert, 2 = Critical, 3 = Error, 4 = Warning, 5 = Notification, 6 = Informational, 7 = Debugging. (Trucco mnemonico: 'Every Awesome Cisco Engineer Will Need Ice Cream Daily')." 
    },
    { 
        id: "IS-008",
        domain: "IP Services", 
        q: "What is the virtual MAC address format used by HSRP version 1 for IPv4?", 
        options: [
            "0000.0c07.acXX (where XX is the HSRP group number)", 
            "0000.5e00.01XX (where XX is the VRRP group number)", 
            "0007.b400.XXYY (where XX is group and YY is forwarder)", 
            "0000.0c9f.fXXX (where XXX is the HSRP v2 group number)"
        ], 
        correct: 0, 
        exp: "HSRP v1 usa il MAC virtuale 0000.0c07.acXX (dove XX è il numero del gruppo in esadecimale). VRRP usa invece 0000.5e00.01XX, GLBP usa 0007.b400.XXYY, e HSRP v2 usa 0000.0c9f.fXXX." 
    },
    { 
        id: "IS-009",
        domain: "IP Services", 
        q: "Which configuration steps are required on a Cisco router to enable SSH version 2 and disable Telnet on virtual terminal lines?", 
        options: [
            "Configure hostname, ip domain-name, crypto key generate rsa, and 'transport input ssh' under line vty.", 
            "Configure enable secret, line con 0 password, and 'transport input all'.", 
            "Configure 'service ssh enable' and 'no ip http server'.", 
            "Configure username, ip ssh version 2, and 'transport output ssh' under interface Fa0/0."
        ], 
        correct: 0, 
        exp: "Per abilitare SSH su Cisco IOS occorrono: 1) Nome host (`hostname`), 2) Nome dominio (`ip domain-name`), 3) Coppia di chiavi crittografiche (`crypto key generate rsa`), 4) Creazione utente locale (`username ... secret ...`), 5) Sotto `line vty 0 4` applicare `login local` e `transport input ssh`." 
    },
    { 
        id: "IS-010",
        domain: "IP Services", 
        q: "What is the primary role of DHCP Snooping in an enterprise campus switch network?", 
        options: [
            "To assign static IP addresses to unauthorized hosts automatically.", 
            "To intercept and validate DHCP messages, filtering out rogue DHCP offers from untrusted ports.", 
            "To route DHCP discover packets across multiple OSPF areas.", 
            "To compress DHCP lease negotiation headers to conserve uplink bandwidth."
        ], 
        correct: 1, 
        exp: "DHCP Snooping classifica le porte dello switch in 'Trusted' (collegate a server DHCP o switch di uplink autorizzati) e 'Untrusted' (porte client). Se su una porta untrusted arriva un messaggio DHCP Offer o DHCP Ack, lo switch lo scarta immediatamente, bloccando i server DHCP abusivi (Rogue DHCP)." 
    },

    // =========================================================================
    // DOMAIN 5: Security Fundamentals (15%)
    // =========================================================================
    { 
        id: "SF-001",
        domain: "Security Fundamentals", 
        q: "Refer to the ACL. What is the effect of this access list?<br><br><pre><code>access-list 100 deny tcp host 192.168.1.5 host 10.0.0.1 eq 80\naccess-list 100 permit ip any any</code></pre>", 
        options: [
            "Allows all traffic from 192.168.1.5 except HTTP traffic to 10.0.0.1", 
            "Denies all traffic to 10.0.0.1 and permits everything else", 
            "Denies HTTP traffic from 192.168.1.5 and denies everything else due to implicit deny", 
            "Permits HTTP traffic only between 192.168.1.5 and 10.0.0.1"
        ], 
        correct: 0, 
        exp: "La prima riga blocca esplicitamente il traffico TCP porta 80 (HTTP) dall'host 192.168.1.5 verso il server 10.0.0.1. La seconda riga (permit ip any any) annulla l'Implicit Deny finale, permettendo tutto il resto del traffico." 
    },
    { 
        id: "SF-002",
        domain: "Security Fundamentals", 
        q: "Which Layer 2 security attack is mitigated by configuring Dynamic ARP Inspection (DAI)?", 
        options: [
            "CAM Table MAC flooding attack", 
            "ARP Poisoning / ARP Spoofing (Man-in-the-Middle)", 
            "DHCP Starvation attack", 
            "VLAN Hopping double-tagging attack"
        ], 
        correct: 1, 
        exp: "DAI (Dynamic ARP Inspection) previene gli attacchi Man-In-The-Middle basati su ARP Poisoning. Ispeziona i pacchetti ARP a livello di porta e verifica la validità della coppia IP-MAC incrociandola con la tabella di binding creata dal DHCP Snooping." 
    },
    { 
        id: "SF-003",
        domain: "Security Fundamentals", 
        q: "What is the primary security advantage of WPA3 over WPA2 in Wi-Fi personal networks?", 
        options: [
            "WPA3 replaces Pre-Shared Key (PSK) with Simultaneous Authentication of Equals (SAE) to stop offline dictionary attacks.", 
            "WPA3 uses TKIP instead of CCMP encryption.", 
            "WPA3 mandates the use of an external 802.1X RADIUS server for home networks.", 
            "WPA3 eliminates the need for any encryption on management frames."
        ], 
        correct: 0, 
        exp: "In WPA3-Personal, l'handshake a 4 vie di WPA2 è sostituito da SAE (Simultaneous Authentication of Equals, basato sul protocollo Dragonfly). Questo rende matematicamente impossibili gli attacchi brute-force offline da dizionario anche in caso di password deboli." 
    },
    { 
        id: "SF-004",
        domain: "Security Fundamentals", 
        q: "Which command configures a local user account with the highest privilege level, bypassing the need to type 'enable'?", 
        options: [
            "username admin privilege 15 secret cisco123", 
            "username admin level max secret cisco123", 
            "username admin privilege 1 secret cisco123", 
            "enable secret admin cisco123"
        ], 
        correct: 0, 
        exp: "In Cisco IOS i livelli di privilegio vanno da 1 (User EXEC, prompt >) a 15 (Privileged EXEC, prompt #). Impostare 'privilege 15' assegna tutti i privilegi di root al momento del login senza richiedere il comando 'enable'." 
    },
    { 
        id: "SF-005",
        domain: "Security Fundamentals", 
        q: "What is the default violation action when a switch interface configured with Cisco Port Security detects an unauthorized MAC address?", 
        options: [
            "Protect", 
            "Restrict", 
            "Shutdown (err-disabled)", 
            "Warning"
        ], 
        correct: 2, 
        exp: "Il comportamento predefinito di Port Security è 'shutdown': la porta scarta i frame, invia un messaggio di log/SNMP trap, incrementa il counter delle violazioni e si disattiva completamente ponendosi in stato 'err-disabled'." 
    },
    { 
        id: "SF-006",
        domain: "Security Fundamentals", 
        q: "According to Cisco architectural guidelines, where should Standard ACLs and Extended ACLs be placed on a network?", 
        options: [
            "Standard ACLs as close to the destination as possible; Extended ACLs as close to the source as possible.", 
            "Standard ACLs as close to the source as possible; Extended ACLs as close to the destination as possible.", 
            "Both Standard and Extended ACLs should always be placed on the core switches.", 
            "Standard ACLs on outbound interfaces only; Extended ACLs on loopback interfaces only."
        ], 
        correct: 0, 
        exp: "Regola d'oro Cisco ACL: Le ACL Standard (che filtrano solo per IP sorgente) vanno posizionate il più vicino possibile alla DESTINAZIONE per non bloccare traffico legittimo diretto altrove. Le ACL Estese vanno posizionate il più vicino possibile alla SORGENTE per scartare il traffico indesiderato subito, prima che consumi preziosa banda di rete." 
    },
    { 
        id: "SF-007",
        domain: "Security Fundamentals", 
        q: "Which key architectural difference distinguishes TACACS+ from RADIUS?", 
        options: [
            "TACACS+ separates Authentication and Authorization and encrypts the entire packet payload using TCP port 49.", 
            "RADIUS encrypts the entire packet payload and uses TCP port 1812.", 
            "TACACS+ is an open IETF standard, whereas RADIUS is proprietary to Cisco.", 
            "RADIUS separates Authentication and Authorization into distinct processes."
        ], 
        correct: 0, 
        exp: "Confronto AAA: TACACS+ (sviluppato da Cisco) separa nettamente Authentication, Authorization e Accounting, crittografa l'INTERO pacchetto e usa TCP porta 49 (affidabile). RADIUS combina Authentication e Authorization, cifra solo la password (lasciando in chiaro username e attributi) e usa UDP porte 1812/1813." 
    },
    { 
        id: "SF-008",
        domain: "Security Fundamentals", 
        q: "Which protocol in the IPsec suite provides both data confidentiality (encryption) AND data integrity/origin authentication for payload packets?", 
        options: [
            "Encapsulating Security Payload (ESP)", 
            "Authentication Header (AH)", 
            "Internet Key Exchange (IKE)", 
            "Diffie-Hellman Group 14"
        ], 
        correct: 0, 
        exp: "Nel tunnel IPsec: ESP (IP protocol 50) fornisce sia crittografia (confidenzialità) che autenticazione/integrità. AH (IP protocol 51) fornisce solo autenticazione e integrità, ma NESSUNA crittografia (i dati viaggiano in chiaro)." 
    },
    { 
        id: "SF-009",
        domain: "Security Fundamentals", 
        q: "What type of attack involves an attacker sending an excessive number of Ethernet frames with randomized source MAC addresses to fill a switch's CAM table?", 
        options: [
            "MAC Flooding attack", 
            "ARP Poisoning attack", 
            "SYN Flood DoS attack", 
            "DHCP Starvation attack"
        ], 
        correct: 0, 
        exp: "Il MAC Flooding satura la tabella CAM dello switch con falsi MAC address. Quando la memoria dello switch si esaurisce (CAM table overflow), lo switch inizia a comportarsi come un vecchio hub, inoltrando tutto il traffico in broadcast su tutte le porte (permettendo all'attaccante lo sniffing passivo dei pacchetti). Si mitiga con il 'Port Security'." 
    },
    { 
        id: "SF-010",
        domain: "Security Fundamentals", 
        q: "Which Multi-Factor Authentication (MFA) category does an SMS one-time passcode or an authenticator app push notification represent?", 
        options: [
            "Something you know", 
            "Something you have", 
            "Something you are", 
            "Somewhere you are"
        ], 
        correct: 1, 
        exp: "Fattori di autenticazione: 1) Something you know = password, PIN. 2) Something you have = smartphone, token hardware, smart card. 3) Something you are = impronta digitale, riconoscimento facciale (biometria)." 
    },

    // =========================================================================
    // DOMAIN 6: Automation and Programmability (10%)
    // =========================================================================
    { 
        id: "AP-001",
        domain: "Automation and Programmability", 
        q: "Refer to the JSON snippet. What data type is represented by the 'interfaces' key?<br><br><pre><code>{\n  \"device\": \"Router1\",\n  \"interfaces\": [\n    \"GigabitEthernet0/0\",\n    \"GigabitEthernet0/1\"\n  ]\n}</code></pre>", 
        options: [
            "String", 
            "Object", 
            "Array", 
            "Boolean"
        ], 
        correct: 2, 
        exp: "In JSON, le parentesi graffe { } rappresentano un Oggetto (Object), mentre le parentesi quadre [ ] rappresentano un Array (una lista ordinata di valori). La chiave 'interfaces' contiene un array di due stringhe." 
    },
    { 
        id: "AP-002",
        domain: "Automation and Programmability", 
        q: "In an SDN architecture, which API category is used by the centralized SDN Controller to communicate DOWNWARD with physical switches and routers?", 
        options: [
            "Northbound APIs", 
            "Southbound APIs", 
            "Eastbound APIs", 
            "Westbound APIs"
        ], 
        correct: 1, 
        exp: "Nelle architetture SDN: le Southbound APIs (come NETCONF, RESTCONF, OpenFlow) comunicano verso il basso (verso il Data Plane degli apparati fisici). Le Northbound APIs (tipicamente REST/JSON) comunicano verso l'alto (verso le applicazioni di gestione, automazione e business logic)." 
    },
    { 
        id: "AP-003",
        domain: "Automation and Programmability", 
        q: "Which configuration management tool is agentless, uses a 'Push' model, and communicates with network devices over standard SSH using YAML playbooks?", 
        options: [
            "Ansible", 
            "Puppet", 
            "Chef", 
            "SaltStack"
        ], 
        correct: 0, 
        exp: "Ansible è famoso per la sua architettura 'agentless': non richiede l'installazione di software sui dispositivi di rete, ma si connette via SSH/API e invia configurazioni (Push) definite in playbook formattati in YAML. Puppet e Chef usano invece un'architettura client-server basata su agenti (Pull)." 
    },
    { 
        id: "AP-004",
        domain: "Automation and Programmability", 
        q: "When interacting with a RESTful API, which HTTP method should be used to retrieve data from a network controller without making any modifications?", 
        options: [
            "GET", 
            "POST", 
            "PUT", 
            "PATCH"
        ], 
        correct: 0, 
        exp: "Corrispondenza metodi REST API con operazioni CRUD: Create = POST, Read = GET, Update/Replace intero = PUT, Update parziale = PATCH, Delete = DELETE. Per interrogare o leggere la configurazione si usa sempre GET." 
    },
    { 
        id: "AP-005",
        domain: "Automation and Programmability", 
        q: "Which HTTP status code returned by a REST API indicates that a client request was successfully processed and resulted in the creation of a new network resource?", 
        options: [
            "200 OK", 
            "201 Created", 
            "204 No Content", 
            "400 Bad Request"
        ], 
        correct: 1, 
        exp: "Codici di stato HTTP: 200 = Successo generico (OK), 201 = Risorsa creata con successo (Created, tipica risposta a una chiamata POST), 204 = Richiesta riuscita senza corpo di risposta, 400 = Errore di sintassi nel client, 401 = Non autenticato, 403 = Accesso vietato." 
    },
    { 
        id: "AP-006",
        domain: "Automation and Programmability", 
        q: "Which statement accurately describes the formatting rules of a YAML document compared to JSON?", 
        options: [
            "YAML relies strictly on indentation with spaces to indicate hierarchical structure, without using curly braces or trailing commas.", 
            "YAML mandates tab characters for indentation.", 
            "YAML requires all keys and values to be enclosed in double quotes.", 
            "YAML uses angle brackets (< >) to define tags."
        ], 
        correct: 0, 
        exp: "YAML (YAML Ain't Markup Language) è progettato per la massima leggibilità umana: usa l'indentazione con spazi (i tabulatori sono vietati), non richiede parentesi graffe per gli oggetti, usa i trattini '-' per gli elementi di una lista e non richiede virgolette per le stringhe semplici." 
    },
    { 
        id: "AP-007",
        domain: "Automation and Programmability", 
        q: "In Software-Defined Networking (SDN), what planes are typically decoupled, and where does the intelligence reside?", 
        options: [
            "The Control Plane is separated from the Data Plane and centralized on an SDN Controller.", 
            "The Management Plane is decoupled from the Control Plane and placed on an edge router.", 
            "The Data Plane is centralized, while the Control Plane remains distributed on local switches.", 
            "All planes are collapsed into the Application layer."
        ], 
        correct: 0, 
        exp: "La rivoluzione SDN risiede nella separazione tra Control Plane (la logica che decide dove instradare i pacchetti, es. algoritmi di routing e topologia) e Data Plane (l'inoltro fisico dei frame/pacchetti via ASIC). Il Control Plane viene centralizzato nel Controller SDN, mentre agli switch fisici rimane solo il forwarding veloce (Data Plane)." 
    },
    { 
        id: "AP-008",
        domain: "Automation and Programmability", 
        q: "Which pillar of the Cisco Catalyst Center (formerly Cisco DNA Center) provides AI/ML-driven network health scores, client 360-degree views, and automated path tracing?", 
        options: [
            "Design", 
            "Policy", 
            "Provision", 
            "Assurance"
        ], 
        correct: 3, 
        exp: "I 4 moduli chiave di Cisco Catalyst Center / DNA Center sono: 1) Design (configurazione gerarchia campus, profili di rete), 2) Policy (creazione Virtual Network, policy di accesso SDA), 3) Provision (onboarding PnP dei dispositivi), 4) Assurance (monitoraggio proattivo, health score, telemetria AI, analisi problemi client)." 
    },
    { 
        id: "AP-009",
        domain: "Automation and Programmability", 
        q: "Which network management protocol uses YANG data models, runs over SSH on port 830, and exchanges messages formatted in XML?", 
        options: [
            "NETCONF", 
            "RESTCONF", 
            "SNMPv3", 
            "Telnet"
        ], 
        correct: 0, 
        exp: "NETCONF (RFC 6241) usa modelli dati definiti in YANG, si basa su sessioni sicure SSH su porta 830, e scambia dati e comandi RPC formattati in XML. RESTCONF è invece la versione alternativa basata su HTTP/HTTPS (REST) che supporta sia XML che JSON." 
    },
    { 
        id: "AP-010",
        domain: "Automation and Programmability", 
        q: "What is the primary function of an overlay network in Cisco Software-Defined Access (SD-Access)?", 
        options: [
            "To provide physical power and cabling between distribution switches.", 
            "To encapsulate user traffic in VXLAN tunnels and provide logical segmentation independent of physical topology.", 
            "To act as the physical underlay routing network running IS-IS.", 
            "To replace DNS and DHCP with distributed multicast databases."
        ], 
        correct: 1, 
        exp: "In SD-Access, la rete si divide in: 1) Underlay = l'infrastruttura fisica di instradamento IP (di solito routed access con IS-IS). 2) Overlay = la rete logica virtualizzata creata tramite incapsulamento VXLAN, che trasporta il traffico degli utenti e applica micro-segmentazione (SGT) indipendentemente dai vincoli fisici della rete." 
    }
];

// Compatibilità esportazione Node.js per test automatizzati
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ccnaDatabase;
}

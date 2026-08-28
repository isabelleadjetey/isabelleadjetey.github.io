const ccnaDatabase = [
    // ----------------------------------------------------
    // DOMAIN 1: Network Fundamentals
    // ----------------------------------------------------
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
        exp: "Per supportare 500 host, servono 9 bit per gli host (2^9 = 512, meno 2 = 510 host validi). Poiché IPv4 ha 32 bit, 32 - 9 = 23. Una maschera /23 equivale a 255.255.254.0. Una /24 darebbe solo 254 host (troppo pochi), una /22 darebbe 1022 host (troppo spreco)." 
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
        exp: "Nella 'Collapsed Core Architecture' (tipica delle reti di medie dimensioni), i layer di Core e Distribution sono fusi insieme negli stessi apparati fisici (di solito switch Layer 3 ad alte prestazioni), riducendo i costi rispetto alla Three-Tier classica." 
    },
    { 
        id: "NF-004",
        domain: "Network Fundamentals", 
        q: "Which two fields are present in an Ethernet frame header? (Choose two)", 
        options: [
            "Source IP Address", 
            "Destination MAC Address", 
            "Time to Live (TTL)", 
            "Type/Length"
        ], 
        correct: [1, 3], // Note: UI currently supports single choice, I'll adapt to single choice.
        exp: "Il frame Ethernet Layer 2 contiene: Preamble, Destination MAC, Source MAC, Type/Length, Data (Payload), e FCS. Gli IP e il TTL appartengono al pacchetto Layer 3." 
    },

    // ----------------------------------------------------
    // DOMAIN 2: Network Access
    // ----------------------------------------------------
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
        exp: "La VLAN 10 non è la Native VLAN su nessuno dei due switch. Pertanto, il traffico della VLAN 10 viaggerà TAGGATO e verrà ricevuto correttamente da Switch B. Il 'Native VLAN mismatch' genera avvisi CDP e unisce i domini di broadcast delle VLAN 1 e 99, ma NON fa crollare il trunk né blocca i frame regolarmente taggati della VLAN 10." 
    },
    { 
        id: "NA-002",
        domain: "Network Access", 
        q: "Which Spanning Tree port state immediately transitions to the forwarding state without waiting for listening and learning phases?", 
        options: [
            "PortFast", 
            "BPDUGuard", 
            "Root Port", 
            "Designated Port"
        ], 
        correct: 0, 
        exp: "La feature 'PortFast' fa sì che una porta salti gli stati Listening e Learning (che richiederebbero 30 secondi in STP classico) e passi subito in Forwarding. Si usa ESCLUSIVAMENTE per porte collegate a end-device (PC, stampanti)." 
    },
    { 
        id: "NA-003",
        domain: "Network Access", 
        q: "Which wireless architecture manages all AP configurations and client authentications from a centralized appliance?", 
        options: [
            "Autonomous AP architecture", 
            "Cloud-based Meraki architecture", 
            "Split-MAC (Controller-based) architecture", 
            "Mesh architecture"
        ], 
        correct: 2, 
        exp: "L'architettura Split-MAC divide i compiti: le funzioni real-time (invio dei frame) restano al Lightweight AP (LAP), mentre l'intelligenza (autenticazione, configurazione, policy) è spostata sul WLC (Wireless LAN Controller)." 
    },
    { 
        id: "NA-004",
        domain: "Network Access", 
        q: "What is the purpose of the 'switchport nonegotiate' command?", 
        options: [
            "It forces the port to become an access port.", 
            "It disables the sending of DTP (Dynamic Trunking Protocol) frames.", 
            "It prevents the switch from negotiating a PoE power level.", 
            "It disables PortFast on the interface."
        ], 
        correct: 1, 
        exp: "Il comando 'switchport nonegotiate' spegne DTP. Se impostato su un trunk manuale ('switchport mode trunk'), la porta rimarrà un trunk ma non invierà pacchetti DTP, migliorando la sicurezza." 
    },

    // ----------------------------------------------------
    // DOMAIN 3: IP Connectivity
    // ----------------------------------------------------
    { 
        id: "IC-001",
        domain: "IP Connectivity", 
        q: "Refer to the exhibit. Which route will the router use to forward a packet addressed to 10.1.1.50?<br><br><pre><code>R1# show ip route\nO 10.1.1.0/24 [110/65] via 192.168.1.2\nS 10.1.0.0/16 [1/0] via 172.16.1.2\nD 10.1.1.32/27 [90/30720] via 10.0.0.2\nC 10.1.1.0/25 is directly connected, Fa0/0</code></pre>", 
        options: [
            "The OSPF route (10.1.1.0/24)", 
            "The Static route (10.1.0.0/16)", 
            "The EIGRP route (10.1.1.32/27)", 
            "The Directly Connected route (10.1.1.0/25)"
        ], 
        correct: 2, 
        exp: "Regola fondamentale del routing: il Longest Prefix Match vince SEMPRE sull'Administrative Distance. Il pacchetto per 10.1.1.50 fa match con tutte e 4 le rotte, ma la /27 (EIGRP) è la più specifica (il prefisso più lungo). Il router userà la rotta D (EIGRP)." 
    },
    { 
        id: "IC-002",
        domain: "IP Connectivity", 
        q: "What is the default OSPF cost for a FastEthernet (100 Mbps) interface if the auto-cost reference-bandwidth is not changed?", 
        options: [
            "1", 
            "10", 
            "100", 
            "1000"
        ], 
        correct: 0, 
        exp: "Il costo OSPF si calcola come: Reference Bandwidth / Interface Bandwidth. Per default, la Reference Bandwidth è 100 Mbps. Quindi per una FastEthernet: 100 / 100 = 1. (Nota: anche per la Gigabit 1000 Mbps sarà 1, perché il costo minimo è 1. Per questo oggi si cambia la reference-bandwidth!)." 
    },
    { 
        id: "IC-003",
        domain: "IP Connectivity", 
        q: "Which parameter must match for two routers to form an OSPF adjacency?", 
        options: [
            "Router ID", 
            "Hello and Dead timers", 
            "OSPF process ID", 
            "Priority"
        ], 
        correct: 1, 
        exp: "Per formare un'adiacenza OSPF, i router devono avere uguali: Area ID, Hello/Dead timers, Authentication password e Stub area flag. Il Process ID ha importanza solo locale, e il Router ID DEVE essere diverso, altrimenti c'è un conflitto." 
    },
    { 
        id: "IC-004",
        domain: "IP Connectivity", 
        q: "In an IPv6 environment, which command creates a static host route to 2001:DB8::5 using a next hop of 2001:DB8:A::1?", 
        options: [
            "ipv6 route 2001:DB8::5/128 2001:DB8:A::1", 
            "ipv6 route 2001:DB8::5/64 2001:DB8:A::1", 
            "ip route v6 2001:DB8::5 2001:DB8:A::1", 
            "ipv6 route host 2001:DB8::5 2001:DB8:A::1"
        ], 
        correct: 0, 
        exp: "Una 'host route' indica un singolo, specifico indirizzo IP. In IPv4 si usa la subnet mask 255.255.255.255. In IPv6, si usa il prefisso /128. Quindi la sintassi corretta è ipv6 route <ip>/128 <next-hop>." 
    },

    // ----------------------------------------------------
    // DOMAIN 4: IP Services
    // ----------------------------------------------------
    { 
        id: "IS-001",
        domain: "IP Services", 
        q: "Refer to the exhibit. Which type of NAT is configured on the router?<br><br><pre><code>ip nat pool MY_POOL 209.165.200.225 209.165.200.225 netmask 255.255.255.248\naccess-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 pool MY_POOL overload</code></pre>", 
        options: [
            "Dynamic NAT without Port Translation", 
            "Static NAT", 
            "PAT (Port Address Translation)", 
            "NAT64"
        ], 
        correct: 2, 
        exp: "La parola chiave 'overload' alla fine del comando indica che stiamo usando PAT (Port Address Translation). Permette a decine di host della rete 192.168.1.0 di uscire su internet condividendo il singolo IP pubblico 209.165.200.225." 
    },
    { 
        id: "IS-002",
        domain: "IP Services", 
        q: "A network engineer configures 'ip helper-address 10.1.1.100' on the Fa0/0 interface. What is the primary purpose of this command?", 
        options: [
            "To forward DNS queries to the DNS server at 10.1.1.100", 
            "To convert local DHCP broadcast requests into unicast packets sent to 10.1.1.100", 
            "To define the next-hop gateway for traffic entering Fa0/0", 
            "To establish an NTP synchronization with 10.1.1.100"
        ], 
        correct: 1, 
        exp: "I messaggi DHCP Discover sono pacchetti Broadcast, quindi vengono bloccati dai router. L'ip helper-address intercetta questi broadcast e li inoltra come pacchetti Unicast (diretti) al server DHCP che si trova in un'altra subnet." 
    },
    { 
        id: "IS-003",
        domain: "IP Services", 
        q: "Which command configures a Cisco router as an NTP client that synchronizes time from an external server at 192.0.2.1?", 
        options: [
            "ntp master 192.0.2.1", 
            "ntp server 192.0.2.1", 
            "clock set 192.0.2.1", 
            "ntp sync 192.0.2.1"
        ], 
        correct: 1, 
        exp: "Il comando 'ntp server <ip>' dice al router di comportarsi da client e richiedere l'orario a quel server. Il comando 'ntp master' farebbe comportare il router stesso da server autoritativo per la rete interna." 
    },
    { 
        id: "IS-004",
        domain: "IP Services", 
        q: "Which QoS mechanism places packets into queues and drops packets when the queue becomes full?", 
        options: [
            "Classification", 
            "Marking", 
            "Policing", 
            "Shaping"
        ], 
        correct: 2, 
        exp: "Il Policing taglia (drop) il traffico che eccede il limite imposto. Lo Shaping invece ritarda (buffer) il traffico in eccesso per lisciarne i picchi, ma senza dropparlo (finché il buffer non è saturo)." 
    },

    // ----------------------------------------------------
    // DOMAIN 5: Security Fundamentals
    // ----------------------------------------------------
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
        exp: "La prima riga blocca esplicitamente il traffico TCP porta 80 (HTTP) dal PC 192.168.1.5 verso il Server 10.0.0.1. La seconda riga (permit ip any any) annulla l'Implicit Deny finale, permettendo quindi tutto il resto del traffico." 
    },
    { 
        id: "SF-002",
        domain: "Security Fundamentals", 
        q: "Which security vulnerability is mitigated by configuring Dynamic ARP Inspection (DAI)?", 
        options: [
            "MAC flooding", 
            "ARP spoofing (Man-in-the-Middle)", 
            "Rogue DHCP servers", 
            "VLAN Hopping"
        ], 
        correct: 1, 
        exp: "Il DAI protegge dagli attacchi ARP Spoofing (ARP Poisoning). Legge il database del DHCP Snooping (binding table) e scarta i pacchetti ARP gratuiti falsificati da attaccanti che tentano un Man-In-The-Middle." 
    },
    { 
        id: "SF-003",
        domain: "Security Fundamentals", 
        q: "What is the primary difference between WPA2 and WPA3 security?", 
        options: [
            "WPA3 uses TKIP, while WPA2 uses AES.", 
            "WPA3 replaces Pre-Shared Key (PSK) with Simultaneous Authentication of Equals (SAE).", 
            "WPA3 requires an external RADIUS server for personal networks.", 
            "WPA2 encrypts management frames, while WPA3 does not."
        ], 
        correct: 1, 
        exp: "La grande rivoluzione di WPA3-Personal è SAE. Sostituisce l'handshake a 4-vie del WPA2-PSK, rendendo impossibili gli attacchi brute-force offline contro la password del Wi-Fi." 
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
        exp: "In Cisco IOS, i livelli di privilegio vanno da 0 a 15. Il livello 1 è la modalità User EXEC (base). Il livello 15 è Privileged EXEC (enable mode). Se imposti privilege 15, l'utente logga direttamente in modalità root (#)." 
    },

    // ----------------------------------------------------
    // DOMAIN 6: Automation and Programmability
    // ----------------------------------------------------
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
        exp: "In JSON, le parentesi graffe { } definiscono un Oggetto, mentre le parentesi quadre [ ] definiscono un Array (una lista di valori). In questo caso 'interfaces' è un array di due stringhe." 
    },
    { 
        id: "AP-002",
        domain: "Automation and Programmability", 
        q: "In an SDN architecture, which interface/API is used by the Controller to communicate DOWNWARD with the physical network devices (switches/routers)?", 
        options: [
            "Northbound API", 
            "Southbound API", 
            "Eastbound API", 
            "Westbound API"
        ], 
        correct: 1, 
        exp: "Southbound APIs (come OpenFlow, NETCONF, o RESTCONF) comunicano 'verso il basso' verso l'hardware fisico. Le Northbound APIs (spesso REST) comunicano 'verso l'alto' verso le applicazioni di management (es. script Python)." 
    },
    { 
        id: "AP-003",
        domain: "Automation and Programmability", 
        q: "Which of the following configuration management tools uses a 'Push' model and connects to network devices exclusively via SSH without requiring a local agent?", 
        options: [
            "Puppet", 
            "Chef", 
            "Ansible", 
            "SaltStack"
        ], 
        correct: 2, 
        exp: "Ansible usa un modello PUSH e un'architettura agentless basata su SSH. Puppet e Chef usano tipicamente un modello PULL e richiedono l'installazione di un agent software (ruby) sul dispositivo target." 
    },
    { 
        id: "AP-004",
        domain: "Automation and Programmability", 
        q: "When interacting with a REST API, which HTTP method should be used to retrieve the running configuration of a device without modifying it?", 
        options: [
            "GET", 
            "POST", 
            "PUT", 
            "PATCH"
        ], 
        correct: 0, 
        exp: "I metodi CRUD nelle REST API mappano ad HTTP così: Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE. Per leggere i dati senza alterarli si usa sempre GET." 
    }
];

// Funzione di esportazione (compatibilità per eventuali loader modulari)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ccnaDatabase;
}

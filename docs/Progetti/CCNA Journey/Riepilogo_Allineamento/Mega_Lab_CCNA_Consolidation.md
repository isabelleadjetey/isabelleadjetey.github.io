# Mega Lab CCNA: Consolidamento Totale "Sede Enterprise"

> **OBIETTIVO:**
> Il presente laboratorio documenta l'implementazione di un'infrastruttura di rete aziendale completa ("Sede Enterprise"), integrando i protocolli di Layer 2, Layer 3, i Servizi IP e le policy di Sicurezza richiesti per l'operatività in un ambiente SNOC.

## Descrizione Architetturale
L'infrastruttura simula un ambiente enterprise strutturato, basato sui seguenti moduli tecnologici:

1.  **Network Access (Layer 2):** Segmentazione del traffico tramite VLAN e implementazione della ridondanza fisica tramite aggregazione dei link (**EtherChannel LACP**). Ottimizzazione della topologia loop-free mediante il protocollo **STP** (elezione del Root Bridge).
2.  **IP Connectivity (Layer 3):** Routing inter-VLAN basato su architettura **Router-on-a-Stick**. Configurazione del protocollo di routing dinamico **OSPF** per la propagazione della rotta di default e l'annuncio delle reti locali.
3.  **IP Services:** Automazione dell'indirizzamento tramite **DHCP Server** e abilitazione della connettività esterna mediante **NAT Overload (PAT)** sull'interfaccia di frontiera.
4.  **Sicurezza & Monitoring:** Hardening dei dispositivi tramite SSH e Port-Security. Sincronizzazione temporale **NTP** e centralizzazione dei log di sistema tramite **Syslog** verso un server di management dedicato.


## 1. Topologia di Rete

Di seguito è riportato lo schema logico della rete. Si richiede di replicare la topologia su ambiente di simulazione (PNETLab o Cisco Packet Tracer), rispettando l'assegnazione delle interfacce.

(Topologia di rete configurata: ISP -> R1 -> SW-CORE -> SW-ACC -> End Devices)

> **IMPORTANTE - Cablaggio Cruciale:** Assicurati di usare due cavi separati tra `SW-CORE` e `SW-ACC` sulle porte `Fa0/1` e `Fa0/2` per poter configurare correttamente l'EtherChannel!

---

## 2. Tabella di Indirizzamento IP

Usa questa tabella come riferimento unico per assegnare gli indirizzi IP durante il lab.

| Dispositivo | Interfaccia / VLAN | Indirizzo IP | Subnet Mask | Gateway (Next Hop) |
| :--- | :--- | :--- | :--- | :--- |
| **R1** | `Gi0/0` (Verso ISP) | `203.0.113.2` | `255.255.255.252` | `203.0.113.1` (Default) |
| **R1** | `Gi0/1.10` (VLAN 10) | `192.168.10.254` | `255.255.255.0` | N/A |
| **R1** | `Gi0/1.20` (VLAN 20) | `192.168.20.254` | `255.255.255.0` | N/A |
| **PC-1** | NIC (VLAN 10) | *DHCP* | *DHCP* | *DHCP* |
| **PC-2** | NIC (VLAN 10) | *DHCP* | *DHCP* | *DHCP* |
| **SRV-MGMT**| NIC (VLAN 20) | `192.168.20.100` | `255.255.255.0` | `192.168.20.254` |
| **ISP** | `Gi0/0` (Verso R1) | `203.0.113.1` | `255.255.255.252` | N/A |

---

## Step 1: Layer 2 (VLAN, Trunk e EtherChannel)

Configurazione dell'infrastruttura di commutazione locale. Le VLAN garantiscono l'isolamento dei domini di broadcast, mentre l'EtherChannel fornisce ridondanza e incremento della larghezza di banda.

> **NOTA:**  
> I seguenti comandi devono essere eseguiti su entrambi gli switch di rete (`SW-CORE` e `SW-ACC`):

```text
enable
configure terminal

! 1. Creazione delle VLAN
vlan 10
 name DATI_UTENTI
vlan 20
 name MANAGEMENT
exit

! 2. Creazione EtherChannel (LACP) tra gli switch
interface range FastEthernet 0/1 - 2
 channel-group 1 mode active
 exit

! 3. Configurazione del Trunk sul canale aggregato
interface Port-channel 1
 switchport mode trunk
 switchport nonegotiate
 switchport trunk allowed vlan 10,20
 exit
```

> **ATTENZIONE:**  
> I seguenti comandi sono destinati esclusivamente allo switch di distribuzione (`SW-CORE`):

```text
! Porta verso the Router R1
interface GigabitEthernet 0/1
 switchport mode trunk
 switchport nonegotiate
 switchport trunk allowed vlan 10,20
 exit

! SW-CORE deve essere il Root Bridge per evitare cicli
spanning-tree vlan 10,20 root primary
```

> **NOTA:**  
> I seguenti comandi sono destinati esclusivamente allo switch di accesso (`SW-ACC`):

```text
! Configurazione porta PC con Port Security
 interface FastEthernet 0/10
  switchport mode access
  switchport access vlan 10
  spanning-tree portfast
  switchport port-security
  switchport port-security maximum 2
  switchport port-security violation restrict
  switchport port-security mac-address sticky
  exit
 
 ! Configurazione porta PC-2 con Port Security
 interface FastEthernet 0/11
  switchport mode access
  switchport access vlan 10
  spanning-tree portfast
  switchport port-security
  switchport port-security maximum 2
  switchport port-security violation restrict
  switchport port-security mac-address sticky
  exit

! Configurazione porta Server
interface FastEthernet 0/20
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
 exit
```

---

## Step 2: Layer 3 (Routing Inter-VLAN e OSPF)

Implementazione del routing inter-VLAN tramite architettura **Router-on-a-Stick** e configurazione dell'accesso alla rete geografica tramite protocollo OSPF.

> **IMPORTANTE:**  
> Le configurazioni descritte in questa sezione devono essere applicate al router di frontiera **R1**.

```text
enable
configure terminal

! Accendiamo l'interfaccia fisica verso lo switch
interface GigabitEthernet 0/1
 no shutdown
 exit

! Sub-interface per la VLAN 10 (Utenti)
interface GigabitEthernet 0/1.10
 encapsulation dot1Q 10
 ip address 192.168.10.254 255.255.255.0
 exit

! Sub-interface per la VLAN 20 (Management)
interface GigabitEthernet 0/1.20
 encapsulation dot1Q 20
 ip address 192.168.20.254 255.255.255.0
 exit

! Interfaccia esterna (Verso l'ISP)
interface GigabitEthernet 0/0
 ip address 203.0.113.2 255.255.255.252
 no shutdown
 exit

! Configurazione OSPF e Rotta di Default
router ospf 1
 ! Sicurezza: Evitiamo di inviare messaggi OSPF verso le LAN
 passive-interface GigabitEthernet 0/1.10
 passive-interface GigabitEthernet 0/1.20
 ! Annunciamo le nostre reti locali
 network 192.168.10.0 0.0.0.255 area 0
 network 192.168.20.0 0.0.0.255 area 0
 ! Iniettiamo la rotta di default nel dominio OSPF
 default-information originate
 exit

! Rotta statica globale per uscire su Internet
ip route 0.0.0.0 0.0.0.0 203.0.113.1
```

> **NOTA:**
> **Configurazione Router ISP (Simulazione Internet):**
> L'ISP ha bisogno di un indirizzo IP, una loopback per simulare Google (`8.8.8.8`) e, fondamentale, **una rotta di ritorno** verso i nostri IP pubblici NAT!

```text
! Sul Router ISP
enable
configure terminal
interface GigabitEthernet 0/0
 ip address 203.0.113.1 255.255.255.252
 no shutdown
 exit

! Loopback per simulare un sito Internet
interface loopback 0
 ip address 8.8.8.8 255.255.255.255
 exit

! La "Rotta di Ritorno" vitale per evitare i ping in Timeout!
ip route 0.0.0.0 0.0.0.0 203.0.113.2
```

---

## Step 3: IP Services (DHCP e NAT Overload)

Configurazione dell'assegnazione dinamica degli indirizzi IP per gli end-device e abilitazione della Network Address Translation (PAT) per la connettività esterna.

> **NOTA:**  
> I comandi devono essere eseguiti sul router **R1**.

```text
! 1. Definizione di quali interfacce sono "Dentro" e quali "Fuori"
interface GigabitEthernet 0/1.10
 ip nat inside
 exit
interface GigabitEthernet 0/1.20
 ip nat inside
 exit
interface GigabitEthernet 0/0
 ip nat outside
 exit

! 2. Creazione dell'Access-List per il NAT (Quali IP possono navigare?)
access-list 1 permit 192.168.10.0 0.0.0.255
access-list 1 permit 192.168.20.0 0.0.0.255

! 3. Abilitazione del PAT (Port Address Translation) sull'interfaccia esterna
ip nat inside source list 1 interface GigabitEthernet 0/0 overload

! 4. Configurazione del DHCP Server per i dipendenti (VLAN 10)
ip dhcp excluded-address 192.168.10.254
ip dhcp pool POOL_UTENTI
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.254
 dns-server 8.8.8.8
 exit
```

---

## Step 4: Sicurezza e Monitoraggio (SNOC Ready)

Implementazione delle direttive operative e di sicurezza: sincronizzazione del protocollo NTP, inoltro dei log di sistema verso il server centralizzato `SRV-MGMT` e hardening degli accessi remoti.

> **SUGGERIMENTO:**  
> Verificare che il server `SRV-MGMT` disponga dell'indirizzamento IP statico `192.168.20.100` con Default Gateway `192.168.20.254`.

```text
! Sul router R1
configure terminal

! 1. Allineamento orario (Il Metronomo)
ntp server 192.168.20.100

! 2. Centralizzazione dei Log (Il Diario)
logging host 192.168.20.100
service timestamps log datetime msec
logging trap notifications

! 3. Hardening degli Accessi (SSH)
hostname R1
ip domain-name enterprise.lab
crypto key generate rsa modulus 2048
username admin privilege 15 secret MegaLab2026!
line vty 0 4
 login local
 transport input ssh
 exit
```

---

## Step 5: Validazione e Troubleshooting

Fase di collaudo e verifica del corretto instradamento dei pacchetti attraverso l'infrastruttura. Utilizzare i seguenti comandi diagnostici:

1.  **End-Device (PC-1):**
    *   Abilitare il protocollo DHCP sull'interfaccia di rete e verificare l'assegnazione corretta della classe IP `192.168.10.0/24`.
    *   Eseguire il comando `ping 8.8.8.8` per confermare il corretto funzionamento di **VLAN, Routing inter-VLAN e NAT**.
2.  **Distribuzione (SW-CORE):**
    *   Eseguire `show etherchannel summary` e accertarsi che il Port-channel `Po1` si trovi in stato logico `(SU)`.
    *   Eseguire `show spanning-tree vlan 10` e verificare la presenza della dicitura *"This bridge is the root"*.
3.  **Gateway L3 (R1):**
    *   Eseguire `show ip nat translations` durante un test ICMP da PC-1 verso l'esterno per osservare la corretta traslazione PAT dell'IP sorgente privato.
    *   Eseguire `show ntp status` per verificare che lo strato di sincronizzazione risulti "synchronized".

> **ATTENZIONE:**  
> In caso di anomalie (es. "Request Timeout" durante il test ICMP), verificare attentamente la presenza e la correttezza della rotta di ritorno statica configurata sul router ISP.

---

## Step 6: Risoluzione dei Problemi Frequenti (Troubleshooting)

Il troubleshooting è la competenza fondamentale per la certificazione CCNA e per l'operatività quotidiana nello SNOC. Se la validazione del punto precedente fallisce, procedere con questa checklist metodologica:

### 1. Fallimento del Ping Inter-VLAN (Layer 3)
**Sintomo:** Il PC (VLAN 10) non riesce a comunicare con il Server (VLAN 20).
*   **Diagnosi (Segmentation Fault Analysis):**
    *   Eseguire il ping dal PC verso il proprio Default Gateway (`192.168.10.254`). Se fallisce, il problema è a Livello 2 (VLAN/Trunk).
    *   Eseguire il ping dal Server verso il proprio Default Gateway (`192.168.20.254`). Se fallisce, verificare l'assegnazione IP del Server.
*   **Causa più frequente:** Assenza o errata configurazione del Default Gateway nelle proprietà TCP/IP del Server. Senza il gateway, il Server non sa come instradare i pacchetti di risposta verso reti esterne.

### 2. PC non riceve l'indirizzo IP dal DHCP (Layer 2/3)
**Sintomo:** Il PC riceve un indirizzo APIPA (`169.254.x.x`) o fallisce la richiesta DHCP.
*   **Diagnosi:** 
    *   Verificare che l'interfaccia del router (`Gi0/1.10`) sia attiva (`no shutdown`) e assegnata correttamente.
    *   Controllare a quale porta fisica dello switch di accesso (`SW-ACC`) è collegato il PC.
*   **Causa più frequente:** La porta dello switch a cui è collegato il PC è rimasta nella VLAN di default (VLAN 1). Per risolvere, assegnare esplicitamente la porta fisica alla VLAN corretta:
    ```text
    interface FastEthernet 0/10
     switchport mode access
     switchport access vlan 10
    ```

### 3. Ping verso l'Esterno Fallito (Routing / NAT)
**Sintomo:** I dispositivi interni comunicano tra loro, ma il ping verso `8.8.8.8` fallisce.
*   **Diagnosi con Traceroute:** 
    *   Lanciare il comando `tracert 8.8.8.8` dal PC.
    *   Se il traceroute si ferma a `192.168.10.254` (R1), il problema è nel NAT o nella rotta di default di R1.
    *   Se il traceroute arriva a `203.0.113.1` (ISP) ma non riceve risposta, manca la "Rotta di Ritorno" sull'ISP.
*   **Comandi di Verifica:** 
    *   `show ip route` su R1 (per verificare la rotta di default `0.0.0.0`).
    *   `show ip nat statistics` su R1 (per assicurarsi che le interfacce Inside/Outside siano state dichiarate correttamente).

---

## Step 7: Sfide di Troubleshooting (SNOC Level)

Una volta che tutto funziona, prova a "rompere" la rete per simulare un ticket reale:
1.  **Mismatch di VLAN:** Cambia la VLAN sulla porta dello switch ma non sulla sub-interface del router. Cosa succede al traffico?
2.  **Native VLAN Mismatch:** Cambia la Native VLAN su `SW-CORE` ma non su `SW-ACC`. Quale errore CDP vedi in console?
3.  **Port-Channel down:** Disabilita una delle due porte dell'EtherChannel. Il traffico si interrompe o continua a fluire?

---

## Step 8: Espansione Dual-Stack (IPv6)

Come ultima sfida, abilitiamo l'IPv6 in parallelo all'IPv4 su R1 per renderlo un gateway moderno.

```text
! Sul router R1
enable
configure terminal
ipv6 unicast-routing

! Abilitazione IPv6 sulla VLAN 10 (Utenti)
interface GigabitEthernet 0/1.10
 ipv6 address 2001:db8:acad:10::254/64
 ipv6 address fe80::1 link-local
 exit

! Abilitazione IPv6 sulla VLAN 20 (Server)
interface GigabitEthernet 0/1.20
 ipv6 address 2001:db8:acad:20::254/64
 ipv6 address fe80::1 link-local
 exit

! Verifica
! Esegui 'show ipv6 interface brief' per vedere gli indirizzi GUA e LLA attivi.
```

---

## Step 5: Sicurezza e Hardening Avanzato (SNOC Standards)

In questa fase finale, implementiamo le misure di sicurezza necessarie per proteggere l'accesso ai dispositivi e garantire la stabilità della rete locale contro attacchi comuni di Layer 2.

### 1. Configurazione Accesso Remoto Sicuro (SSH)
*Applicabile a tutti i dispositivi (R1, SW-CORE, SW-ACC).*  
Sostituiamo il protocollo Telnet (in chiaro) con SSH (criptato).

```text
enable
configure terminal

! 1. Parametri necessari per SSH
ip domain-name enterprise.lab

! 2. Generazione delle chiavi RSA (scegliere 1024 o superiore)
crypto key generate rsa
> 1024

! 3. Configurazione utente locale con privilegi massimi
username admin privilege 15 secret MegaLab2026!

! 4. Abilitazione SSH sulle linee virtuali e blocco Telnet
line vty 0 4
 login local
 transport input ssh
 exit
```

### 2. DHCP Snooping (Prevenzione Rogue DHCP)
*Applicabile principalmente allo switch di accesso **SW-ACC**.*  
Configuriamo lo switch affinché accetti offerte DHCP solo dalla porta collegata al router ufficiale.

```text
enable
configure terminal

! Abilitazione globale e per le VLAN specifiche
ip dhcp snooping
ip dhcp snooping vlan 10,20

! Impostazione della porta "Trusted" (le porte fisiche verso lo SW-CORE/R1)
interface range fastEthernet 0/1 - 2
 ip dhcp snooping trust
 exit

! Nota: Disabilitare l'opzione 82 se il server DHCP (R1) non la supporta
no ip dhcp snooping information option
```

### 3. Banner di Sicurezza (Legal Warning)
Aggiungiamo un avviso legale che compare al login per scoraggiare accessi non autorizzati.

```text
banner motd #
****************************************************************
* ATTENZIONE: ACCESSO RISERVATO AL PERSONALE AUTORIZZATO        *
* TUTTE LE ATTIVITA' SONO MONITORATE E REGISTRATE.             *
* L'ACCESSO NON AUTORIZZATO E' PERSEGUITO A NORMA DI LEGGE.    *
****************************************************************
#
```

---

---

## Focus Tecnico: Port Security Deep Dive

La **Port Security** è un meccanismo di difesa di Layer 2 che permette di controllare quali dispositivi (identificati dal loro MAC address) possono connettersi a una specifica porta dello switch.

### 1. Metodi di Apprendimento MAC
*   **Statico:** Il MAC viene configurato manualmente (massima sicurezza, alta manutenzione).
*   **Dinamico:** Lo switch impara il MAC e lo tiene in RAM (perso al riavvio).
*   **Sticky:** Il metodo usato nel lab. Lo switch impara il MAC e lo scrive automaticamente nella `running-config`. Se salvi, il MAC rimane memorizzato anche dopo il riavvio.

### 2. Violation Modes: Cosa succede in caso di attacco?

| Modalità | Stato Porta | Log (Syslog) | Contatore Violazioni | Traffico |
| :--- | :--- | :--- | :--- | :--- |
| <span class="badge badge-shutdown">Shutdown</span> | **Disabled (err-disable)** | Sì | Incrementa | Bloccato |
| <span class="badge badge-restrict">Restrict</span> | Up | Sì | Incrementa | Scartato |
| <span class="badge badge-protect">Protect</span> | Up | No | No | Scartato |

> **PERCHÈ RESTRICT?**
> Nel nostro laboratorio abbiamo usato `restrict`. È una scelta "SNOC-Ready" perché blocca l'attaccante e invia immediatamente una notifica al server di monitoraggio, senza però spegnere la porta (evitando interventi manuali per riattivarla).

---

## Conclusioni e Verifica Finale

Con l'implementazione di questi ultimi passaggi, il **CCNA Mega Lab** rispetta gli standard di sicurezza aziendale:
1.  **Segregazione:** VLAN dedicate per utenti e management.
2.  **Resilienza:** EtherChannel per la ridondanza dei link.
3.  **Dinamicità:** Routing OSPF e DHCP automatico.
4.  **Sicurezza:** Port Security, DHCP Snooping e accesso SSH criptato.

**Comandi di verifica consigliati:**
*   `show ip dhcp snooping` (Verifica stato sicurezza DHCP)
*   `show ip ssh` (Verifica versione e chiavi SSH)
*   `show port-security interface ...` (Verifica protezione porte)



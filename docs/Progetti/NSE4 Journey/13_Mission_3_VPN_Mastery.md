# Missione 3: Dominare le VPN (IPsec e SSL)

## Lo Scenario Aziendale
La tua azienda ha appena firmato due nuovi contratti cruciali:
1.  **Connessione Cloud (IPsec):** L'azienda ha affittato un server su AWS (Amazon Web Services) e vuole che le due reti (la tua LAN e il cloud AWS) siano unite in modo sicuro e invisibile agli utenti.
2.  **Smart Working (SSL VPN):** I dirigenti vogliono poter lavorare da casa collegandosi dal loro portatile personale per raggiungere in sicurezza il server interno `Lubuntu`.

Avendo a disposizione un solo FortiGate fisico nel tuo laboratorio, testeremo la SSL VPN dal vivo, mentre per l'IPsec faremo una simulazione "a vuoto" configurando il tunnel e imparando a fare troubleshooting da riga di comando per capire *perché* non sale.

---

## Sfida 1: Il Tunnel "Fantasma" (Site-to-Site IPsec)
Configurerai un tunnel IPsec verso un IP fittizio (AWS). Il tunnel rimarrà down, ma configurerai tutta l'infrastruttura necessaria e imparerai come fare diagnosi.

**Incarichi:**
1.  **La Configurazione Base:**
    *   Vai su *VPN > IPsec Tunnels* e clicca *Create New > IPsec Tunnel*.
    *   Scegli un nome (es. `VPN_AWS`) e seleziona **Custom** (all'esame è essenziale saperlo fare senza Wizard).
    *   *Remote Gateway:* Imposta un IP pubblico statico fittizio (es. `203.0.113.100`).
    *   *Interface:* Seleziona la tua porta WAN.
    *   *Pre-Shared Key:* Inserisci una password a tua scelta (es. `fortinet123`).
2.  **Fase 1 e Fase 2:**
    *   Assicurati di usare *Main Mode* nella Fase 1.
    *   Nella Fase 2, sotto *Quick Mode Selectors*, definisci cosa può passare:
        *   Local Subnet: `192.168.1.0/24` (la tua LAN).
        *   Remote Subnet: `10.100.0.0/16` (la presunta rete AWS).
3.  **Il Routing:**
    *   Affinché il FortiGate invii il traffico per AWS nel tunnel e non su Internet, crea una **Static Route**.
    *   Destination: `10.100.0.0/16`. Interface: `VPN_AWS` (l'interfaccia virtuale che si è appena creata).
4.  **La Firewall Policy:**
    *   Crea una policy chiamata `LAN_to_AWS`.
    *   Incoming: `port_LAN`. Outgoing: `VPN_AWS`.
    *   *Disabilita il NAT!* (Nelle VPN Site-to-Site il NAT solitamente non si usa, vogliamo che le reti parlino con i loro veri IP privati).
5.  **Il Troubleshooting (Azione CLI):**
    *   Apri la CLI in alto a destra e prova ad "accendere" forzatamente il tunnel con questo comando:
        `diagnose vpn tunnel up VPN_AWS`
    *   Ovviamente fallirà. Per vedere in tempo reale gli errori di Fase 1 (IKE) come un vero amministratore, lancia questa sequenza di debug:
        ```text
        diagnose vpn ike log-filter dst-addr4 203.0.113.100
        diagnose debug application ike -1
        diagnose debug enable
        ```
    *   Guarda i pacchetti IKE (porta UDP 500) che tentano di uscire e non ricevono risposta (Timeout). Per fermare lo spam di log, scrivi `diagnose debug disable`.

---

## Sfida 2: Lo Smart Working Reale (Remote Access SSL VPN)
Qui farai sul serio. Configurerai il FortiGate affinché tu possa collegarti ad esso tramite interfaccia Web.

**Incarichi:**
1.  **Creare gli Utenti:**
    *   Vai su *User & Authentication > User Definition*. Crea un nuovo utente locale (es. `smartworker`) con password.
    *   Vai su *User Groups* e crea un gruppo chiamato `Gruppo_Smart`. Inserisci l'utente appena creato.
2.  **Configurare il Portale:**
    *   Vai su *VPN > SSL-VPN Portals*. Modifica il portale `web-access`.
    *   Assicurati che l'opzione "Enable Web Mode" sia spuntata. Aggiungi un *Bookmark* verso il server finto (es. http://192.168.1.200 se il tuo server web python è acceso su Lubuntu).
3.  **Le Impostazioni Globali (Settings):**
    *   Vai su *VPN > SSL-VPN Settings*.
    *   *Listen on Interface:* Seleziona la tua interfaccia WAN.
    *   *Listen on Port:* `10443` (meglio non usare la 443 standard per non andare in conflitto con la gestione del FortiGate).
    *   Seleziona il certificato *Fortinet_Factory* per ora.
    *   In basso, nella tabella "Authentication/Portal Mapping", assegna il `Gruppo_Smart` al portale `web-access`.
4.  **La Firewall Policy (Vitale):**
    *   Senza questo passaggio, non funziona nulla. Crea una policy chiamata `Accesso_SmartWorking`.
    *   Incoming Interface: `SSL-VPN tunnel interface (ssl.root)`.
    *   Outgoing Interface: `port_LAN`.
    *   Source: All (IP) **E** aggiungi il gruppo `Gruppo_Smart`.
    *   Destination: La tua LAN o l'IP di Lubuntu.
    *   Service: All. NAT: Disabilitato.
5.  **Il Test Finale:**
    *   Apri il browser dal tuo PC **FISICO** (Windows).
    *   Digita `https://<IP-WAN-FortiGate>:10443`
    *   Se tutto è configurato bene, vedrai la schermata di login rossa della SSL VPN!
    *   Accedi con l'utente `smartworker` e clicca sul Bookmark per vedere se riesci a raggiungere l'interno della rete!

---

## Diario del Network Engineer: I 4 Problemi VPN del "Mondo Reale"
*(Cosa succede davvero quando lavori in produzione)*

### 1. Ping funziona, ma RDP/Web si bloccano (Problema di MTU)
- **Il Sintomo:** Il tunnel IPsec è UP. Fai un ping tra le sedi e risponde. Provi ad aprire una sessione RDP o trasferire un file e si blocca tutto.
- **La Causa:** L'incapsulamento IPsec aggiunge byte ai pacchetti. I pacchetti grandi (1500 byte) diventano troppo grossi (superano l'MTU standard), vengono frammentati e scartati dai router su Internet.
- **La Soluzione:** Sulla CLI del FortiGate, bisogna attivare il `tcp-mss` (es. a 1350) sulla policy della VPN per forzare i PC a inviare pacchetti TCP leggermente più piccoli che possono viaggiare sani e salvi nel tunnel.

### 2. Phase 2 "Quick Mode Selector" Mismatch
- **Il Sintomo:** La Fase 1 è UP, ma la Fase 2 fallisce costantemente. Nei log vedi l'errore `proxy id mismatch`.
- **La Causa:** Spessissimo accade nelle VPN tra brand diversi (es. FortiGate verso Cisco ASA). Tu hai dichiarato che la tua LAN è `192.168.1.0/24`, ma il sistemista dell'altra azienda ha configurato la VPN credendo che la tua LAN fosse `192.168.0.0/16`. Le reti non combaciano in modo *perfettamente speculare* e il tunnel rifiuta di aprirsi.

### 3. Asymmetric Routing (Il Traffico si perde)
- **Il Sintomo:** Fai ping verso il server di AWS. Usando il Packet Sniffer del FortiGate, vedi la tua richiesta uscire nel tunnel IPsec (Echo Request), ma non vedi nessuna risposta tornare indietro (Echo Reply).
- **La Causa:** Il routing è zoppo. Il server AWS riceve il tuo ping e tenta di rispondere, ma l'amministratore cloud si è dimenticato di inserire la "rotta di ritorno" su AWS. Il server AWS invia la risposta su Internet "normale" invece di rimetterla nel tunnel, e il pacchetto viene scartato dal mondo esterno.

### 4. L'Utente SSL VPN si logga, ma non va da nessuna parte
- **Il Sintomo:** Il dipendente accede al portale web SSL VPN con successo. Tuttavia non vede nessun Bookmark oppure riceve "Access Denied" cercando di raggiungere i server.
- **La Causa:** Ti sei dimenticato la **Firewall Policy**. Il FortiGate ha autenticato l'utente (tramite le impostazioni in *SSL-VPN Settings*), ma poiché manca una regola che autorizza il traffico dall'interfaccia `ssl.root` all'interfaccia fisica `LAN` per quello specifico User Group, il firewall blocca implicitamente tutto il traffico interno.

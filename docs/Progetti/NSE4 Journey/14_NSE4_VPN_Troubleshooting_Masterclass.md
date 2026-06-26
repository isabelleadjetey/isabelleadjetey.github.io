# VPN Troubleshooting Masterclass (FortiOS)
*Manuale Avanzato per Network Engineer*

Quando una VPN cade, il business si ferma. La capacità di diagnosticare rapidamente il problema leggendo l'output crudo della riga di comando (CLI) è ciò che separa un amministratore base da un Senior Network Engineer. Questo manuale si concentra esclusivamente sulle VPN IPsec e SSL, presentandoti i log reali e le soluzioni.

---

## 1. IPsec: Analizzare la Fase 1 (IKE)
La maggior parte dei problemi IPsec avviene durante la negoziazione della Fase 1 (porta UDP 500). Se la Fase 1 fallisce, il tunnel è completamente "Down".

**Il Comando d'Oro:**
Prima di lanciare il debug, devi *sempre* filtrare per l'IP remoto, altrimenti verrai sommerso dai log di altre VPN:
```text
diagnose vpn ike log-filter dst-addr4 <IP_DEL_PEER>
diagnose debug application ike -1
diagnose debug enable
```

### Scenario A: La Pre-Shared Key (PSK) è sbagliata
*   **Il Sintomo:** Il tunnel prova a salire ma si disconnette immediatamente.
*   **Cosa vedi nel log CLI:**
    ```text
    ike 0:VPN_AWS:43: PSK authentication failed
    ike 0:VPN_AWS:43: possible pre-shared secret mismatch
    ```
*   **La Soluzione:** L'errore è cristallino. Tu o l'amministratore dell'altra sede avete digitato male la password. Reinseritela su entrambi i firewall.

### Scenario B: IKE Proposal Mismatch
*   **Il Sintomo:** Il firewall invia richieste ma l'altro firewall rifiuta l'offerta.
*   **Cosa vedi nel log CLI:**
    ```text
    ike 0:VPN_AWS:44: peer responded with error: NO_PROPOSAL_CHOSEN
    ike 0:VPN_AWS:44: no SA proposal chosen
    ```
*   **La Soluzione:** Non siete d'accordo sulla crittografia. Tu hai proposto `AES256-SHA256`, ma l'altro firewall supporta solo `AES128-SHA1`. Controlla la Fase 1 su entrambi gli apparati e assicurati che abbiano almeno un algoritmo in comune.

### Scenario C: Peer ID Mismatch (Aggressive Mode)
*   **Cosa vedi nel log CLI:**
    ```text
    ike 0:VPN_AWS:45: peer ID mismatch
    ike 0:VPN_AWS:45: connection dropping
    ```
*   **La Soluzione:** In Aggressive Mode (o Dialup), l'identificazione avviene tramite "Local ID". Il FortiGate si aspetta che l'altro si presenti come `BranchOffice`, ma l'altro si sta presentando col suo IP o con un nome diverso.

---

## 2. IPsec: Analizzare la Fase 2 (IPsec/ESP)
Se la Fase 1 va a buon fine (IKE SA stabilita), ma la Fase 2 fallisce, la VPN apparirà in uno stato ibrido (spesso verde sull'interfaccia, ma il traffico non passa).

### Scenario D: Quick Mode Selector (Proxy ID) Mismatch
*   **Il Sintomo:** Nelle VPN con dispositivi non-Fortinet (es. Cisco), il tunnel non fa passare i pacchetti.
*   **Cosa vedi nel log CLI:**
    ```text
    ike 0:VPN_AWS:50: failed to negotiate IPsec SA
    ike 0:VPN_AWS:50: proxy id mismatch
    ```
*   **La Soluzione:** I selettori della Fase 2 non coincidono perfettamente. 
    *   *Tuo FortiGate:* Local 192.168.1.0/24, Remote 10.100.0.0/16.
    *   *Loro Firewall:* Local 10.100.0.0/24 (Erratissimo! Hanno sbagliato la subnet mask), Remote 192.168.1.0/24.
    Le dichiarazioni devono essere speculari al singolo bit.

---

## 3. IPsec: Problemi di Traffico (Tunnel UP ma non si naviga)

### Scenario E: Asymmetric Routing e il "Reverse Path Forwarding"
*   **Il Sintomo:** Fai un ping verso la sede remota, non ricevi risposta.
*   **Il Debug Flow:** Esegui un debug flow per seguire il ping:
    ```text
    diagnose debug flow filter addr 10.100.0.5
    diagnose debug flow show function-name enable
    diagnose debug flow trace start 10
    ```
*   **Cosa vedi nel log CLI:**
    ```text
    id=20085 trace_id=3 func=resolve_ip_tuple_fast line=5667 msg="vd-root: route to 10.100.0.5 via VPN_AWS"
    id=20085 trace_id=3 func=ipsec_forward_ip line=1234 msg="encapsulated and sent out"
    ...nessuna risposta in entrata...
    ```
*   **La Soluzione:** Il pacchetto è uscito perfettamente nel tunnel. Se non torna indietro, il routing dall'altra parte è rotto. Il firewall remoto non sa che deve spedire le risposte dentro il tunnel IPsec.

### Scenario F: Il Problema dell'MTU (Path MTU Discovery)
*   **Il Sintomo:** Il Ping funziona, ma se provi a scaricare un file o aprire una pagina web, la connessione si "congela" all'infinito.
*   **La Causa:** L'header ESP di IPsec ruba spazio prezioso nel pacchetto (circa 50-80 byte). I pacchetti web da 1500 byte non ci entrano più, devono essere frammentati, ma alcuni router intermedi bloccano la frammentazione (ICMP Type 3 Code 4 bloccato).
*   **La Soluzione:** Attiva il TCP-MSS Clamping sulla policy:
    ```text
    config firewall policy
        edit <id_policy>
        set tcp-mss-sender 1350
        set tcp-mss-receiver 1350
    end
    ```

---

## 4. SSL VPN: Diagnosi Avanzata
La SSL VPN usa TLS/SSL invece di IKE. I problemi si concentrano su autenticazione, portali e permessi.

### Scenario G: Autenticazione Fallita (L'Utente Impazzisce)
*   **Il Sintomo:** L'utente inserisce le credenziali su FortiClient e si ferma al 10% o 40% con errore di login.
*   **Il Comando di Debug:**
    ```text
    diagnose debug application fnbamd -1
    diagnose debug enable
    ```
    *(fnbamd è il demone che gestisce le autenticazioni in FortiOS)*
*   **Cosa vedi nel log CLI:**
    Se l'utente usa l'Active Directory (LDAP):
    ```text
    [102] fnbamd_ldap_parse_response- Invalid credentials
    [874] fnbamd_auth_poll_ldap- Result: 1 (Authentication failed)
    ```
*   **La Soluzione:** Password sbagliata su Windows, oppure l'account AD è stato bloccato, oppure l'utente non fa parte del gruppo di sicurezza AD mappato sul FortiGate.

### Scenario H: SSL VPN "Access Denied" (L'Errore Sistemistico)
*   **Il Sintomo:** L'utente si autentica con successo (FortiClient arriva al 100%), riceve un indirizzo IP (es. `10.212.134.200`), ma non pinga nulla nella LAN.
*   **La Causa:** Il 90% delle volte, manca la Firewall Policy. Oppure è stata creata, ma lo User Group non è stato inserito correttamente nel campo `Source`.
*   **La Soluzione:** Controlla che esista una policy da `ssl.root` a `port_LAN`. Controlla i Forward Traffic Log del FortiGate filtrando per l'IP `10.212.134.200`: vedrai centinaia di pacchetti marcati come "Deny: Implicit Deny". Metti la regola e tutto funzionerà istantaneamente.

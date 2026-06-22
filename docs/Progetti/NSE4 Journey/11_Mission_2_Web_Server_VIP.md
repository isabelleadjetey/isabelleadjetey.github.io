# Missione 2: Pubblicare un Web Server (Destination NAT)

## Lo Scenario Aziendale
L'azienda ha deciso di lanciare un nuovo sito web e ti ha chiesto di renderlo accessibile da Internet. Il server web si trova nella tua rete interna (è la tua macchina **Lubuntu**).
Devi configurare il FortiGate per permettere ai clienti esterni di raggiungere il sito, proteggendolo contemporaneamente dagli attacchi degli hacker.

## I tuoi Task da completare sul FortiGate:

### 1. Creare l'oggetto Virtual IP (Destination NAT)
Devi creare una regola di Port Forwarding (chiamata VIP in FortiOS) per "tradurre" un IP pubblico verso l'IP privato del server.
*   Vai su **Policy & Objects > Virtual IPs** e crea un nuovo VIP.
*   **Name:** `VIP_WebServer_Lubuntu`
*   **Interface:** `port1` (la porta WAN esposta a Internet).
*   **External IP Address:** Scegli un IP libero della tua rete di casa (es. `192.168.1.150`). **Attenzione:** non usare l'IP con cui accedi al FortiGate!
*   **Mapped IP Address:** Inserisci l'IP del tuo server Lubuntu (es. `10.0.0.2`).
*   **Port Forwarding:** Abilitalo. Imposta *External Service Port* a `80` e *Map to Port* a `80`.

### 2. Sicurezza (Security Profiles - IPS)
Dato che stiamo aprendo una porta verso l'esterno, dobbiamo proteggere il server dagli attacchi informatici.
*   Vai su **Security Profiles > Intrusion Prevention** (IPS).
*   Guarda il profilo `default`. Di base blocca già le vulnerabilità critiche (Critical e High). Per questa missione, va benissimo usare il profilo di default.

### 3. Inbound Firewall Policy
Questa è la regola più critica. Devi permettere al traffico di "entrare" (da WAN a LAN).
*   Crea una nuova policy: da `port1` (WAN) verso `port2` (LAN).
*   **Source:** `all` (tutto il mondo può visitare il sito).
*   **Destination:** Qui **DEVI** selezionare l'oggetto VIP appena creato (`VIP_WebServer_Lubuntu`). Non inserire un indirizzo normale!
*   **Service:** `HTTP`
*   **NAT:** **L'interruttore NAT deve essere SPENTO**. (Ripasso NSE4: Il destination NAT lo fa già l'oggetto VIP, se accendi il NAT qui "nasconderesti" l'IP del cliente e il tuo server vedrebbe tutto il traffico arrivare dal FortiGate!).
*   **Security Profiles:** Accendi l'**IPS** e seleziona il profilo `default`.
*   **Logging:** `All Sessions`.

## L'Obiettivo Finale (Il Test)

**Fase A: Accendere il Server**
1. Vai sulla VM Lubuntu e apri il terminale.
2. Digita: `sudo python3 -m http.server 80` (inserisci la password se richiesta). Il terminale rimarrà in ascolto.

**Fase B: Il Test dal Cliente Esterno**
1. Riduci a icona VMware.
2. Apri il browser dal tuo **PC fisico Windows** (che simula un cliente su Internet).
3. Digita nella barra degli indirizzi l'External IP che hai inventato nel Task 1: `http://192.168.1.150` (o quello che hai scelto).
4. **Obiettivo:** Devi vedere una pagina bianca con l'elenco delle cartelle di Lubuntu. Se la vedi, hai appena pubblicato con successo un server protetto da IPS!

# NSE 4: I 4 Pilastri Finali (High-Yield Cheat Sheet)

Questo documento condensa gli ultimi 4 argomenti avanzati dell'esame NSE 4. È progettato per darti esattamente i concetti chiave ("High-Yield") su cui vertono le domande dell'esame.

---

## 1. IPsec VPN (Virtual Private Network)
All'esame, devi sapere perfettamente cosa succede dietro le quinte quando configuri un tunnel Site-to-Site.

### Le Due Fasi
*   **Fase 1 (IKE - Internet Key Exchange):** È il "citofono". I due FortiGate si presentano, si autenticano (es. tramite *Pre-Shared Key*) e negoziano un canale sicuro primario. Se la Fase 1 fallisce (es. PSK errata), il tunnel non parte nemmeno.
*   **Fase 2 (IPsec):** È la "porta blindata". Una volta che il citofono ha confermato chi sei, la Fase 2 negozia come verrà crittografato il traffico vero e proprio (i dati degli utenti).

### Main Mode vs Aggressive Mode (Fase 1)
*   **Main Mode (Lenta ma sicura):** Usa 6 pacchetti per negoziare. L'identità dei firewall viene nascosta (crittografata). Richiede che entrambi abbiano un IP Pubblico statico.
*   **Aggressive Mode (Veloce ma rischiosa):** Usa solo 3 pacchetti. L'identità viene inviata *in chiaro*. Si usa quando una delle due sedi ha un IP dinamico (es. connessione casalinga o 4G).

### NAT-Traversal (NAT-T)
Se tra i due FortiGate c'è un altro router in mezzo che fa NAT (es. il modem del provider di casa tua), il protocollo IPsec (che usa ESP, protocollo 50) si rompe. Il **NAT-T** risolve il problema infilando i pacchetti ESP dentro dei normali pacchetti **UDP porta 4500**, che riescono ad attraversare il NAT senza problemi.

---

## 2. SD-WAN & Routing Avanzato
La SD-WAN è ormai il cuore delle reti moderne e Fortinet spinge tantissimo su questo all'esame.

### I Tre Componenti dell'SD-WAN
1.  **SD-WAN Zone & Members:** Raggruppi le tue connessioni Internet (es. `port1` Fibra e `port2` 4G) in un'unica interfaccia virtuale (la zona SD-WAN).
2.  **Performance SLA:** I "sensori". Il FortiGate pinga continuamente un server (es. 8.8.8.8) su entrambe le linee per misurare Latenza, Jitter e Packet Loss. *Attenzione: la SLA da sola non sposta il traffico!*
3.  **SD-WAN Rules:** Il "cervello". Crei una regola che dice: *"Per il traffico verso Microsoft 365, usa la linea che in base alla SLA ha la latenza minore"*. Se non ci sono regole, si applica la *Implicit Rule* (bilanciamento classico).

### PBR (Policy-Based Routing)
Il routing normale guarda solo la *Destinazione*. Il PBR ti permette di fare routing basandoti su Sorgente, Destinazione o Protocollo. **Il PBR ha la precedenza assoluta** sulla tabella di routing statica.

---

## 3. Autenticazione Utenti (FSSO)
Fortinet Single Sign-On (FSSO) permette al FortiGate di sapere quale utente (Mario Rossi) sta usando quale IP (10.0.0.50) senza chiedergli la password, leggendo le informazioni dal dominio Windows (Active Directory).

### L'Architettura FSSO
*   **DC Agent:** Un piccolo programma installato sui Domain Controller Windows. Legge i log di login e li passa al Collector.
*   **Collector Agent:** Un server centrale che raccoglie i dati dai DC Agent e li invia al FortiGate.
*   **Se un utente non viene riconosciuto:** Solitamente il problema è tra il Collector Agent e il FortiGate, oppure il PC dell'utente non fa parte del dominio.

---

## 4. High Availability (HA) & VDOMs

### High Availability (HA)
Due FortiGate fisici identici uniti per tolleranza ai guasti. Il cluster può essere configurato in due modalità normali:
*   **Active-Passive (Modalità di lavoro):** Il Master gestisce tutto il traffico. Lo Slave sta fermo in attesa e copia costantemente la configurazione e le sessioni (tramite l'interfaccia dedicata *Heartbeat*). Se il Master si rompe, lo Slave prende il suo posto (assumendo i suoi MAC Address) in millisecondi.
*   **Active-Active (Modalità di lavoro):** Entrambi i firewall processano il traffico per bilanciare il carico, ma uno dei due agisce comunque da "direttore d'orchestra".

**Cosa può andare storto:**
*   **Lo Split-Brain (Stato di Errore/Guasto):** Attenzione, lo Split-Brain NON è una modalità operativa (non si sceglie di attivarlo), ma un **guasto catastrofico**. Avviene quando si rompe fisicamente il cavo *Heartbeat* che unisce i due FortiGate. Lo Slave smette di sentire il Master, crede che sia morto e si auto-promuove a Master. Poiché il Master originale in realtà è ancora acceso e funzionante, ora hai due apparati sulla stessa rete convinti di essere il "Capo", che usano gli stessi indirizzi IP e MAC. Questo genera conflitti enormi bloccando tutta la rete.
    *   **Come si previene:** La best practice (e risposta da esame) è configurare **sempre almeno 2 cavi fisici** dedicati all'Heartbeat (es. porta HA1 e HA2). Se se ne rompe uno, il cluster sopravvive grazie al secondo.
    *   **Come si rimedia durante l'emergenza:** Se sei in pieno split-brain e la rete aziendale è ferma, l'azione più rapida è "staccare la spina" (o spegnere) fisicamente il FortiGate secondario. Questo elimina immediatamente il "doppio Capo" e fa ripartire la rete. Dopodiché, con calma, si sostituisce il cavo Heartbeat rotto e si riaccende il secondario.

### VDOMs (Virtual Domains)
Permettono di "frazionare" un singolo FortiGate fisico in tanti firewall virtuali indipendenti (es. VDOM "Amministrazione" e VDOM "Ospiti"). Ogni VDOM ha le sue policy, la sua tabella di routing e non comunica con gli altri (a meno che tu non crei dei *VDOM link*).
Esiste sempre un **Root VDOM** (quello di default) e, se abilitato, un **Management VDOM** (dedicato solo alla gestione amministrativa dell'apparato).

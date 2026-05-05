# Recap CCNA: CDP e LLDP (Protocolli di Scoperta)

*🎯 **Obiettivo:** Riconoscere le differenze tra CDP e LLDP, saperli configurare e comprendere come mappare una rete sconosciuta tramite i "neighbors".*

Nello SNOC, i protocolli di scoperta di livello 2 sono i tuoi occhi. Ti permettono di "vedere" cosa c'è dall'altra parte del cavo senza avere una mappa di rete aggiornata.

---

## 1. CDP (Cisco Discovery Protocol)
È il protocollo storico di casa Cisco.
*   **Standard:** Proprietario Cisco (non funziona con apparati HP, Juniper, ecc.).
*   **Stato di Default:** **ATTIVO** globalmente e su tutte le interfacce di default sui dispositivi Cisco.
*   **Timers per l'esame:**
    *   **Hello Timer (Update):** Invia messaggi ogni **60 secondi**.
    *   **Hold-time:** Conserva le info del vicino per **180 secondi**. Se non riceve un nuovo Hello entro 180s, il vicino viene rimosso dalla tabella.

### Comandi CDP
*   **Globale (su tutto il router):**
    *   `R1(config)# cdp run` (Per accenderlo)
    *   `R1(config)# no cdp run` (Per spegnerlo ovunque)
*   **Interfaccia (su una singola porta):**
    *   `R1(config-if)# cdp enable` (Acceso)
    *   `R1(config-if)# no cdp enable` (Spento)

---

## 2. LLDP (Link Layer Discovery Protocol)
È la risposta del mondo open standard al CDP.
*   **Standard:** IEEE 802.1AB (Vendor-neutral, funziona su quasi tutto, perfino server Windows/Linux o telefoni IP di altre marche).
*   **Stato di Default:** Sui dispositivi Cisco, spesso è **DISATTIVATO** di default a livello globale (dipende dalla versione di IOS).
*   **Timers per l'esame:**
    *   **Hello Timer (Update):** Invia messaggi ogni **30 secondi**.
    *   **Hold-time:** Conserva le info per **120 secondi**.

### Comandi LLDP
A differenza di CDP, LLDP ti permette di essere selettivo su un'interfaccia (puoi decidere di ascoltare e basta).
*   **Globale:**
    *   `R1(config)# lldp run` (Accende LLDP sul router)
*   **Interfaccia:**
    *   `R1(config-if)# lldp transmit` (Il router invia le sue info fuori da questa porta)
    *   `R1(config-if)# lldp receive` (Il router accetta le info LLDP in entrata su questa porta)

---

## 3. Comandi di Verifica e Troubleshooting (Fondamentali)
Questi comandi sono il pane quotidiano del Network Engineer:

1.  **`show cdp neighbors`** (o `show lldp neighbors`)
    Ti restituisce una tabella compatta che mostra:
    *   **Device ID:** Il nome host del vicino.
    *   **Local Intrfce:** La TUA porta a cui è collegato il cavo.
    *   **Port ID:** La SUA porta dall'altra parte del cavo.
    *   **Platform:** Il modello hardware del vicino (es. C2960).

2.  **`show cdp neighbors detail`** (o `show cdp entry *`)
    È il comando più importante perché, a differenza del precedente, ti mostra l'**Indirizzo IP (Management IP)** del dispositivo vicino, oltre alla versione esatta dell'IOS che sta usando.

---

## 4. 🚨 Sicurezza: L'altra faccia della medaglia
*   **Il problema:** CDP e LLDP inviano pacchetti multicasting **in chiaro** (senza alcuna crittografia).
*   **Il rischio:** Se lasci CDP attivo su una porta attaccata a un PC o rivolta verso Internet, un utente malintenzionato o un malware può usare Wireshark per "sniffare" la rete e scoprire l'IP del tuo router, il modello esatto e la versione di IOS (per poi cercare vulnerabilità specifiche di quella versione).
*   **Best Practice CCNA:** Spegni sempre CDP/LLDP (`no cdp enable` / `no lldp transmit`) sulle "Edge Ports", ovvero le porte collegate agli Endpoints o a reti non sicure. Mantienili attivi solo sui link tra Switch-e-Switch o Switch-e-Router.

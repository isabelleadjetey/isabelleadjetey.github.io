# 📘 CCNA Knowledge Base: QoS (Quality of Service) Fundamentals

*🎯 **Obiettivo:** Comprendere come i router danno priorità al traffico importante (come la voce) rispetto al traffico meno critico (come i download).*

Nello SNOC, il QoS è l'indiziato numero uno quando un cliente apre un ticket per "voce a scatti" (jitter) o "latenza elevata" sul VoIP. Il CCNA non richiede configurazioni complesse, ma pretende una solida conoscenza dei meccanismi sottostanti.

---

## 1. Classification & Marking (Chi sei e quanto vali?)
Il router prima identifica il traffico (Classification) e poi gli assegna un "colore" o un "tag" di priorità (Marking) in modo che i router successivi sappiano come trattarlo.

*   **Layer 2 Marking (Ethernet/VLAN):** Usa il campo **CoS (Class of Service)** (valori da 0 a 7).
*   **Layer 3 Marking (IP):** Usa il campo **DSCP (Differentiated Services Code Point)** (valori da 0 a 63).
*   **🚨 REGOLA D'ORO PER L'ESAME:** Il traffico Voce (VoIP) viene sempre marcato con DSCP **EF (Expedited Forwarding)**, che corrisponde al valore numerico **46**.

## 2. Trust Boundary (Di chi mi fido?)
È il confine dove la rete aziendale decide se fidarsi del Marking applicato da un dispositivo.
*   *Esempio:* Mi fido se un Telefono IP marca un pacchetto come "Alta Priorità". **Non mi fido** se lo fa un PC (l'utente potrebbe barare per scaricare torrent più velocemente). La Trust Boundary è solitamente configurata sulla porta dello switch collegata al telefono.

## 3. Queuing & Congestion Management (Le Code VIP)
Quando l'interfaccia di uscita è congestionata, i pacchetti finiscono in coda.
*   **CBWFQ (Class-Based Weighted Fair Queuing):** Assegna una percentuale di banda garantita a diverse classi di traffico.
*   **LLQ (Low Latency Queuing):** È la "corsia preferenziale" (Strict Priority Queue). Il traffico in questa coda scavalca tutti gli altri e viene inviato per primo. **Viene usata sempre per il traffico Voce** perché non tollera ritardi.

## 4. Policing vs Shaping (Come limitare il traffico)
Servono a limitare la banda consumata (Traffic Conditioning).
*   **Policing:** Taglia (droppa) i pacchetti che superano il limite. Provoca perdita di dati (packet loss).
*   **Shaping:** Mette in un buffer (rallenta) i pacchetti che superano il limite. Provoca ritardo (latenza) ma previene la perdita di pacchetti.

---

### 💡 SNOC Pro-Tip
Se il cliente lamenta che la voce "scatta" solo quando l'ufficio è pieno, il problema non è la linea "guasta", ma probabilmente la coda LLQ non sta funzionando: i pacchetti VoIP stanno facendo la fila insieme ai download di Windows Update!


---

### 🎯 Cheat Sheet per l'Esame

- **VoIP:** DSCP EF (46) / CoS 5.
- **LLQ:** Coda con priorit assoluta (per voce).
- **Policing vs Shaping:** Policing taglia (drop), Shaping rallenta (buffer).

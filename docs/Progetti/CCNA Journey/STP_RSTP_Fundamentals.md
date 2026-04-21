# Recap CCNA: STP e RSTP (Loop Prevention)

*📚 **Riferimento di Studio:** [Jeremy's IT Lab (Day 20-22)](https://www.youtube.com/playlist?list=PLQQoNK6GeB_YfshLIX7YjEq946_S7xT03)*

Lo **Spanning Tree Protocol (STP)** è l'eroe silenzioso dello switching. Senza di lui, un solo errore di cablaggio (un loop tra switch) farebbe "esplodere" la rete in pochi secondi a causa dei Broadcast Storm.

---

## 1. L'Analogia: Il "Vigile del Ponte"
Immagina due switch collegati tra loro con due cavi per sicurezza (ridondanza). Senza STP, i pacchetti girerebbero all'infinito tra i due cavi come in una giostra impazzita.
*   **STP = Il Vigile:** Decide che uno dei due cavi deve essere **bloccato** preventivamente.
*   **Il Ruolo:** Se il cavo principale si rompe, il vigile "sblocca" istantaneamente il secondo cavo per far passare il traffico. La rete è salva.

---

## 2. Il Concetto: L'Elezione del Root Bridge
Tutti gli switch della rete devono mettersi d'accordo su chi è il "Capo" (il **Root Bridge**).
*   **Chi vince?** Lo switch con il **Bridge ID** più basso.
*   **Bridge ID = Priority + MAC Address.** 
    *   Di default la priorità è `32768`. 
    *   Se le priorità sono uguali, vince chi ha il MAC Address più basso (lo switch più vecchio!).

---

## 3. Ruoli delle Porte
Una volta eletto il Capo, le porte si dividono i compiti:
1.  **Root Port (RP):** La porta "migliore" (più vicina) per arrivare al Capo. Ogni switch non-Root ne ha esattamente **una**.
2.  **Designated Port (DP):** Una porta che può inviare traffico sul segmento. Tutte le porte del Root Bridge sono DP.
3.  **Blocking/Alternate Port:** La porta che viene spenta logicamente per evitare il loop.

---

## 4. La Ricetta: Configurazione e Sicurezza (SNOC Ready)

### Forzare il Root Bridge
Non lasciare mai che il Root Bridge venga scelto dal caso. Forza lo switch più potente del centro stella a diventare il capo.
```text
spanning-tree vlan 1 priority 4096  <-- (Usa multipli di 4096)
```

### PortFast e BPDU Guard (Protezione delle porte "Access")
Sulle porte dove ci sono i PC (non switch!), dobbiamo evitare che l'STP perda tempo a pensare (30-50 secondi) prima di far navigare l'utente.
```text
interface FastEthernet 0/1
 spanning-tree portfast      <-- Fa saltare la porta subito in "Forwarding"
 spanning-tree bpduguard enable  <-- Se qualcuno attacca uno switch abusivo qui, la porta si spegne subito (Error-Disable) per sicurezza.
```

---

## 5. Evoluzione: Da STP a RSTP
Il vecchio STP è troppo lento (30-50 secondi per riprendersi da un guasto). Il **Rapid STP (802.1w)** riduce questo tempo a pochi secondi.
```text
spanning-tree mode rapid-pvst  <-- (Comando standard da usare sempre nei lab moderni)
```

---

## 6. I Ferri del Mestiere (Troubleshooting)
1.  **`show spanning-tree`**: Il comando magico. Ti dice chi è il Root Bridge e qual è lo stato di ogni porta (`FWD` per Forwarding, `BLK` per Blocking).
2.  **`show spanning-tree summary`**: Per vedere velocemente se PortFast o BPDU Guard sono attivi.

---

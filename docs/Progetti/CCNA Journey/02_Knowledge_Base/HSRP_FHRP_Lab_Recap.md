# Recap: FHRP e HSRP (Lab Pratico)

Questo documento riassume i concetti chiave e i passaggi pratici affrontati durante il laboratorio su **FHRP (First Hop Redundancy Protocol)**, con focus specifico su **HSRP (Hot Standby Router Protocol)**.

---

## 1. I Concetti Chiave (Teoria CCNA)

*   **Il Problema (Single Point of Failure):** Se una rete locale (LAN) ha un solo router fisico configurato come Default Gateway (es. `10.0.1.253`), un eventuale guasto a quel router lascerebbe tutti i PC senza connessione.
*   **La Soluzione FHRP:** Raggruppare più physical router per creare un unico **Router Virtuale**.
*   **HSRP vs Altri Protocolli:**
    *   **HSRP (Hot Standby Router Protocol):** Proprietario Cisco. Usa 1 router Active (il capo) e 1 Standby (il vice).
    *   **VRRP (Virtual Router Redundancy Protocol):** Standard Open (IEEE). Simile ad HSRP ma usabile su brand misti. Usa 1 Master e i restanti come Backup.
    *   **GLBP (Gateway Load Balancing Protocol):** Proprietario Cisco. A differenza di HSRP, distribuisce attivamente il carico su più router contemporaneamente (Load Balancing).

### Le Regole di HSRP
*   **Virtual IP (VIP):** L'indirizzo fittizio che tutti i PC useranno come Default Gateway (es. `10.0.1.254`).
*   **Virtual MAC:** Per la v2 è formato da `0000.0C9F.Fxxx` (dove `xxx` è il gruppo in esadecimale).
*   **Priority:** Decide chi fa il capo. Il default è `100`. Il router con priorità più alta vince l'elezione.
*   **Preemption:** Di default, se un router "Active" si guasta e poi torna online, **NON** si riprende il ruolo di capo (rimane in panchina in ascolto). Per forzarlo a riprendersi il posto, **deve** avere configurato il comando `standby 1 preempt`.

---

## 2. Il Laboratorio Svolto

**Scenario:** Una topologia con due router (R1 e R2) connessi alla medesima LAN dei PC (`10.0.1.0/24`) tramite l'interfaccia `G0/0`.
**Obiettivo:** Creare il Gateway Virtuale `10.0.1.254`.

### Configurazione su R1 (Router Active / Principale)
```text
interface GigabitEthernet0/0
 standby version 2
 standby 1 ip 10.0.1.254
 standby 1 priority 110    <-- Priorità alzata per vincere
 standby 1 preempt         <-- Permette la ripresa forzata del ruolo
```

### Configurazione su R2 (Router Standby / Riserva)
```text
interface GigabitEthernet0/0
 standby version 2
 standby 1 ip 10.0.1.254
 standby 1 priority 90     <-- Priorità abbassata
 standby 1 preempt
```

---

## 3. Risoluzione Problemi (Troubleshooting e Insidie dell'esame)

Durante il lab abbiamo incontrato degli ostacoli utilissimi per capire come ragiona il router nello scenario reale:

1.  **L'errore `%IP-4-DUPADDR` (Duplicate Address):**
    Una pioggia di errori di log indicava che l'interfaccia stava entrando in conflitto per l'uso dell'IP virtuale.
    *   **La Causa:** Inizialmente la configurazione HSRP era stata messa per errore sull'interfaccia *sbagliata* (quella verso l'esterno - WAN), invece che su quella collegata agli switch (LAN). Questo causava gravi bug di routing perché l'HSRP virtuale era estraneo a quella rete di classe /30.
    *   **Il Split-Brain (Comune in Packet Tracer):** Talvolta, a dispetto di una corretta configurazione, le porte degli switch in PT tardano ad attivarsi. I due router, non riuscendo a comunicare (non sentono gli "Hello"), si auto-eleggono "Active" entrambi contemporaneamente, litigando sull'IP. Riavviare le interfacce o accelerare il tempo in PT ripristina le elezioni.

2.  **La tabella ARP sui PC:**
    Abbiamo visto che la tabella (`arp -a`) del PC *non* mostra il gateway virtuale magico in modo automatico. Il PC aggiornerà segretamente la sua tabella ARP e memorizzerà l'indirizzo MAC di HSRP *solo nel momento in cui sarà forzato a generare un pacchetto verso l'esterno* (ad esempio eseguendo `ping 8.8.8.8`).

3.  **Visualizzare lo stato magico:**
    Il comando definitivo per controllare se preemption, priorità e IP virtuali stanno funzionando correttamente è `show standby brief` lanciato direttamente sul terminale del router.

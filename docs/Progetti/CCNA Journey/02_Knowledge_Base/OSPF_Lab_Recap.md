# Recap Lab CCNA: OSPF (Open Shortest Path First)

*📄 **File Esercizio Originale:** [20-1 OSPF Configuration Lab Exercise.pdf](file:///C:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/20-1%20OSPF%20Configuration%20Lab%20Exercise.pdf)*

Questo documento riassume i concetti e la configurazione di **OSPF**, il protocollo di routing Link-State più diffuso al mondo, essenziale per far comunicare i router all'interno di una grande infrastruttura aziendale.

---

## 1. Il Concetto: Link-State ("La Mappa Digitale")
A differenza dei protocolli Distance Vector (come il vecchio RIP) che si scambiano solo "voci di corridoio", OSPF costruisce una vera e propria **mappa dettagliata della città** (la LSDB - Link State Database).
Ogni router conosce l'intera topologia: sa esattamente dove sono gli altri router e quali strade (link) sono attive. Usando l'algoritmo di Dijkstra (SPF), calcola poi il percorso matematicamente più veloce per ogni destinazione.

---

## 2. L'Analogia: OSPF = "Il Vigile Urbano"
Come visto negli appunti di mentorship, OSPF è il re del traffico **Interno**:
*   **Conosce ogni via:** Sa tutto quello che succede dentro i confini dell'azienda (Area).
*   **È velocissimo:** Se una strada si chiude (link down), il vigile soffia nel fischietto e tutti i router scelgono istantaneamente la via alternativa (Convergenza).
*   **Ignora l'esterno:** Non sa nulla di cosa succeda su Internet (BGP) finché non gli viene data una rotta di default.

---

## 3. La Ricetta: Configurazione Standard
Per attivare OSPF, devi "accendere il motore" e poi dire al router quali strade deve sorvegliare.

### Step 1: Accensione e Router ID
Il **Router-ID** è la carta d'identità del router. Se non lo metti tu, lui sceglie l'IP più alto che trova, ma per evitare confusione nel troubleshooting è meglio fissarlo a mano.
```text
router ospf 1
 router-id 1.1.1.1
```

### Step 2: Annunciare le Reti (Wildcard Mask)
OSPF usa le **Wildcard Mask**, che sono l'esatto opposto della Subnet Mask (quello che è 255 diventa 0, quello che è 0 diventa 255).
*   Esempio `/24` (`255.255.255.0`) diventa `0.0.0.255`.
*   Esempio `/30` (`255.255.255.252`) diventa `0.0.0.3`.

```text
! Sintassi: network [IP_RETE] [WILDCARD] area [ID]
network 10.0.1.0 0.0.0.255 area 0
network 192.168.10.0 0.0.0.3 area 0
```

---

## 4. Ottimizzazione: La "Passive Interface"
**Regola d'oro di sicurezza e performance:** Non mandare mai pacchetti OSPF (Hello) verso le porte dove ci sono i PC dei dipendenti. È inutile (i PC non sono router) ed è pericoloso (un utente malizioso potrebbe fingersi un router).
```text
router ospf 1
 passive-interface GigabitEthernet0/0  <-- (La porta verso i PC)
```

---

## 5. Le Elezioni: DR e BDR (Il Capo e il Vice)
Quando ci sono molti router collegati allo stesso switch, per evitare che tutti parlino con tutti creando il caos, OSPF elegge:
1.  **DR (Designated Router):** Il Capo. Tutti mandano gli aggiornamenti a lui, e lui li ridistribuisce agli altri.
2.  **BDR (Backup Designated Router):** Il Vice. Pronto a subentrare se il DR "muore".

*   **Chi vince?** Vince chi ha la **Priority** più alta (default 1). Se c'è parità, vince il **Router-ID** più alto.

---

## 6. I Ferri del Mestiere (Troubleshooting)
Se i router non si parlano, usa questi comandi per interrogare il "Vigile":

1.  **`show ip ospf neighbor`**: Il comando fondamentale. Se lo stato NON è `FULL`, c'è un problema (es. MTU diversa, Area sbagliata, Timer diversi).
2.  **`show ip protocols`**: Per vedere velocemente il Router-ID e quali reti stai annunciando.
3.  **`show ip route ospf`**: Per vedere solo le rotte imparate grazie al vigile (marcate con la lettera **O**).
4.  **`show ip ospf interface`**: Per capire se una porta è stata messa per sbaglio in `passive` o chi è il DR/BDR di quel segmento.

---

## 7. OSPF Multi-Area: Oltre il confine dell'Area 0
Come affrontato nel laboratorio Packet Tracer 20-1, quando la rete cresce eccessivamente, un'unica Area 0 può diventare "pesante" per la CPU dei router.

### I Ruoli Gerarchici
*   **Backbone Area (Area 0):** Il cuore pulsante. Tutte le altre aree devono essere collegate fisicamente ad essa.
*   **Area Border Router (ABR):** Il router "con i piedi in due scarpe". È il router che ha un'interfaccia in Area 0 e un'altra interfaccia in un'area diversa (es. Area 10). La sua CPU lavora sodo perché deve tenere aggiornate le mappe di entrambe le zone.

### La Ricetta Multi-Area
Configurare il Multi-Area è semplicissimo: basta cambiare l'ID dell'area nel comando `network`.
```text
router ospf 1
 ! Questa interfaccia va verso il cuore della rete
 network 10.0.0.0 0.0.0.3 area 0
 
 ! Questa interfaccia va verso l'ufficio distaccato (Area 10)
 network 192.168.10.0 0.0.0.255 area 10
```

### Perché lo facciamo?
Nello SNOC vedrai il Multi-Area per **isolare i problemi**: se c'è un malfunzionamento (flap) in Area 10, i router in Area 0 non dovranno ricalcolare tutta la loro mappa, ma riceveranno solo un "riassunto" dall'ABR. Questo mantiene la rete stabile e veloce.

---

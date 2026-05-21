# Dominio 1: Cloud Concepts (24%)

> Il dominio delle fondamenta. Senza capire *perché* esiste il cloud e *come* è strutturato, tutto il resto non ha senso.

---

## 1. Cos'è il Cloud Computing?

Il cloud computing è la **fornitura on-demand di risorse IT** (server, storage, database, rete, software) tramite Internet, con un modello di pagamento basato sul consumo effettivo.

Prima del cloud, un'azienda che voleva un server doveva:
1. Comprarlo (costo upfront elevato)
2. Installarlo fisicamente in un datacenter
3. Mantenerlo per anni anche se non lo usava al 100%
4. Aggiornarlo o buttarlo quando diventava obsoleto

Con AWS: accendi un server in 30 secondi, lo usi per 2 ore, lo spegni e paghi solo quelle 2 ore.

---

## 2. I 6 Vantaggi del Cloud (Framework AWS)

Questi 6 vantaggi sono **testati direttamente** all'esame:

### 1. Trade Fixed Expense for Variable Expense (CapEx → OpEx)
- **CapEx** (Capital Expenditure): compri l'hardware prima di usarlo — rischio finanziario
- **OpEx** (Operational Expenditure): paghi solo ciò che consumi — nessun investimento iniziale
- Esempio: invece di comprare 10 server per gestire il picco di Natale, li "affitti" solo durante le festività

### 2. Benefit from Massive Economies of Scale
AWS compra hardware in quantità enormi da tutti i produttori del mondo → costi unitari bassissimi → risparmio trasferito ai clienti. Nessuna azienda singola può acquistare a quei prezzi.

### 3. Stop Guessing Capacity
On-premises: se acquisti troppi server → spreco. Troppo pochi → sistema sovraccarico. Con AWS: scala in tempo reale, non devi mai "indovinare" in anticipo.

### 4. Increase Speed and Agility
Lanciare un server fisico: settimane (acquisto, consegna, installazione). Su AWS: **minuti**. Time-to-market drasticamente ridotto.

### 5. Stop Spending Money on Data Centers
Elimini costi di: affitto spazio, raffreddamento, sicurezza fisica, elettricità, manutenzione hardware.

### 6. Go Global in Minutes
AWS ha Region in tutto il mondo. Puoi distribuire la tua applicazione in Europa, USA e Asia in pochi click, con latenza minima per gli utenti globali.

---

## 3. CapEx vs OpEx — Il Concetto Chiave

| | CapEx | OpEx |
|---|---|---|
| **Cosa è** | Spesa in conto capitale (acquisto asset) | Spesa operativa (consumo servizi) |
| **Quando si paga** | Prima di usare la risorsa | Dopo aver usato la risorsa |
| **Esempio cloud** | Comprare server fisici | Pagare istanze EC2 a ore |
| **Vantaggio** | Asset di proprietà | Flessibilità, nessun rischio upfront |
| **Svantaggio** | Rischio di over/under-provisioning | Costi variabili (difficile prevedere) |

---

## 4. Concetti di Scalabilità e Resilienza

### Scalability (Scalabilità)
Capacità di un sistema di crescere per gestire carichi maggiori.
- **Vertical Scaling (Scale Up):** aumenti la potenza di un singolo server (più CPU, più RAM). Ha un limite fisico.
- **Horizontal Scaling (Scale Out):** aggiungi più server identici in parallelo. Teoricamente illimitato.

### Elasticity (Elasticità)
Come la scalabilità, ma **bidirezionale e automatica**: il sistema cresce sotto carico e si riduce automaticamente quando il carico diminuisce.
- Servizio AWS: **Auto Scaling**
- Esempio: 10 istanze di notte, 100 a mezzogiorno (picco), 10 di nuovo la sera → risparmi pagando solo ciò che serve

### High Availability (Alta Disponibilità)
Il sistema è progettato per **minimizzare il downtime** — rimane accessibile anche durante manutenzioni o guasti parziali. Si ottiene distribuendo le risorse su più AZ.

### Fault Tolerance (Tolleranza ai Guasti)
Il sistema **continua a funzionare correttamente** anche quando uno o più componenti si guastano — nessuna interruzione visibile dall'utente. Più robusto della semplice High Availability.

### Durability (Durabilità)
I **dati non vengono persi** nel tempo. S3 garantisce 99.999999999% di durabilità ("11 nines") — statisticamente potresti perdere un oggetto ogni 10 milioni di anni.

---

## 5. Principi di Design del Cloud (Well-Architected Framework)

### Design for Failure
Progetta **assumendo che qualcosa si romperà**. Non chiedere "e se questo funziona sempre?" — chiediti "cosa succede quando questo si rompe?". Soluzione: distribuzione su più AZ, load balancer, backup automatici.

### Decoupling (Disaccoppiamento)
Componenti dell'applicazione che **non dipendono direttamente** l'uno dall'altro. Se un componente va down, gli altri continuano a funzionare. Servizi AWS: **SQS (code di messaggi)**, **SNS**.

### Implement Elasticity
Usa Auto Scaling per non pagare risorse inutilizzate.

### Think Parallel
Invece di un server potente, usa tanti server in parallelo — più resiliente e scalabile.

---

## 6. Modelli di Deployment (Distribuzione)

### Public Cloud
- Tutta l'infrastruttura è su AWS (o altro provider)
- Massima flessibilità e risparmio
- Adatto a: startup, applicazioni web, sviluppo

### Private Cloud
- Infrastruttura **dedicata** a una singola organizzazione
- Può essere on-premises o hosted da un provider dedicato
- Adatto a: **settore governativo, difesa, dati classificati, normative che vietano il cloud pubblico**

### Hybrid Cloud
- Combinazione di cloud pubblico (AWS) + infrastruttura privata (on-premises)
- Adatto a: aziende in migrazione graduale, dati sensibili che devono restare on-premises ma workload moderni su cloud

> ⚠️ **Trappola esame:** "normative che vietano il cloud pubblico" → **Private**. "Alcuni dati restano on-premises" → **Hybrid**.

---

## 7. Modelli di Servizio (IaaS / PaaS / SaaS)

| Modello | AWS gestisce | Cliente gestisce | Esempio AWS |
|---|---|---|---|
| **IaaS** | Hardware, rete, virtualizzazione | OS, runtime, app, dati | EC2 |
| **PaaS** | Hardware, OS, runtime, middleware | Applicazione e dati | Elastic Beanstalk |
| **SaaS** | Tutto | Solo l'uso dell'applicazione | Gmail, Salesforce |

**Regola pratica:**
- Vuoi **massimo controllo** → IaaS (EC2)
- Vuoi **concentrarti sul codice** → PaaS
- Vuoi **usare un'app pronta** → SaaS

---

## 8. Infrastruttura Globale AWS

### Region
Area geografica che contiene più AZ. Esempi: `eu-west-1` (Irlanda), `us-east-1` (Virginia), `eu-south-1` (Milano). Quando scegli una Region considera: latenza, costo, compliance normativa, disponibilità dei servizi.

### Availability Zone (AZ)
Uno o più datacenter fisicamente separati **all'interno di una Region**, connessi tra loro con fibra dedicata a bassissima latenza. Sono isolati fisicamente per evitare che un disastro (alluvione, incendio) colpisca più AZ insieme.

### Edge Location
Datacenter distribuiti globalmente (ce ne sono molti più delle Region) usati da **CloudFront** per servire contenuti statici (immagini, video, CSS) agli utenti con latenza minima. Non puoi eseguire EC2 nelle Edge Location.

```
Region (es. eu-west-1 = Irlanda)
├── AZ 1 (eu-west-1a) → datacenter fisici isolati
├── AZ 2 (eu-west-1b) → datacenter fisici isolati
└── AZ 3 (eu-west-1c) → datacenter fisici isolati

Edge Locations → distribuite globalmente per CloudFront/CDN
```

---

## 9. TCO — Total Cost of Ownership

Il **TCO** è il costo totale reale di possedere e gestire un'infrastruttura IT on-premises, includendo tutti i costi nascosti:

**Costi diretti:**
- Acquisto hardware (server, storage, rete)
- Licenze software

**Costi indiretti (spesso sottovalutati):**
- Spazio fisico nel datacenter
- Raffreddamento e consumo elettrico
- Personale IT per manutenzione
- Downtime e perdita di produttività
- Aggiornamenti e obsolescenza hardware

AWS elimina quasi tutti i costi indiretti → TCO significativamente inferiore rispetto all'on-premises.

---

## 🧠 Cheat Sheet — Domande Frequenti Esame

| Domanda tipo | Risposta |
|---|---|
| "Paghi solo ciò che usi" | **Pay-as-you-go / OpEx** |
| "Scala automaticamente su e giù" | **Elasticity / Auto Scaling** |
| "Sistema rimane up anche con guasti" | **Fault Tolerance** |
| "Dati mai persi su S3" | **Durability (11 nines)** |
| "Normative vietano cloud pubblico" | **Private Cloud** |
| "Dati sensibili on-premises + app su AWS" | **Hybrid Cloud** |
| "Sviluppatore si concentra solo sul codice" | **PaaS** |
| "Massimo controllo sull'OS" | **IaaS (EC2)** |
| "Contenuti serviti con bassa latenza globale" | **CloudFront + Edge Locations** |
| "Disponibilità anche se una zona ha problemi" | **Multi-AZ / High Availability** |

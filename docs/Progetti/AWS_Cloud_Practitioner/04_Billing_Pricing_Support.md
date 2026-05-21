# Dominio 4: Billing, Pricing & Support (12%)

> Il dominio più leggero dell'esame ma pieno di trappole. Devi conoscere esattamente i modelli di pricing e i piani di supporto.

---

## 1. Modelli di Pricing AWS

### Il Principio Fondamentale: Pay-as-you-go
AWS si basa su tre principi di pricing:
1. **Pay for what you use**: paghi solo le risorse che consumi
2. **Pay less when you reserve**: risparmi se ti impegni a lungo termine
3. **Pay less with more**: prezzi unitari scendono all'aumentare del volume

---

## 2. Modelli di Acquisto EC2

### On-Demand
- Paghi per **ora o per secondo** senza impegni
- Prezzo più alto ma massima flessibilità
- Quando usarlo: sviluppo, test, carichi imprevedibili

### Reserved Instances (RI)
- Impegno di **1 o 3 anni** su un tipo specifico di istanza
- Sconto fino al **72%** rispetto a On-Demand
- Tre modalità di pagamento: All Upfront (massimo sconto), Partial Upfront, No Upfront
- **Standard RI**: sconto massimo, meno flessibilità
- **Convertible RI**: sconto minore, puoi cambiare tipo di istanza

### Savings Plans
- Come Reserved ma più flessibile: ti impegni a spendere una certa cifra/ora (es. $10/h) per 1-3 anni
- Sconto fino al **72%**
- Si applica a EC2, Lambda e Fargate (non solo EC2 come le RI)

### Spot Instances
- Usi la **capacità inutilizzata** di AWS a prezzi bassissimi (fino al **90%** di sconto)
- AWS può **interromperle con 2 minuti di preavviso** quando serve la capacità
- Solo per workload interrompibili: batch processing, ML training, rendering

### Dedicated Hosts
- Server fisico **dedicato esclusivamente a te**
- Più costoso di tutto il resto
- Necessario per: compliance normativa, licenze software "per socket/core" (Windows Server, SQL Server)

### Dedicated Instances
- Istanze EC2 su hardware dedicato ma condiviso tra le tue istanze
- Meno costoso di Dedicated Hosts

---

## 3. Free Tier AWS

Tre tipi di offerte gratuite:
- **Always Free**: gratuito per sempre (es. Lambda: 1 milione di richieste/mese, DynamoDB: 25 GB)
- **12 Months Free**: gratuito per 12 mesi dalla creazione dell'account (es. EC2 t2.micro 750h/mese, S3 5 GB)
- **Trials**: periodo di prova gratuito per servizi specifici (es. Redshift: 2 mesi)

---

## 4. Strumenti di Gestione Costi

### AWS Pricing Calculator
Stima il **costo mensile** di un'architettura AWS prima di implementarla. Utile per confrontare On-Demand vs Reserved e per presentare preventivi ai clienti.

### AWS Cost Explorer
Visualizza e analizza i **costi storici** dell'account. Identifica trend, servizi più costosi, anomalie di spesa. Può fare previsioni sui costi futuri.

### AWS Budgets
Imposta **alert** quando i costi o l'utilizzo superano soglie definite. Esempio: "avvisami via email se la spesa mensile supera 100$". Può anche bloccare l'utilizzo automaticamente.

### AWS Cost and Usage Report (CUR)
Report dettagliato di tutti i costi e utilizzi dell'account. Il più granulare disponibile — usato per analisi avanzate e billing con clienti.

### AWS Trusted Advisor — Cost Optimization
Suggerisce risorse inutilizzate o sottoutilizzate che potresti eliminare o ridurre (es. istanze EC2 con CPU <5%, EBS non attachati, IP elastici non usati).

### Consolidated Billing (AWS Organizations)
Gestisci più account AWS in un'organizzazione con **un'unica fattura**. Vantaggio: i volumi di utilizzo di tutti gli account si sommano → prezzi unitari più bassi (economies of scale).

---

## 5. AWS Organizations

Gestisce **più account AWS** in una gerarchia:
- **Master Account (Management Account)**: gestisce la fatturazione e le policy
- **Organizational Units (OU)**: gruppi di account (es. OU-Produzione, OU-Sviluppo)
- **Service Control Policies (SCP)**: policy che limitano cosa possono fare gli account membri

**Vantaggi:**
- Consolidated billing (un'unica fattura)
- Sconti volume aggregati
- Governance centralizzata tramite SCP

---

## 6. Piani di Supporto AWS

Questo è **molto testato** all'esame. Devi conoscere le differenze tra i 5 piani:

| Piano | Costo | Tempo risposta caso critico | Accesso Technical Account Manager |
|---|---|---|---|
| **Basic** | Gratuito | — (no support casi) | ❌ |
| **Developer** | ~$29/mese | 12-24 ore (business hours) | ❌ |
| **Business** | ~$100/mese o 10% | **1 ora** | ❌ (solo Concierge) |
| **Enterprise On-Ramp** | ~$5500/mese | **30 minuti** | Pool di TAM |
| **Enterprise** | ~$15000/mese | **15 minuti** | TAM dedicato |

### Dettagli Chiave per l'Esame

**Basic (Gratuito):**
- Accesso a documentazione, whitepaper, forum
- 7 check Trusted Advisor (gratuiti)
- AWS Personal Health Dashboard
- Nessun supporto tecnico diretto via ticket

**Developer:**
- Supporto via email (business hours)
- 1 contatto primario
- Risposta entro 12-24 ore per casi generali

**Business:**
- Supporto 24/7 via telefono, chat e email
- Accesso completo a Trusted Advisor (tutti i check)
- AWS Support API
- Infrastructure Event Management (a pagamento extra)
- **Risposta entro 1 ora** per sistemi in produzione down

**Enterprise On-Ramp:**
- Come Business ma con pool di TAM (Technical Account Manager)
- **Risposta entro 30 minuti** per casi critici
- Accesso a Well-Architected Reviews

**Enterprise:**
- **TAM dedicato** (Technical Account Manager) — una persona di AWS assegnata a te
- **Risposta entro 15 minuti** per business-critical down
- Proactive guidance e architettura review
- Infrastructure Event Management incluso
- Concierge Support Team (billing e account)

---

## 7. Concetti Aggiuntivi di Billing

### AWS Marketplace
Store di soluzioni software di terze parti pronte per essere deployate su AWS. Il costo del software è incluso nella fattura AWS.

### AWS Cost Anomaly Detection
Usa ML per rilevare automaticamente picchi di spesa anomali e avvisarti prima che la bolletta esploda.

### Tagging delle Risorse
Aggiungi tag (etichette chiave-valore) alle risorse AWS per organizzare i costi per progetto, team o ambiente. Esempio: `Project: SNOC, Environment: Production`. Visibile in Cost Explorer per analisi granulare.

---

## 🧠 Cheat Sheet — Domande Frequenti Esame

| Scenario | Risposta |
|---|---|
| "Massima flessibilità, nessun impegno" | **On-Demand** |
| "Carico stabile 24/7 per 3 anni" | **Reserved Instances** |
| "Sconto elevato, workload interrompibile" | **Spot Instances** |
| "Server fisico dedicato per compliance" | **Dedicated Hosts** |
| "Stima costi prima di lanciare architettura" | **Pricing Calculator** |
| "Analisi costi storici e trend" | **Cost Explorer** |
| "Alert quando spendo troppo" | **AWS Budgets** |
| "Un'unica fattura per più account" | **Consolidated Billing / AWS Organizations** |
| "Risposta in 15 minuti, TAM dedicato" | **Enterprise Support** |
| "Risposta in 1 ora, 24/7" | **Business Support** |
| "Check gratuiti Trusted Advisor" | **Basic e Developer (7 check)** |
| "Tutti i check Trusted Advisor" | **Business, Enterprise On-Ramp, Enterprise** |
| "Software terze parti pronto su AWS" | **AWS Marketplace** |
| "Identificare risorse inutilizzate" | **Trusted Advisor — Cost Optimization** |

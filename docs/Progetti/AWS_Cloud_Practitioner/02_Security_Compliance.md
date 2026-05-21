# Dominio 2: Security & Compliance (30%)

> Il dominio più importante per chi lavora in un SNOC. Comprende IAM, il Shared Responsibility Model e tutti i principali servizi di sicurezza AWS.

---

## 1. Shared Responsibility Model — Il Concetto Fondamentale

Il modello di **responsabilità condivisa** definisce chi è responsabile di cosa in AWS. È la prima cosa che devi sapere sull'esame e nella vita reale.

```
┌─────────────────────────────────────────┐
│           RESPONSABILITÀ CLIENTE        │
│  Dati del cliente                       │
│  Configurazione applicazione            │
│  Gestione utenti e accessi (IAM)        │
│  Cifratura dei dati (in transito/riposo)│
│  Configurazione firewall (Security Grp) │
├─────────────────────────────────────────┤
│           RESPONSABILITÀ AWS            │
│  Hardware fisico dei datacenter         │
│  Rete globale AWS                       │
│  Hypervisor e virtualizzazione          │
│  Sicurezza fisica degli edifici         │
│  Aggiornamento dell'infrastruttura      │
└─────────────────────────────────────────┘
```

### La Regola Semplice
- **AWS è responsabile della sicurezza DEL cloud** (l'infrastruttura fisica)
- **Il Cliente è responsabile della sicurezza NEL cloud** (tutto ciò che ci mette dentro)

### Esempi Pratici
| Scenario | Responsabile |
|---|---|
| Server fisico di AWS si rompe | AWS |
| Dati del cliente non cifrati su S3 | Cliente |
| Aggiornamento dell'hypervisor | AWS |
| Password IAM debole di un utente | Cliente |
| Guasto all'alimentazione del datacenter | AWS |
| Porta di sicurezza aperta per errore su EC2 | Cliente |
| Patch del sistema operativo su EC2 | **Cliente** (su IaaS il cliente gestisce l'OS!) |
| Patch del sistema operativo su RDS | **AWS** (su servizi managed, AWS gestisce l'OS) |

> ⚠️ **Trappola esame:** su EC2 (IaaS), il cliente gestisce l'OS e le patch. Su RDS/Lambda/S3 (servizi managed), AWS gestisce l'OS — il cliente gestisce solo i dati e la configurazione del servizio.

---

## 2. IAM — Identity and Access Management

IAM è il servizio con cui controlli **chi può fare cosa** su AWS. È gratuito e globale (non legato a una Region).

### I 4 Componenti Principali

**Users (Utenti)**
Rappresentano una **persona o un'applicazione** specifica. Ogni utente ha credenziali proprie (password per la Console, Access Key per la CLI).
- Best practice: crea un utente IAM per ogni persona, **mai usare il root account** per le attività quotidiane.

**Groups (Gruppi)**
Collezioni di utenti. Assegni le policy al gruppo, non ai singoli utenti. Esempio: gruppo "Developers" con permessi di accesso a EC2 e S3.
- Un utente può appartenere a più gruppi.
- Un gruppo non può contenere altri gruppi.

**Roles (Ruoli)**
Identità temporanea che puoi "assumere". Usati principalmente per:
- Permettere a un servizio AWS (es. EC2) di accedere a un altro servizio (es. S3)
- Permettere a utenti di account AWS diversi di accedere alle tue risorse
- Non hanno credenziali permanenti — generano credenziali temporanee

**Policies (Policy)**
Documenti JSON che definiscono i permessi. Specificano: Effetto (Allow/Deny), Azione (es. s3:GetObject), Risorsa (es. arn:aws:s3:::mio-bucket).

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::mio-bucket/*"
}
```

### Principio del Minimo Privilegio
Assegna sempre il **minimo set di permessi necessari** per svolgere un compito. Non dare mai accesso admin a chi deve solo leggere dati da S3.

### MFA (Multi-Factor Authentication)
Aggiunge un secondo fattore di autenticazione oltre alla password. **Obbligatoria** per il root account e raccomandata per tutti gli utenti IAM con permessi elevati.

### Root Account
L'account creato quando ti iscrivi ad AWS. Ha accesso illimitato a tutto.
- **Non usarlo mai per le attività quotidiane**
- Abilita MFA sul root account immediatamente
- Usa solo per: chiudere l'account, modificare il piano di supporto, ripristinare accesso IAM perso

---

## 3. Servizi di Sicurezza AWS

### AWS WAF (Web Application Firewall)
Protegge le applicazioni web da attacchi comuni: SQL injection, XSS (Cross-Site Scripting), bot malevoli. Funziona a livello applicativo (L7). Si integra con CloudFront, ALB, API Gateway.

### AWS Shield
Protezione contro attacchi **DDoS** (Distributed Denial of Service).
- **Shield Standard:** gratuito, incluso automaticamente per tutti i clienti AWS. Protegge da attacchi DDoS comuni (L3/L4).
- **Shield Advanced:** a pagamento (~3000$/mese). Protezione avanzata, team di risposta DDoS dedicato, protezione finanziaria contro costi extra causati da attacchi.

### Amazon GuardDuty
Servizio di **rilevamento delle minacce** basato su ML. Analizza continuamente i log (CloudTrail, VPC Flow Logs, DNS) e rileva comportamenti anomali: accessi da IP sospetti, tentativi di esfiltrazione dati, utilizzo insolito dell'API.
- È **passivo** — rileva e avvisa, non blocca automaticamente

### Amazon Inspector
Analizza automaticamente le istanze EC2 e i container per trovare **vulnerabilità software e configurazioni errate**. Confronta con database CVE noti. Genera un report con le vulnerabilità trovate e la loro severità.

### AWS KMS (Key Management Service)
Crea e gestisce le **chiavi di cifratura** usate per proteggere i dati. Integrato con quasi tutti i servizi AWS (S3, EBS, RDS). Puoi cifrare i tuoi dati con chiavi che controlli tu.

### AWS Artifact
**Repository di documenti di compliance e sicurezza AWS**: certificazioni (ISO 27001, SOC 1/2/3, PCI DSS), report di audit, accordi legali (BAA per HIPAA). Utile quando devi dimostrare la conformità normativa ai tuoi clienti o enti regolatori.

### Amazon Macie
Usa ML per **scoprire e proteggere dati sensibili** (es. numeri di carte di credito, dati personali) su S3. Rileva automaticamente PII (Personally Identifiable Information) e ti avvisa.

### AWS Secrets Manager
Memorizza, gestisce e **ruota automaticamente le credenziali** (password database, API key) in modo sicuro. Elimina la necessità di hard-codare credenziali nel codice sorgente.

### AWS Cognito
Gestione dell'**autenticazione degli utenti finali** delle tue applicazioni (login con email/password, Google, Facebook). Non confondere con IAM — IAM gestisce gli utenti AWS, Cognito gestisce gli utenti delle tue app.

---

## 4. Compliance e Governance

### AWS Config
Monitora e registra le **configurazioni delle risorse AWS** nel tempo. Permette di verificare se le risorse rispettano le policy aziendali (es. "tutti gli S3 bucket devono essere privati"). Invia notifiche quando una configurazione non conforme viene rilevata.

### AWS CloudTrail
Registra tutte le **chiamate API** effettuate nell'account AWS — chi ha fatto cosa, quando e da dove. Essenziale per l'audit trail e l'analisi forense in caso di incidente di sicurezza. Attivato di default (90 giorni), configurabile per retention più lunga su S3.

### AWS Trusted Advisor
Analizza l'account AWS e fornisce **raccomandazioni** in 5 categorie: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Versione gratuita: 7 check di sicurezza base. Versione Business/Enterprise: tutti i check.

---

## ⚠️ 5. Approfondimenti — Punti Deboli Frequenti

### CloudTrail vs CloudWatch vs Config — La Confusione Classica

Questi tre servizi si occupano tutti di "monitoraggio" ma in modi completamente diversi:

| Servizio | Domanda a cui risponde | Cosa registra | Uso principale |
|---|---|---|---|
| **CloudTrail** | *"Chi ha fatto cosa sull'account AWS?"* | Chiamate API (azioni su risorse) | Audit trail, forensics, sicurezza |
| **CloudWatch** | *"Come sta performando la mia infrastruttura?"* | Metriche (CPU, RAM, latenza) e log applicativi | Monitoraggio operativo, allarmi |
| **AWS Config** | *"La mia infrastruttura è configurata correttamente?"* | Stato e storia delle configurazioni delle risorse | Compliance, governance, drift detection |

**Esempi pratici:**

*Scenario 1:* Un amministratore ha eliminato un S3 bucket per errore — come scopri chi è stato?
→ **CloudTrail** — registra la chiamata API `DeleteBucket` con utente, timestamp e IP

*Scenario 2:* La CPU di un'istanza EC2 è al 95% — come ricevi un alert?
→ **CloudWatch** — crei un allarme sulla metrica `CPUUtilization > 90%`

*Scenario 3:* Vuoi verificare che tutti gli S3 bucket abbiano la cifratura attiva — come lo automatizzi?
→ **AWS Config** — crei una Config Rule che verifica automaticamente la configurazione di ogni bucket

---

### IAM Roles — Approfondimento

I **Roles** sono l'aspetto più incompreso di IAM. La chiave è capire quando usarli al posto degli utenti.

**Perché i Role non hanno credenziali permanenti:**
Quando un'entità (utente o servizio) "assume" un Role, AWS genera credenziali temporanee (Access Key + Secret + Session Token) che scadono automaticamente. Nessun rischio di credenziali rubate e mai scadute.

**I 4 casi d'uso principali dei Role:**

**1. EC2 Instance Role (il più comune)**
Un'istanza EC2 che deve accedere a S3 o DynamoDB. Invece di mettere le credenziali hardcodate nel codice (pericolosissimo!), assegni un Role all'istanza → EC2 riceve credenziali temporanee automaticamente.
```
EC2 (con Instance Role) → accede a S3 senza credenziali hardcodate ✅
EC2 (con credenziali hardcodate nel codice) → rischio di sicurezza gravissimo ❌
```

**2. Cross-Account Access**
Utente dell'Account A deve accedere a risorse dell'Account B.
- Account B crea un Role con una Trust Policy che dice "mi fido dell'Account A"
- L'utente in Account A "assume" il Role → riceve accesso temporaneo alle risorse di Account B
- Non si crea un nuovo utente in Account B — tutto avviene tramite il Role

**3. AWS Service Role**
Servizi AWS che devono interagire tra loro. Es: Lambda che scrive su DynamoDB, CodePipeline che deploya su EC2. Il servizio assume un Role con i permessi necessari.

**4. Identity Federation (SSO)**
Utenti autenticati da un sistema esterno (Active Directory aziendale, Google, SAML) assumono temporaneamente un Role IAM per accedere ad AWS. Permette il Single Sign-On senza creare utenti IAM separati.

**Trust Policy vs Permission Policy:**
- **Permission Policy**: definisce COSA può fare il Role (es. accedere a S3)
- **Trust Policy**: definisce CHI può assumere il Role (es. il servizio EC2, o l'Account 123456789)

---

### Servizi di Compliance — Come Distinguerli

Confusi spesso: **Artifact**, **Config**, **Macie**, **Inspector**, **GuardDuty**

| Servizio | Focus | Risponde a |
|---|---|---|
| **Artifact** | Documentazione legale/certificazioni | "Abbiamo la certificazione PCI DSS?" |
| **Config** | Conformità delle configurazioni | "Tutti i bucket S3 sono privati?" |
| **Macie** | Dati sensibili (PII) su S3 | "Ci sono numeri di carta di credito nei nostri bucket?" |
| **Inspector** | Vulnerabilità software su EC2 | "Le nostre istanze hanno CVE critiche?" |
| **GuardDuty** | Minacce e comportamenti anomali | "Qualcuno sta cercando di estrarre dati?" |

**Artifact vs Config — la trappola più comune:**
- Sei un'azienda nel settore sanitario e devi firmare un **Business Associate Agreement (BAA)** con AWS per la conformità HIPAA → **Artifact** (ti fornisce i documenti legali)
- Vuoi verificare automaticamente che **nessun Security Group abbia la porta 22 aperta verso 0.0.0.0/0** → **Config** (monitora le configurazioni)

---

## 6. Cifratura in AWS

### Encryption at Rest (Dati Fermi)
Dati cifrati quando sono memorizzati. Tutti i principali servizi AWS supportano la cifratura at rest:
- S3: SSE-S3, SSE-KMS, SSE-C
- EBS: cifratura del volume
- RDS: cifratura del database

### Encryption in Transit (Dati in Movimento)
Dati cifrati durante la trasmissione su rete. Si usa **TLS/SSL (HTTPS)**. AWS Certificate Manager (ACM) gestisce i certificati SSL gratuitamente.

---

## 🧠 Cheat Sheet — Domande Frequenti Esame

| Scenario | Servizio/Concetto |
|---|---|
| "Chi gestisce le patch dell'OS su EC2?" | **Cliente** (IaaS) |
| "Chi gestisce le patch dell'OS su RDS?" | **AWS** (servizio managed) |
| "Protezione DDoS gratuita" | **Shield Standard** |
| "Protezione DDoS avanzata con team dedicato" | **Shield Advanced** |
| "Firewall per applicazioni web" | **WAF** |
| "Rilevamento anomalie e minacce (ML)" | **GuardDuty** |
| "Scansione vulnerabilità EC2" | **Inspector** |
| "Dati sensibili su S3 (PII)" | **Macie** |
| "Gestione chiavi di cifratura" | **KMS** |
| "Documenti compliance e certificazioni" | **Artifact** |
| "Chi ha fatto cosa sull'account AWS?" | **CloudTrail** |
| "Le risorse rispettano le mie policy?" | **AWS Config** |
| "Raccomandazioni sicurezza/costi/performance" | **Trusted Advisor** |
| "Login utenti della mia app (non AWS)" | **Cognito** |
| "Credenziali DB nel codice sorgente" | **Secrets Manager** |

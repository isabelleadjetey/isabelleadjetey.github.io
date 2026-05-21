# Dominio 3: Cloud Technology & Services (34%)

> Il dominio più pesante dell'esame. Copre tutti i principali servizi AWS divisi per categoria: Compute, Storage, Database, Networking.

---

## 1. Compute — Come eseguire le tue applicazioni

### EC2 (Elastic Compute Cloud) — IaaS
Il servizio di **server virtuali** di AWS. Lanci un'istanza EC2 e ottieni un server con OS, CPU e RAM a tua scelta.

**Tipi di istanza (famiglie):**
| Famiglia | Ottimizzata per | Esempio uso |
|---|---|---|
| **General Purpose** (t3, m6) | Bilanciamento CPU/RAM | Web server, dev/test |
| **Compute Optimized** (c6) | CPU intensiva | Rendering, HPC, gaming |
| **Memory Optimized** (r6) | RAM intensiva | Database in-memory, big data |
| **Storage Optimized** (i3) | I/O disco alta | Database NoSQL, data warehouse |
| **Accelerated Computing** (p3, g4) | GPU | ML training, grafica |

**Modelli di pricing EC2:**
| Modello | Sconto vs On-Demand | Quando usarlo |
|---|---|---|
| **On-Demand** | — (prezzo base) | Carichi imprevedibili, test, sviluppo |
| **Reserved** (1-3 anni) | fino a 72% | Carichi stabili e prevedibili (production) |
| **Savings Plans** | fino a 72% | Come Reserved ma più flessibile |
| **Spot Instances** | fino a 90% | Carichi interrompibili (batch, ML training) |
| **Dedicated Hosts** | — (più costoso) | Compliance normativa, licenze per socket |

> ⚠️ **Spot Instances:** AWS può interromperle con 2 minuti di preavviso quando ha bisogno della capacità. Usale SOLO per workload che tollerano interruzioni.

### AWS Lambda — Serverless / FaaS
Esegui **codice senza gestire server**. Paghi solo il tempo di esecuzione (al millisecondo). AWS gestisce tutto il resto: OS, runtime, scaling, patch.
- Massimo: 15 minuti di esecuzione per invocazione
- Ideale per: API backend, processazione eventi, automazione
- Evento-driven: Lambda si attiva in risposta a eventi (upload S3, messaggio SQS, chiamata API)

### Elastic Beanstalk — PaaS
Deploy semplificato di applicazioni. Carichi il codice, Beanstalk gestisce automaticamente: provisioning EC2, load balancing, auto scaling, monitoraggio. Ideale per sviluppatori che non vogliono gestire l'infrastruttura.

### ECS / EKS / Fargate — Container
- **ECS** (Elastic Container Service): piattaforma AWS per eseguire container Docker
- **EKS** (Elastic Kubernetes Service): Kubernetes gestito da AWS
- **Fargate**: modalità serverless per ECS/EKS — nessuna gestione dei server, paghi solo i container

### AWS Lightsail
VPS (Virtual Private Server) semplificato con prezzi fissi mensili. Pensato per chi non ha esperienza AWS — include server, storage, trasferimento dati e DNS in un pacchetto pre-configurato.

---

## 2. Storage — Come conservare i dati

### S3 (Simple Storage Service) — Object Storage
Storage praticamente **illimitato** per oggetti (file). Non è un filesystem tradizionale — ogni oggetto ha una chiave univoca e viene salvato in un **bucket**.

**Caratteristiche chiave:**
- Durabilità: **99.999999999%** ("11 nines")
- Disponibilità: 99.99%
- Dimensione max oggetto: 5 TB
- Nomi bucket: univoci globalmente in tutta AWS

**Classi di storage S3 (per ottimizzare i costi):**
| Classe | Accesso | Costo storage | Costo recupero | Uso |
|---|---|---|---|---|
| **S3 Standard** | Frequente | Alto | Basso | Dati acceduti spesso |
| **S3 Standard-IA** | Infrequente | Medio | Medio | Backup mensili |
| **S3 One Zone-IA** | Infrequente | Basso | Medio | Dati ricostruibili (1 sola AZ) |
| **S3 Glacier Instant** | Archivio | Basso | Basso | Archivio con recupero immediato |
| **S3 Glacier Flexible** | Archivio | Molto basso | Alto (minuti/ore) | Archivio a lungo termine |
| **S3 Glacier Deep Archive** | Archivio raro | Minimo | Molto alto (ore) | Archivio decennale |
| **S3 Intelligent-Tiering** | Variabile | Variabile | Basso | Accesso imprevedibile |

**S3 Lifecycle Policies:** regole automatiche che spostano gli oggetti tra classi di storage in base all'età. Esempio: dopo 30 giorni → Standard-IA, dopo 90 giorni → Glacier.

### EBS (Elastic Block Store) — Block Storage
**Disco virtuale** che si attacca a un'istanza EC2 — come un disco rigido. I dati persistono anche dopo lo spegnimento dell'istanza (a differenza dello storage effimero).
- Legato a una singola AZ
- Tipi: SSD General Purpose (gp3), SSD Provisioned IOPS (io2), HDD Throughput Optimized (st1)

### EFS (Elastic File System) — File Storage
**File system condiviso** accessibile contemporaneamente da più istanze EC2. Come NFS in ambiente Linux. Si espande automaticamente. Disponibile su più AZ.

### S3 vs EBS vs EFS — La Tabella Fondamentale

| | S3 | EBS | EFS |
|---|---|---|---|
| Tipo | Object | Block | File |
| Accesso | HTTP/HTTPS | Montato su EC2 | Montato su EC2 (multi-istanza) |
| Multi-AZ | ✅ | ❌ (1 AZ) | ✅ |
| Scalabilità | Illimitata | Fino a 64 TB | Automatica illimitata |
| Uso tipico | Immagini, video, backup | Disco OS di EC2 | File condivisi tra server |

### AWS Storage Gateway
Bridge tra on-premises e cloud AWS. Permette alle applicazioni on-premises di usare storage S3 come se fosse locale.

### AWS Snow Family — Migrazione Fisica
Quando la rete è troppo lenta per caricare petabyte di dati, AWS ti spedisce fisicamente un dispositivo:
- **Snowcone**: piccolo (8 TB)
- **Snowball Edge**: medio (80 TB)
- **Snowmobile**: camion con container (fino a 100 PB!)

---

## 3. Database — Come gestire i dati strutturati

### RDS (Relational Database Service)
Database relazionali **gestiti da AWS**: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Amazon Aurora.
- AWS gestisce: backup automatici, patch, failover, replica
- Il cliente gestisce: schema, query, utenti del database
- **Multi-AZ**: replica sincrona per alta disponibilità e failover automatico
- **Read Replicas**: repliche asincrone per distribuire il carico di lettura

### Amazon Aurora
Database relazionale **proprietario AWS**, compatibile con MySQL e PostgreSQL. Fino a **5x più veloce di MySQL** e **3x di PostgreSQL**. Storage automaticamente distribuito su 3 AZ con 6 copie dei dati.

### DynamoDB — NoSQL
Database **NoSQL key-value** completamente serverless. Latenza in millisecondi anche con miliardi di record. Scala automaticamente.
- Nessuna gestione dell'infrastruttura
- Ideale per: app mobile, gaming, IoT, e-commerce

### ElastiCache
Database **in-memory** per caching. Compatibile con Redis o Memcached. Riduce drasticamente la latenza per dati acceduti frequentemente (es. sessioni utente, risultati di query frequenti).

### Amazon Redshift
**Data Warehouse** per analisi su enormi quantità di dati (petabyte). Usato per Business Intelligence, report aziendali, analisi di dati storici. Completamente managed.

### Amazon DocumentDB
Database **document-oriented** compatibile con MongoDB. Gestito, scalabile, per applicazioni che usano documenti JSON.

---

## 4. Networking — Come connettere tutto

### VPC (Virtual Private Cloud)
Rete virtuale **privata e isolata** all'interno di AWS. È il tuo spazio di rete personale — definisci tu IP, subnet, route table, gateway.

**Componenti VPC:**
- **Subnet pubblica**: connessa a Internet tramite Internet Gateway
- **Subnet privata**: senza accesso diretto a Internet
- **Internet Gateway (IGW)**: permette alla VPC di comunicare con Internet
- **NAT Gateway**: permette alle risorse in subnet private di accedere a Internet (in uscita) senza essere raggiungibili dall'esterno
- **Route Table**: tabella di routing che definisce dove mandare il traffico

### Security Group vs NACL

| | Security Group | NACL (Network ACL) |
|---|---|---|
| Livello | Istanza (EC2) | Subnet |
| Tipo | Stateful | Stateless |
| Default | Blocca tutto in entrata, permette tutto in uscita | Permette tutto |
| Regole | Solo Allow | Allow e Deny |

**Stateful** = se permetti il traffico in entrata, la risposta in uscita è automaticamente permessa.
**Stateless** = devi esplicitamente permettere sia entrata che uscita.

### Route 53 — DNS
Servizio **DNS** di AWS. Registra domini, risolve nomi in IP, offre routing policies avanzate: Simple, Weighted, Latency-based, Failover, Geolocation.

### CloudFront — CDN
**Content Delivery Network** di AWS. Distribuisce contenuti (immagini, video, CSS, HTML) dalle **Edge Location** più vicine all'utente → minima latenza globale. Si integra con S3, EC2, ALB.

### Elastic Load Balancing (ELB)
Distribuisce il traffico in entrata tra più istanze EC2 su più AZ.
- **ALB** (Application Load Balancer): L7, routing basato su URL/header
- **NLB** (Network Load Balancer): L4, ultra-alta performance, IP statico
- **GLB** (Gateway Load Balancer): per appliance di sicurezza (firewall di terze parti)

### AWS Direct Connect
Connessione **fisica dedicata** tra il datacenter on-premises e AWS, bypassando Internet pubblico. Offre: banda garantita, latenza costante, maggiore sicurezza.

### AWS VPN
Connessione **cifrata** tra on-premises e AWS attraverso Internet. Più economica di Direct Connect ma dipende dalla qualità di Internet.

---

## 5. Altri Servizi Importanti

### CloudWatch — Monitoraggio
Raccoglie **metriche, log e eventi** da tutte le risorse AWS. Crea allarmi (es. "avvisami se la CPU di EC2 supera l'80%"). Dashboard personalizzabili. Integrato con Auto Scaling.

### SNS (Simple Notification Service)
Servizio di **notifiche push**. Invia messaggi a: email, SMS, Lambda, SQS, HTTP endpoint. Pattern: pub/sub (publisher → topic → subscriber).

### SQS (Simple Queue Service)
**Coda di messaggi** gestita. Disaccoppia i componenti di un'applicazione: il produttore mette messaggi nella coda, il consumatore li elabora al suo ritmo. Garantisce che nessun messaggio vada perso.

### AWS Elastic Beanstalk
Deploy e gestione automatica di applicazioni web. Supporta: Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker.

### Amazon API Gateway
Crea, gestisce e pubblica **API REST e WebSocket**. Integrazione nativa con Lambda per architetture serverless.

---

## 🧠 Cheat Sheet — Domande Frequenti Esame

| Scenario | Servizio |
|---|---|
| "Server virtuale con massimo controllo" | **EC2** |
| "Esegui codice senza server, paghi al ms" | **Lambda** |
| "Container senza gestire server" | **Fargate** |
| "Storage oggetti praticamente infinito" | **S3** |
| "Disco attaccato a EC2, persiste" | **EBS** |
| "File system condiviso tra più EC2" | **EFS** |
| "Spedisci TB di dati fisicamente ad AWS" | **Snowball** |
| "Database SQL managed" | **RDS** |
| "Database NoSQL serverless, latenza ms" | **DynamoDB** |
| "Caching in memoria" | **ElastiCache** |
| "Data warehouse per analytics" | **Redshift** |
| "DNS e registrazione domini" | **Route 53** |
| "CDN per ridurre latenza globale" | **CloudFront** |
| "Distribuisce traffico tra EC2" | **Load Balancer (ELB)** |
| "Rete privata isolata in AWS" | **VPC** |
| "Connessione fisica dedicata on-prem↔AWS" | **Direct Connect** |
| "Monitoraggio metriche e allarmi" | **CloudWatch** |
| "Notifiche email/SMS/push" | **SNS** |
| "Coda messaggi tra componenti app" | **SQS** |
| "Firewall a livello istanza, stateful" | **Security Group** |
| "Firewall a livello subnet, stateless" | **NACL** |

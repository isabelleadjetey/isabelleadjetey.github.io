# 🚀 AWS Cloud Practitioner (CLF-C02) - L'Enciclopedia Definitiva

Questo cheat sheet esteso contiene la totalità dei servizi coperti dall'esame CLF-C02. Associa ogni servizio alla sua funzione primaria.

---

## 🏗️ 1. Compute (Calcolo)
*   **Amazon EC2:** Server virtuale (IaaS). Gestione totale.
*   **AWS Lambda:** Serverless. Esegui codice a evento, paghi al millisecondo.
*   **AWS Elastic Beanstalk:** PaaS. Carichi il codice, lui crea l'infrastruttura (EC2, Load Balancer, Auto Scaling).
*   **Amazon ECS:** Orchestrazione Container proprietaria AWS (Docker).
*   **Amazon EKS:** Orchestrazione Container standard open-source (Kubernetes).
*   **AWS Fargate:** Motore Serverless per far girare i container (lo usi insieme a ECS o EKS per non gestire i server sottostanti).
*   **Amazon Lightsail:** Il server virtuale "per principianti" (VPS preconfigurata a costo fisso mensile, come Aruba).
*   **AWS Outposts:** Server fisici AWS installati nel *tuo* datacenter (Cloud Ibrido puro).
*   **AWS Batch:** Per elaborazioni di dati massicce (batch) in parallelo.

## 💾 2. Storage
*   **Amazon S3:** Object storage. Dati piatti, immagini, log, siti web statici. (Classe *Standard* = default).
*   **S3 Standard-IA:** Infrequent Access. Dati usati poco ma disponibili immediatamente (costa meno dello Standard).
*   **S3 One Zone-IA:** Come IA, ma i dati sono in una sola Availability Zone. Più economico, meno sicuro (se il DC brucia, perdi i dati).
*   **S3 Glacier Flexible Retrieval:** Archiviazione. Recupero da minuti a ore.
*   **S3 Glacier Deep Archive:** Archiviazione a lungo termine a costo bassissimo. Recupero in 12 ore.
*   **S3 Intelligent-Tiering:** Sposta i dati tra classi in automatico usando l'Intelligenza Artificiale (ottimizza i costi se non sai quanto accederai ai file).
*   **Amazon EBS:** Block storage. L'Hard Disk (SSD/HDD) collegato a 1 sola istanza EC2.
*   **Amazon EFS:** File storage (NFS). Disco di rete Linux condiviso su decine di istanze EC2.
*   **Amazon FSx:** File system nativo per macchine Windows o per HPC (Lustre).
*   **AWS Storage Gateway:** Ponte ibrido. Fa credere ai tuoi server locali di salvare su disco locale, ma in realtà carica tutto su S3 in cloud.
*   **AWS Snow Family:** Dispositivi fisici inviati per posta per spostare enormi moli di dati:
    *   *Snowcone:* Piccolo (8TB).
    *   *Snowball Edge:* Valigia gigante (80TB+).
    *   *Snowmobile:* Un vero tir (100 Petabyte).

## 🗄️ 3. Database
*   **Amazon RDS:** Database relazionale (SQL) gestito (MySQL, Postgres, Oracle, SQL Server). Niente patch manuali.
*   **Amazon Aurora:** Motore relazionale proprietario AWS. Compatibile con MySQL/Postgres ma 5x più veloce.
*   **Amazon DynamoDB:** Database NoSQL (Key-Value). Millisecondi di latenza, scala all'infinito, serverless.
*   **Amazon DocumentDB:** Database NoSQL per documenti (Compatibile con MongoDB).
*   **Amazon Redshift:** Data Warehouse. Analisi dati storici (Analytics/Big Data).
*   **Amazon Neptune:** Graph Database (utile per i social network o per capire le relazioni, es. "Chi conosce chi").
*   **Amazon QLDB:** Database a registro (Ledger). Immortale, non si può cancellare lo storico delle transazioni.
*   **Amazon ElastiCache:** Salva i dati in RAM (Redis, Memcached) per velocizzare letture estreme sul database.

## 🌐 4. Networking & Content Delivery
*   **Amazon VPC:** La tua rete privata virtuale. (Subnet pubbliche/private, Route tables, Internet Gateway).
*   **Amazon Route 53:** Il DNS di AWS. Traduce i nomi a dominio (es. google.com) in indirizzi IP. (Route 53 = Porta 53).
*   **Amazon CloudFront:** CDN (Content Delivery Network). Usa le *Edge Locations* globali per scaricare i file statici vicino agli utenti senza dover attraversare l'oceano.
*   **AWS Direct Connect:** Cavo fisico dedicato dal tuo ufficio diretto ai data center AWS. Privato (non passa su Internet), costante, ultra-sicuro.
*   **AWS VPN:** Connessione sicura, ma passa tramite l'Internet pubblico.
*   **AWS Transit Gateway:** Il "Punto centrale" (Hub & Spoke). Connette facilmente migliaia di VPC e reti aziendali insieme.
*   **AWS Global Accelerator:** Usa l'infrastruttura privata globale di AWS per accelerare il traffico (TCP/UDP) verso la tua app ed evitare internet aperto.
*   **Amazon API Gateway:** Crea, pubblica e gestisci API in modo sicuro (solitamente si usa per esporre funzioni Lambda).

## 🔒 5. Security, Identity & Compliance
*   **AWS IAM:** Gestione utenti, password, ruoli temporanei.
*   **AWS IAM Identity Center (Single Sign-On):** Fai login 1 sola volta e accedi a decine di account AWS aziendali.
*   **AWS WAF:** Web Application Firewall. Ferma hacker (SQL injection, XSS). Layer 7.
*   **AWS Shield:** Blocca attacchi DDoS. Layer 3/4. (Lo Standard è gratis per sempre).
*   **AWS KMS:** Key Management Service. Genera chiavi per criptare i dischi o i file.
*   **AWS CloudHSM:** Come KMS, ma è hardware fisico dedicato a te.
*   **AWS Secrets Manager:** Salva e ruota automaticamente (es. ogni 30 giorni) le password del database in modo sicuro.
*   **Amazon Macie:** Intelligenza artificiale che controlla se hai lasciato carte di credito o documenti d'identità in chiaro su Amazon S3.
*   **Amazon GuardDuty:** La guardia giurata. Analizza i log in background e ti avvisa se c'è attività sospetta (Intelligent Threat Detection).
*   **Amazon Inspector:** Entra dentro le istanze EC2 e controlla se i software installati hanno buchi di sicurezza noti (CVE).
*   **AWS Security Hub:** Un cruscotto gigante che raggruppa tutti gli allarmi di sicurezza di Macie, GuardDuty e Inspector.
*   **AWS Artifact:** È un portale per scaricare PDF dei report legali e di compliance di AWS (es. ISO, SOC2, PCI-DSS). Serve ai legali dell'azienda.
*   **AWS Cognito:** Gestisce la registrazione e il login per gli utenti della *tua* app web o app mobile (Login con Facebook/Google/Apple).

## 📊 6. Management & Governance
*   **Amazon CloudWatch:** Monitoraggio e Performance (CPU, Traffico, Errori, Allarmi).
*   **AWS CloudTrail:** L'Auditor (Sicurezza). "Chi, Come, Quando" ha fatto una chiamata API.
*   **AWS Trusted Advisor:** Consigliere automatico. Verifica 5 Pilastri (Costi, Sicurezza, Fault Tolerance, Performance, Limiti Servizio).
*   **AWS Config:** Registra tutte le *modifiche di configurazione* delle risorse (chi ha cambiato le regole del firewall nel tempo?).
*   **AWS CloudFormation:** Infrastructure as Code. Tu scrivi un documento in formato YAML/JSON, AWS legge il file e costruisce l'infrastruttura da solo.
*   **AWS Systems Manager (SSM):** Raggruppa e aggiorna flotte giganti di server (EC2) insieme (es. Patching automatico di Windows su 100 macchine).
*   **AWS Control Tower:** Per le grandissime aziende. Configura una rete multi-account perfetta, sicura e con le regole già impostate.

## 🤖 7. Analytics & Machine Learning (Integration)
*   **Amazon Athena:** Fai query SQL direttamente dentro i file .csv o .json che hai "buttato" in Amazon S3, senza dover creare un database.
*   **Amazon Kinesis:** Riceve ed elabora dati in "Streaming" (es. sensori IoT o video live a milioni al secondo).
*   **Amazon EMR:** Big Data Framework (Hadoop / Apache Spark).
*   **Amazon QuickSight:** Business Intelligence. Ti crea grafici a torta e diagrammi interattivi (tipo Tableau).
*   **AWS Glue:** ETL (Extract, Transform, Load). Prende dati sporchi, li pulisce e li mette pronti per essere letti.
*   **Amazon SageMaker:** Per i Data Scientist. Piattaforma per costruire modelli di Machine Learning.
*   **Amazon Rekognition:** Riconoscimento facciale (capisce cosa c'è in una foto o video).
*   **Amazon Polly:** Testo in voce umana (Text-to-Speech).
*   **Amazon Transcribe:** Voce in Testo (Speech-to-Text, tipo sottotitoli automatici).
*   **Amazon Comprehend:** Legge le email e capisce il sentimento (NLP) (es. "Il cliente è arrabbiato o felice?").
*   **Amazon Translate:** Google Translate di AWS.

## 🤝 8. Application Integration (Messaggistica)
*   **Amazon SNS:** Simple Notification Service. Spedisce messaggi "a tutti" i sottoscrittori (Push, Email, SMS).
*   **Amazon SQS:** Simple Queue Service. Mette in coda i messaggi in attesa che un server li elabori (Disaccoppiamento).
*   **AWS Step Functions:** Crea workflow visivi a step (es. fai A, poi se succede B fai C).

## 💸 9. Billing, Pricing & Support
*   **AWS Organizations:** Fatturazione consolidata + Sconti volume + SCP (Service Control Policies) per bloccare le regioni.
*   **AWS Cost Explorer:** Analizza grafici passati. Forecating.
*   **AWS Budgets:** Allarmi se sfori la spesa stabilita.
*   **AWS Pricing Calculator:** Creare preventivi online *prima* dell'acquisto.
*   **Support Plans:**
    *   *Basic:* Gratis / Billing help. (I controlli base Trusted Advisor sono 7).
    *   *Developer:* Email / orario ufficio. (Consigli Cloud generici).
    *   *Business:* Telefono/Chat 24x7 / Full Trusted Advisor / Supporto terze parti.
    *   *Enterprise:* Telefono 24x7 / TAM (Technical Account Manager) dedicato / Concierge per il billing.

## 🏛️ 10. Architettura Globale
*   **Regione:** Cluster geografico isolato (es. eu-south-1 Milano). Ha al suo interno almeno 3 AZ.
*   **Availability Zone (AZ):** Un singolo Data Center (o gruppo di DC) distante kilometri dagli altri per resistere a tsunami/incendi.
*   **Edge Location:** Mini-data center periferici (ci sono in tutto il mondo) usati da CloudFront per cache e Route 53.
*   **Globali:** IAM, Route 53, CloudFront, WAF.
*   **Regionali:** EC2, S3 (nome globale ma salvataggio regionale), RDS, VPC.

## 🏗️ 11. AWS Well-Architected Framework (I 6 Pilastri)
1.  **Operational Excellence:** Infrastructure as Code.
2.  **Security:** IAM, crittografia, auditing.
3.  **Reliability:** Auto Scaling, architettura Multi-AZ.
4.  **Performance Efficiency:** Serverless.
5.  **Cost Optimization:** Chiudere le risorse non usate (Right Sizing).
6.  **Sustainability:** Risparmiare corrente elettrica per l'ambiente.

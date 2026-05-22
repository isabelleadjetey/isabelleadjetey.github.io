# 🚀 AWS Cloud Practitioner (CLF-C02) - Ultimate Cheat Sheet

Questo è il "Bignami" definitivo. Stampalo o tienilo aperto sul telefono la sera prima dell'esame. L'esame Cloud Practitioner è un test di associazione mentale: collega la "parola chiave" al servizio giusto.

---

## 🏗️ 1. Compute (Calcolo)
*   **Amazon EC2:** Server virtuale (IaaS). Gestisci tu OS e patch.
*   **AWS Lambda:** Serverless / FaaS. Esegui codice senza gestire server. Paghi al millisecondo.
*   **AWS Elastic Beanstalk:** PaaS. Carichi il codice, AWS crea tutta l'infrastruttura web in automatico.
*   **Amazon ECS / EKS:** Orchestrazione di Container (Docker) / Kubernetes.

## 💾 2. Storage
*   **Amazon S3:** Object storage. Usato per backup, immagini, o siti web statici.
*   **Amazon EBS:** Block storage. L'hard disk attaccato alla singola istanza EC2.
*   **Amazon EFS:** File storage. Disco condiviso a cui possono accedere *più* istanze EC2 (solo Linux) contemporaneamente.
*   **AWS Storage Gateway:** Cloud ibrido. Collega i server on-premise allo storage in cloud (S3).
*   **AWS Snowball:** Dispositivo fisico (valigia) per trasferire Petabyte di dati verso AWS senza intasare internet.

## 🗄️ 3. Database
*   **Amazon RDS:** Database relazionale (SQL). AWS gestisce backup e patch.
*   **Amazon Aurora:** Versione "premium" di RDS (compatibile MySQL/PostgreSQL), molto più veloce e scalabile.
*   **Amazon DynamoDB:** Database NoSQL (Key-Value). Serverless, latenza a singola cifra di millisecondo.
*   **Amazon Redshift:** Data Warehouse. Usato per Big Data e Analytics (Business Intelligence).
*   **Amazon ElastiCache:** Caching in-memory (Redis, Memcached) per velocizzare le letture dei database.

## 🌐 4. Networking & Content Delivery
*   **Amazon VPC:** Rete virtuale privata per isolare le tue risorse.
*   **Amazon Route 53:** Servizio DNS (Domain Name System). Globalmente distribuito.
*   **Amazon CloudFront:** CDN (Content Delivery Network). Usa le *Edge Locations* per consegnare contenuti (video, immagini) agli utenti di tutto il mondo con bassissima latenza.

## 🔒 5. Sicurezza e Identità (Security)
*   **AWS IAM:** Gestione utenti, gruppi, ruoli e policy. (Niente password root usate quotidianamente!).
*   **AWS WAF:** Web Application Firewall. Protegge le app (Layer 7) da SQL injection e Cross-Site Scripting (XSS).
*   **AWS Shield:** Protezione da attacchi DDoS (Layer 3/4). *Shield Standard* è gratuito e automatico.
*   **AWS KMS:** Key Management Service. Per creare e gestire le chiavi di crittografia.
*   **Amazon Macie:** Usa il Machine Learning per trovare dati sensibili (PII, carte di credito) dentro i bucket S3.
*   **Amazon GuardDuty:** Rilevamento intelligente delle minacce nel tuo account.
*   **Amazon Inspector:** Scansiona le istanze EC2 per trovare vulnerabilità del software.

## 📊 6. Management & Governance
*   **Amazon CloudWatch:** Monitoraggio delle **Performance** (CPU, RAM, allarmi se il server sta per esplodere).
*   **AWS CloudTrail:** **Auditing e Sicurezza**. "Chi ha fatto cosa?". Registra tutte le chiamate API fatte nell'account.
*   **AWS Trusted Advisor:** L'esperto automatico. Controlla il tuo account su 5 pilastri: Costi, Sicurezza, Tolleranza ai guasti, Performance, Service Limits.
*   **AWS Config:** Registra e valuta le configurazioni delle tue risorse nel tempo (es. "Chi ha aperto questa porta sul firewall ieri?").

## 💸 7. Billing, Pricing & Support
*   **AWS Organizations:** Più account AWS uniti insieme. Fatturazione consolidata (una sola bolletta) e sconti per volume.
*   **AWS Cost Explorer:** Analizza graficamente i costi passati e prevede quelli futuri.
*   **AWS Budgets:** Manda un allarme (email/SNS) quando stai per sforare il budget mensile.
*   **AWS Pricing Calculator:** Fai preventivi *prima* di creare le risorse.
*   **Support Plans:**
    *   *Basic:* Gratis. No supporto tecnico.
    *   *Developer:* Email, orario ufficio.
    *   *Business:* Telefono/Chat 24/7. Accesso a tutti i controlli Trusted Advisor.
    *   *Enterprise:* Telefono/Chat 24/7. Assegnazione di un TAM (Technical Account Manager).

## 🏛️ 8. Globale vs Regionale (Fondamentale!)
*   **Servizi Globali:** IAM, Route 53, CloudFront, WAF.
*   **Servizi Regionali:** EC2, S3 (il nome del bucket è globale, ma i dati sono in una regione), RDS, Lambda.

## 🏗️ 9. AWS Well-Architected Framework (I 6 Pilastri)
1.  **Operational Excellence:** Eseguire codice ed erogare valore (Infrastructure as Code).
2.  **Security:** Proteggere informazioni e sistemi.
3.  **Reliability (Affidabilità):** Riprendersi dai guasti e mitigare problemi.
4.  **Performance Efficiency:** Usare le risorse IT nel modo più efficiente.
5.  **Cost Optimization:** Evitare spese inutili.
6.  **Sustainability:** Minimizzare l'impatto ambientale.

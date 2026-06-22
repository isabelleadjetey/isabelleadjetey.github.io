# 🧠 AWS Cloud Practitioner (CLF-C02) - High-Yield Quizzes

Questo archivio raccoglie le domande ad alto rendimento (High-Yield) per il ripasso rapido del Cloud Practitioner, suddivise per aree tematiche chiave (Sicurezza, Tecnologie, Costi e Supporto).

---

## 🔒 Blocco 1: Security & Compliance (Dominio 2)

**Q1. Un'azienda deve archiviare le credenziali di un database e desidera che vengano ruotate automaticamente ogni 30 giorni per motivi di sicurezza. Quale servizio dovrebbe utilizzare?**
* [ ] A) AWS KMS
* [X B) AWS Secrets Manager
* [ ] C) AWS IAM Identity Center
* [ ] D) Amazon Macie


**Q2. Secondo il modello di responsabilità condivisa di AWS, quale delle seguenti attività è interamente a carico di AWS?**
* [ ] A) La crittografia dei dati dei clienti a riposo (at-rest).
* [ ] B) L'aggiornamento e il patching dei sistemi operativi guest sulle istanze EC2.
* [X] C) La manutenzione fisica e il raffreddamento delle strutture dei data center.
* [ ] D) La gestione dei permessi di acesso per gli utenti IAM.

**Q3. Quale servizio di sicurezza AWS utilizza l'apprendimento automatico (Machine Learning) per scovare informazioni sensibili o dati personali (PII), come numeri di carte di credito, all'interno dei bucket S3?**
* [ ] A) Amazon Inspector
* [] B) Amazon GuardDuty
* [x ] C) Amazon Macie
* [ ] D) AWS Shield

**Q4. Un'azienda vuole proteggere la propria applicazione web da attacchi di tipo SQL Injection e Cross-Site Scripting (XSS). Quale servizio dovrebbe configurare?**
* [ ] A) AWS Shield Standard
* [x] B) AWS WAF
* [ ] C) Amazon GuardDuty
* [ ] D) Security Groups

**Q5. Quale risorsa self-service gratuita fornisce l'accesso on-demand ai report di sicurezza e conformità di AWS, come le certificazioni SOC o ISO?**
* [ ] A) AWS Trusted Advisor
* [x] B) AWS Artifact
* [ ] C) AWS CloudTrail
* [ ] D) AWS Systems Manager

---

## 🏗️ Blocco 2: Tecnologie, Storage e Database (Dominio 3 & 4)

**Q6. Un'azienda deve eseguire un carico di lavoro batch asincrono che può essere interrotto e ripreso in qualsiasi momento senza problemi. Quale modello di acquisto per le istanze EC2 consentirà di minimizzare al massimo i costi?**
* [ ] A) On-Demand Instances
* [ x] B) Spot Instances
* [ ] C) Dedicated Hosts
* [ ] D) Reserved Instances

**Q7. Quale classe di archiviazione di Amazon S3 è più adatta per i dati ad accesso non frequente, ma che devono essere comunque accessibili in pochi millisecondi quando necessario, minimizzando i costi di archiviazione?**
* [] A) S3 Glacier Deep Archive
* [ ] B) S3 Standard
* [ x] C) S3 Standard-Infrequent Access (S3 Standard-IA)
* [ ] D) S3 Glacier Flexible Retrieval

**Q8. Un amministratore cloud desidera ricevere un avviso via e-mail non appena la spesa mensile stimata dell'account supera i 100 USD. Quale servizio AWS dovrebbe utilizzare?**
* [ ] A) AWS Cost Explorer
* [x] B) AWS Budgets
* [ ] C) AWS Trusted Advisor
* [ ] D) Amazon CloudWatch Alarms

**Q9. Un'applicazione richiede un database NoSQL in grado di garantire prestazioni stabili con latenze a una singola cifra di millisecondi (single-digit millisecond latency) a qualsiasi scala. Quale servizio AWS soddisfa questo requisito?**
* [ ] A) Amazon RDS
* [ ] B) Amazon DynamoDB
* [ ] C) Amazon Redshift
* [ ] D) Amazon Aurora

---

## 💸 Blocco 3: Support Plans & Well-Architected Framework

**Q10. Un'azienda ha bisogno di un piano di supporto AWS che offra supporto tecnico 24 ore su 24, 7 giorni su 7, tramite telefono, chat ed e-mail, e l'accesso completo a tutti i controlli di AWS Trusted Advisor. Qual è il piano di supporto minimo ed economico che soddisfa questi requisiti?**
* [ ] A) Developer Support
* [x] B) Business Support
* [ ] C) Enterprise Support
* [ ] D) Basic Support

**Q11. Quale pilastro dell'AWS Well-Architected Framework si concentra sulla capacità di un sistema di riprendersi da interruzioni dell'infrastruttura o del servizio e di acquisire dinamicamente risorse di calcolo per soddisfare la domanda?**
* [ ] A) Operational Excellence
* [x] B) Reliability
* [ ] C) Performance Efficiency
* [ ] D) Security

**Q12. Quale delle seguenti figure viene assegnata esclusivamente ai clienti del piano di supporto AWS Enterprise per aiutarli a pianificare e progettare le proprie soluzioni seguendo le best-practice, fungendo da consulente tecnico dedicato?**
* [ ] A) AWS Solutions Architect
* [x] B) Technical Account Manager (TAM)
* [ ] C) AWS Concierge Support Representative
* [ ] D) AWS Infrastructure Event Management Team

**Q13. Quale pilastro dell'AWS Well-Architected Framework promuove l'uso dell'Infrastructure as Code (IaC) e la pianificazione di modifiche reversibili frequenti per migliorare costantemente i processi aziendali?**
* [ x A) Operational Excellence
* [ ] B) Cost Optimization
* [ ] C) Sustainability
* [ ] D) Performance Efficiency

---

## 🗝️ Soluzioni e Spiegazioni (Nascondi finché non hai completato il test!)

<details>
<summary><b>👀 Clicca qui per mostrare le Soluzioni</b></summary>

### Soluzioni Blocco 1
* **Q1: Risposta B (AWS Secrets Manager).** Progettato appositamente per credenziali di database, chiavi API e segreti sensibili, con funzionalità nativa di rotazione automatica.
* **Q2: Risposta C (Manutenzione fisica e raffreddamento).** Rientra nella sicurezza *dell'infrastruttura fisica globale* (Security OF the Cloud), gestita interamente da AWS. Le altre opzioni sono responsabilità logiche del cliente (Security IN the Cloud).
* **Q3: Risposta C (Amazon Macie).** Servizio di sicurezza completamente gestito basato su intelligenza artificiale per individuare, classificare e proteggere i dati sensibili (PII) archiviati in bucket S3.
* **Q4: Risposta B (AWS WAF).** È il Web Application Firewall che protegge le applicazioni a livello Layer 7 (Application) da minacce come SQL injection e cross-site scripting (XSS).
* **Q5: Risposta B (AWS Artifact).** È il portale self-service ufficiale per scaricare i report di audit di AWS e verificare la conformità globale (certificati ISO, report SOC, ecc.).

### Soluzioni Blocco 2
* **Q6: Risposta B (Spot Instances).** Le istanze Spot offrono sconti fino al 90% per capacità computazionale inutilizzata. Poiché il carico di lavoro asincrono è tollerante alle interruzioni, è l'opzione perfetta ed economica.
* **Q7: Risposta C (S3 Standard-IA).** Classe ideale per dati consultati poco spesso ma che necessitano di disponibilità in millisecondi in caso di accesso improvviso, con costi di archiviazione inferiori rispetto allo Standard.
* **Q8: Risposta B (AWS Budgets).** Consente di definire budget di spesa preventivi e configurare notifiche email non appena le spese stimate o effettive superano la soglia stabilita.
* **Q9: Risposta B (Amazon DynamoDB).** Database NoSQL di tipo chiave-valore proprietario di AWS, progettato specificamente per prestazioni sub-millisecond a qualsiasi livello di traffico.

### Soluzioni Blocco 3
* **Q10: Risposta B (Business Support).** È il piano minimo ed economico che sblocca il supporto tecnico 24/7 tramite telefono/chat e l'accesso completo al Trusted Advisor. (Il piano Developer offre supporto solo via email in orario d'ufficio).
* **Q11: Risposta B (Reliability / Affidabilità).** Si occupa proprio di tolleranza ai guasti, ripristino automatico e scalabilità dinamica per mantenere stabile l'erogazione dei servizi.
* **Q12: Risposta B (Technical Account Manager - TAM).** È il consulente tecnico dedicato assegnato esclusivamente al livello Enterprise per affiancare il cliente nelle operazioni cloud quotidiane.
* **Q13: Risposta A (Operational Excellence / Eccellenza Operativa).** Si focalizza sul miglioramento continuo dei processi aziendali, sulla standardizzazione delle procedure e sulla gestione dell'infrastruttura tramite codice (IaC).

</details>

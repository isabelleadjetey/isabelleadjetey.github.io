# 📊 Status Report: Allineamento SNOC (Check 2)

Questo documento riepiloga i progressi effettuati in base alle direttive ricevute nell'allineamento con Federico Rota e Andrea Locatelli (rif. verbale del 14 Maggio), pronto per essere condiviso al prossimo incontro di aggiornamento.

---

## ✅ Obiettivi Completati (Smarcati)
I punti prioritari richiesti per chiudere il capitolo fondamenti di rete (CCNA) sono stati studiati e assimilati con successo, con focus sui concetti teorici e sulla logica di funzionamento (vendor-neutral) come richiesto da Andrea.

* [X] **SNMP (Simple Network Management Protocol):** Compresa la logica di monitoraggio dell'infrastruttura (Manager, Agent, MIB).
* [X] **Port Security (L2 Security):** Compreso il blocco degli indirizzi MAC non autorizzati agli switch di accesso.
* [X] **DHCP Snooping (L2 Security):** Compresa la mitigazione degli attacchi Rogue DHCP e la validazione dei messaggi sulla rete.
* [X] **Fondamenti VPN & Tunneling:** Completato lo studio teorico sulle architetture WAN e configurato con successo un tunnel GRE (Lab Day 53 - Jeremy's IT Lab).

---

## ⏳ In Corso (Transizione a NS4)
In conformità con il piano stabilito, la transizione verso le tecnologie Fortinet è ufficialmente iniziata.

* [X] **Avvio Corso Ufficiale NS4:** Iscrizione confermata al corso *"FortiOS 7.6 Administrator Self-Paced"* e studio metodico intrapreso a partire dai fondamenti.
* [X] **Completamento Fondamenti (Lesson 1 & 2):** Smarcati i moduli iniziali relativi a System/Network Settings, Logging e Monitoring.
* [🔄] **Focus Attuale (Lesson 3):** Conclusione in corso del modulo vitale su **Firewall Policies e NAT**.
  * *Obiettivo Didattico:* Comprendere la logica di *Implicit Deny*, la creazione di regole basate su Source/Destination/Service, e la gestione automatica del *Source NAT* tramite interfaccia grafica (Web GUI), differenziando l'approccio Fortinet da quello Cisco.

---

## 🎯 Prossimi Passi & Bloccanti (VPN)
Attività in coda da affrontare a breve termine per prepararsi all'affiancamento pratico a Bergamo:

* [ ] **Approfondimento VPN su FortiOS:** Affrontare i capitoli dedicati a IPsec e SSL VPN all'interno del corso FortiGate Administrator per capire le due Fasi IKE e la crittografia in ambiente reale.
* [ ] **Bloccante - Accesso Piattaforma:** In attesa che Federico Rota ripristini l'accesso all'account di *Network Lessons* (come suggerito da Andrea) per integrare lo studio delle VPN con risorse esterne specifiche.

---

> **Note per l'allineamento:** L'approccio allo studio continua a privilegiare la *logica di funzionamento* rispetto alla memorizzazione dei comandi CLI, preparandosi alla gestione di un'infrastruttura multi-vendor (Cisco, Fortinet, HP, Juniper).

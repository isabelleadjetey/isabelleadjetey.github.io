# 📘 CCNA Knowledge Base: Automation and Programmability (Dominio 6)

> **Obiettivo:** Documento di revisione rapida e configurazione per l'esame CCNA.
> **Dominio CCNA:** Core Networking

---

Questo documento copre il **10% dell'esame CCNA (Dominio 6)**, focalizzato sul passaggio dalle reti tradizionali gestite manualmente (CLI) alle reti moderne gestite tramite controller, API e strumenti di automazione.

---

## 1. Traditional vs Controller-Based Networks

Il concetto base dell'automazione di rete è separare il "cervello" dai "muscoli" dei dispositivi di rete (come router e switch).

### I Piani di Rete (Planes)
Ogni dispositivo di rete tradizionale svolge le sue funzioni su 3 piani:
1. **Data Plane (Forwarding Plane):** È il "muscolo". Sposta i pacchetti da un'interfaccia all'altra. (Es. inoltro basato su MAC table o Routing table, incapsulamento). *Opera ad altissima velocità tramite chip specializzati (ASIC).*
2. **Control Plane:** È il "cervello". Prende le decisioni su dove mandare il traffico. Costruisce le tabelle (Routing table, ARP table, STP). Usa protocolli come OSPF, EIGRP, BGP. *Lento, usa la CPU del router.*
3. **Management Plane:** È l'interfaccia usata dall'amministratore per configurare il dispositivo (SSH, Telnet, SNMP, Syslog).

### Reti Tradizionali (Distributed Control Plane)
Ogni router/switch ha il proprio Control Plane e Data Plane integrati. I dispositivi comunicano tra loro (es. scambiandosi messaggi OSPF) per calcolare i percorsi, ma ogni apparato è un'entità indipendente configurata manualmente.
- **Pro:** Resilienza (nessun singolo punto di fallimento totale).
- **Contro:** Difficile e lento da gestire su larga scala.

### Controller-Based Networks (Centralized Control Plane - SDN)
Software-Defined Networking (SDN) cambia le regole del gioco:
- Il **Control Plane viene "estratto"** dai singoli dispositivi e centralizzato in un server chiamato **SDN Controller** (es. Cisco DNA Center).
- I dispositivi fisici mantengono solo il **Data Plane** (diventano "stupidi" ma veloci inoltratori di pacchetti).
- L'amministratore configura le policy *sul Controller*, e il Controller programma automaticamente tutti i dispositivi.

---

## 2. Le API: Northbound vs Southbound

Come comunica il Controller con i programmatori da una parte, e con i router/switch dall'altra? Tramite **API (Application Programming Interfaces)**.

### Southbound APIs (Verso il Basso)
Il Controller "guarda giù" verso l'infrastruttura di rete fisica (router e switch).
- Servono al Controller per **spingere le configurazioni** e **raccogliere statistiche** dai dispositivi.
- Protocolli comuni: **OpenFlow**, **NETCONF**, **RESTCONF**, **CLI/SSH** (per apparati vecchi), **SNMP**.

### Northbound APIs (Verso l'Alto)
Il Controller "guarda su" verso gli script, le applicazioni di automazione o la dashboard dell'amministratore.
- Servono a te (o a uno script Python) per chiedere al Controller: "Dammi lo stato della rete" o "Aggiungi questa VLAN ovunque".
- Protocollo standard assoluto: **REST (RESTful APIs)** usando HTTP/HTTPS e JSON/XML.

```
[I tuoi Script Python / Dashboard]
           │
           ▼  (Northbound APIs — REST/JSON)
           │
  [ SDN CONTROLLER ]
           │
           ▼  (Southbound APIs — NETCONF/RESTCONF/OpenFlow)
           │
[Router] [Switch] [AP]
```

---

## 3. Formati Dati: JSON vs XML vs YAML

Quando uno script parla con il Controller tramite REST API, i dati devono essere formattati in modo leggibile. L'esame CCNA richiede di riconoscere **JSON**.

### JSON (JavaScript Object Notation)
È il formato più usato nelle API REST. Regole base da riconoscere per l'esame:
- I dati sono coppie `"Chiave": "Valore"`
- Gli oggetti sono racchiusi in **graffe `{ }`**
- Gli array (liste di valori) sono racchiusi in **quadre `[ ]`**
- Separatore: virgola `,` tra gli elementi

**Esempio JSON:**
```json
{
  "interfaccia": "GigabitEthernet0/1",
  "status": "up",
  "vlan_attive": [10, 20, 30],
  "ip_address": {
    "indirizzo": "192.168.1.1",
    "subnet": "255.255.255.0"
  }
}
```

---

## 4. REST APIs (Representational State Transfer)

REST è l'architettura standard per le API web (Northbound). Si basa sul protocollo **HTTP/HTTPS**.

### HTTP Verbs (Azioni CRUD)
Le operazioni su un'API REST corrispondono alle operazioni sui database (CRUD: Create, Read, Update, Delete) mappate sui verbi HTTP:

| Operazione CRUD | Verbo HTTP | Cosa fa (Esempio) |
|---|---|---|
| **C**reate | **POST** | Crea una nuova risorsa (es. crea una nuova VLAN). |
| **R**ead | **GET** | Legge informazioni (es. dammi la lista delle interfacce). **Non modifica nulla.** |
| **U**pdate | **PUT** / **PATCH** | Modifica o sostituisce una risorsa esistente (es. cambia l'IP). |
| **D**elete | **DELETE** | Elimina una risorsa (es. rimuovi una route statica). |

### Codici di Risposta HTTP
Quando invii una richiesta REST, il server risponde con un codice a 3 cifre:
- **2xx (Successo):** 200 OK (La `GET` è andata a buon fine), 201 Created (La `POST` ha creato la risorsa).
- **4xx (Errore Client):** 400 Bad Request (sintassi JSON errata), 401 Unauthorized (credenziali errate), 404 Not Found.
- **5xx (Errore Server):** 500 Internal Server Error (il controller ha avuto un crash).

---

## 5. Configuration Management Tools: Ansible, Puppet, Chef

Perché loggarsi in 50 switch se uno strumento può farlo in 3 secondi? Questi strumenti permettono l'**Infrastructure as Code (IaC)**. Per il CCNA devi sapere come si differenziano.

| Caratteristica | **Ansible (Il più usato / testato)** | **Puppet** | **Chef** |
|---|---|---|---|
| **Architettura** | **Agentless** (Non richiede software sui router, usa SSH) | **Agent-based** (Serve un agent software installato sui nodi) | **Agent-based** (Serve un agent sui nodi) |
| **Come comunica** | SSH / NETCONF | HTTPS (verso Puppet Master) | HTTPS (verso Chef Server) |
| **Linguaggio/Formato** | **YAML** (Playbooks) | Ruby (Manifests) | Ruby (Recipes / Cookbooks) |
| **Modello** | **Push** (L'admin spinge la config verso i router) | **Pull** (L'agent del router scarica la config) | **Pull** (L'agent tira giù la config) |

### Approfondimento su Ansible (da ricordare):
- **Agentless:** Il suo più grande vantaggio per le reti. I router/switch spesso non permettono di installare agent esterni (es. Puppet agent). Ansible usa il normale SSH, quindi funziona out-of-the-box.
- **Playbook:** Il file scritto in formato YAML dove definisci cosa vuoi configurare (es. "assicurati che la VLAN 10 esista su tutti gli switch in Milano").
- **Inventory:** Il file che contiene gli IP e le credenziali dei dispositivi da gestire.

---

## 6. Cisco DNA Center (Cisco DNAC)

Cisco DNAC è la soluzione SDN principale di Cisco per le reti Enterprise (LAN/WLAN). Sostituisce la CLI tradizionale con una gestione intent-based.

**Caratteristiche per l'esame:**
- Usa architettura Controller-Based.
- Fornisce ricche **Northbound REST APIs**.
- Offre gestione centralizzata, provisioning zero-touch e analytics (assurance).

---

## 🧠 Cheat Sheet — Automation & Programmability (CCNA)

| Domanda tipo | Risposta da dare |
|---|---|
| "Piano che sposta i pacchetti (inoltro)" | **Data Plane (Forwarding Plane)** |
| "Piano che calcola le route (OSPF, EIGRP)" | **Control Plane** |
| "API dal Controller verso script/applicazioni" | **Northbound API (REST)** |
| "API dal Controller verso i router fisici" | **Southbound API (OpenFlow, NETCONF)** |
| "Formato dati con parentesi graffe `{ }` e coppie `chiave:valore`" | **JSON** |
| "Verbo HTTP REST per creare una nuova risorsa" | **POST** |
| "Verbo HTTP REST per leggere informazioni (read-only)" | **GET** |
| "Tool di automazione **Agentless** che usa SSH e YAML" | **Ansible** |
| "Tool di automazione **Agent-based** che usa Ruby e modello Pull" | **Puppet** o **Chef** |
| "Termine per Ansible che *spinge* la config ai router" | **Push model** |

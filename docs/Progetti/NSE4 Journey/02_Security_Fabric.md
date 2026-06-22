# Lesson 2: Security Fabric

## Concetto di Base
La Security Fabric permette a più apparati Fortinet di scambiarsi informazioni in tempo reale e agire all'unisono contro le minacce, garantendo visibilità centralizzata e risposte automatizzate.

## Requisiti
- Almeno **1 FortiAnalyzer**.
- Almeno **2 FortiGate** (oppure un singolo FortiGate diviso in VDOMs).

## Architettura Root e Downstream
- **Root FortiGate:** Il firewall principale al vertice della gerarchia. È l'unico che deve avere il FortiAnalyzer configurato manualmente. Mostra la *Topology Map* completa.
- **Downstream FortiGate:** Firewall subordinati che ereditano in automatico l'IP del FortiAnalyzer dal Root FW.
- Se si crea un oggetto sul Root FW, questo viene replicato in automatico sui Downstream FW (funzione disattivabile).

## Funzionalità Principali
- **Automazioni:** Creazione di trigger e azioni. Es: Se un host viene rilevato compromesso, il FortiGate può isolare la porta dello switch a cui è collegato (FortiSwitch) o metterlo in quarantena.
- **Device Detection:** Abilitando questa opzione sulle interfacce, il firewall identifica i tipi di dispositivi connessi per popolare la Topology Map. (Non necessario se è installato il FortiClient sull'endpoint, che invia nativamente i dati tramite telemetria).
- **Security Rating:** Valutazione continua del livello di sicurezza dell'infrastruttura rispetto alle best practice.

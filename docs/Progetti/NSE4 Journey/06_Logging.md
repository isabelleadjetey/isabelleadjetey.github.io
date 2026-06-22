# Lesson 6: Logging and Monitoring

## Tipologie di Log
- **Traffic Logs:** Informazioni su tutte le sessioni consentite/bloccate ("All Sessions").
- **Security Events (UTM):** Log generati dai Security Profiles (es. Antivirus ha rilevato un file, Web Filter ha bloccato un sito). Selezionando "Security Events" nella policy, i log di solo traffico pulito non vengono generati.
- **System Logs:** Eventi amministrativi, guasti hardware, VPN che vanno giù o su.

## Storage dei Log
- **Disco Locale:** (Sui modelli con Hard Disk). I log vengono mantenuti per default 7 giorni e poi sovrascritti.
- **Esterno (Consigliato):** 
  - *FortiAnalyzer:* Analisi approfondita, retention lunga, generazione report.
  - *Syslog / SIEM:* (es. FortiSIEM, Splunk) Ricezione log via UDP/TCP 514.
  - *FortiCloud:* Soluzione cloud Fortinet (7 giorni gratuiti).

## Comportamento in Security Fabric
- Se un pacchetto attraversa 5 FortiGate nella stessa Security Fabric, *solo il primo FortiGate* invia il log al FortiAnalyzer/Root per evitare ridondanza e sovraccarico.
- Protocollo usato per l'invio log tra apparati Fortinet: **FortiTelemetry**.

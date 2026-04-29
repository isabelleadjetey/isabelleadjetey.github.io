# Recap CCNA: Monitoring & Management (NTP, SNMP, Syslog)

Questi tre servizi sono gli "occhi e le orecchie" dello SNOC. Senza di loro, saresti cieca: non sapresti quando un link cade, chi sta consumando banda o se l'ora degli eventi è corretta.

---

## 1. NTP (Network Time Protocol): Il Metronomo
L'**NTP** serve a sincronizzare l'orologio di tutti i router e switch con un server di riferimento ultra-preciso (Stratum 1).

*   **L'Analogia:** Immagina di dover risolvere un mistero guardando le telecamere di sicurezza. Se l'orologio della Telecamera A segna le 10:00 e quello della Telecamera B segna le 10:05, non capirai mai chi è passato prima. L'NTP fa sì che tutti gli apparati abbiano lo **stesso identico orario**.
*   **Perché nello SNOC?** È vitale per la **Security**. Se subisci un attacco, devi sapere l'ordine esatto dei log per ricostruire l'accaduto.

### La Ricetta NTP
```text
ntp server 193.204.114.232     <-- Un server NTP pubblico (es. INRIM Italia)
ntp server 162.159.200.1       <-- Server di backup
show ntp status                <-- Per vedere se sei in "Sync"
```

---

## 2. SNMP (Simple Network Management Protocol): L'Interrogatorio
L'**SNMP** permette a un software di monitoraggio (come Zabbix o Nagios) di chiedere informazioni allo switch.

*   **L'Analogia:** Il server di monitoraggio è il "Medico" e il router è il "Paziente". Ogni 5 minuti il Medico chiede: "Qual è la tua temperatura (CPU)?" o "Quanta pressione hai (Banda)?".
*   **Versioni:**
    *   **v2c:** Semplice ma **insicura**. Usa una password chiamata `community string` inviata in chiaro.
    *   **v3:** **Standard SNOC.** Supporta crittografia e autenticazione (nessuno può spiare i dati del router).

### La Ricetta SNMP (v2c)
```text
snmp-server community SorintRO RO   <-- Password 'SorintRO' in sola lettura (Read Only)
```

---

## 3. Syslog: La Scatola Nera
A differenza dell'SNMP (dove il manager chiede), il **Syslog** è il router che "parla" spontaneamente quando succede qualcosa.

*   **L'Analogia:** È come il diario di bordo. Ogni volta che si apre una porta o cade un link, il router scrive una riga. Queste righe vengono inviate a un server centrale così non si perdono se il router esplode o viene riavviato.
*   **I Livelli di Severità (Da imparare a memoria!):**
    *   **0-Emergency** (Il sistema è inutilizzabile)
    *   **1-Alert** (Bisogna agire subito)
    *   **2-Critical** (Problemi critici)
    *   **3-Error** (Errori di sistema)
    *   **4-Warning** (Attenzione, qualcosa non va)
    *   **5-Notice** (Eventi normali ma significativi)
    *   **6-Informational** (Messaggi informativi)
    *   **7-Debugging** (Dettagli tecnici per i tecnici)

### La Ricetta Syslog
```text
logging host 192.168.100.50    <-- Invia i log al server dello SNOC
logging trap notifications     <-- Invia solo dai log di livello 5 in su (evita il rumore)
```

---

## 4. I Ferri del Mestiere (Troubleshooting)
1.  **`show logging`**: Per vedere gli ultimi log salvati nella memoria locale (Buffer).
2.  **`show ntp associations`**: Per vedere con quali "amici" il router sta parlando per l'ora.
3.  **`show snmp`**: Per vedere quanti pacchetti di monitoraggio sono arrivati.

---

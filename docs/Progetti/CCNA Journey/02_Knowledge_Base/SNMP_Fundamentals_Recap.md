# Recap CCNA & SNOC: SNMP (Simple Network Management Protocol)

Mentre il *Syslog* permette al router di dirti quando qualcosa non va (inviando log), l'**SNMP** è lo strumento che permette al tuo sistema di monitoraggio (NMS, come Zabbix, PRTG o SolarWinds) di **interrogare costantemente** l'apparato per sapere come sta.

In un ambiente SNOC, l'SNMP è il protocollo principe: è quello che genera i grafici di utilizzo della CPU, del consumo di banda sulle interfacce e che ti allerta se la temperatura del router sale troppo.

---

## 1. I Componenti dell'SNMP

Per capire come funziona, devi conoscere i "ruoli" in gioco:

1.  **NMS (Network Management System):** È il server centrale dello SNOC (es. Zabbix). È lui che "fa le domande".
2.  **Agent:** È il software che gira sul router o sullo switch Cisco. È lui che "risponde alle domande" e raccoglie i dati hardware locali.
3.  **MIB (Management Information Base):** È come un enorme *dizionario* strutturato ad albero all'interno del router. Contiene tutte le variabili che l'NMS può chiedere.
4.  **OID (Object Identifier):** È il "numero di targa" di una specifica variabile dentro la MIB. Ad esempio, l'OID `1.3.6.1.2.1.2.2.1.10` potrebbe corrispondere ai byte ricevuti su un'interfaccia. L'NMS chiede all'Agent il valore di quel preciso OID.

---

## 2. Come comunicano? (Messaggi SNMP)

Il protocollo si basa su un'architettura Client-Server (dove l'NMS è il client che interroga e l'Agent è il server che risponde). Usa la porta **UDP 161** per le interrogazioni e **UDP 162** per le notifiche spontanee (Traps).

*   **Polling (L'NMS chiede, l'Agent risponde):**
    *   **Get Request:** L'NMS chiede il valore di una singola variabile (es. "Quanta RAM stai usando?").
    *   **GetNext / GetBulk:** Usati per scaricare intere tabelle di dati (es. l'intera tabella di routing) velocemente.
    *   **Set Request:** L'NMS *scrive* un valore. Esatto, l'SNMP può anche modificare le configurazioni del router (es. spegnere un'interfaccia da remoto), se abilitato in scrittura (Write/RW).

*   **Notifiche Spontanee (L'Agent avvisa l'NMS):**
    *   **Trap:** Il router rileva un problema (es. interfaccia andata DOWN) e invia subito un allarme all'NMS. Lo svantaggio? *Non richiede conferma*, se il pacchetto viene perso, l'NMS non lo saprà mai.
    *   **Inform:** Come la Trap, ma l'NMS deve inviare una ricevuta di ritorno (ACK). Se il router non riceve l'ACK, ritrasmette il messaggio. Molto più affidabile!

---

## 3. Le Versioni di SNMP (Cruciale per l'esame e per lo SNOC)

Questo è l'argomento più testato in assoluto:

*   **SNMPv1:** Obsoleto, supporta solo MIB vecchie, tutto in chiaro (non usarlo mai).
*   **SNMPv2c:** Molto comune, ha introdotto il `GetBulk` e gli `Inform`. Il difetto? La sicurezza si basa su una **Community String** (una password condivisa come `public` o `private`) che viaggia in **chiaro** (Plaintext). Chiunque sniffi il traffico può leggerla.
*   **SNMPv3:** Lo Standard SNOC per l'Enterprise. Introduce una fortissima sicurezza tramite utenti, crittografia e integrità del dato. 

### I 3 livelli di sicurezza di SNMPv3:
1.  **noAuthNoPriv:** Nessuna autenticazione (niente utente/password forte) e Nessuna crittografia (viaggia in chiaro). Essenzialmente come la v2c.
2.  **authNoPriv:** Richiede Autenticazione (MD5 o SHA) ma *Nessuna crittografia*. L'identità è certa, ma il traffico si può ancora leggere.
3.  **authPriv:** Il Sacro Graal. **Autenticazione** (SHA) + **Crittografia** (AES/DES). Nessuno può né rubare le credenziali né leggere i grafici.

---

## 4. Configurazione per l'Esame CCNA

### Configurare SNMPv2c (Semplice ma insicuro)
```text
R1(config)# snmp-server community SNOC-RO RO     <-- Read-Only (Solo monitoraggio)
R1(config)# snmp-server community SNOC-RW RW     <-- Read-Write (Pericoloso, permette modifiche!)
```
*Se un dispositivo ha una community RW di default (es. 'private'), nello SNOC lo consideriamo un gravissimo incidente di sicurezza.*

### Configurare SNMP Traps (Per far parlare il router)
```text
R1(config)# snmp-server host 10.0.0.50 version 2c SNOC-RO  <-- 10.0.0.50 è il server Zabbix
R1(config)# snmp-server enable traps                       <-- Abilita l'invio delle Traps
```

### La complessa ma sicura configurazione di SNMPv3 ( authPriv )
La v3 non usa semplici password, ma crea "Gruppi" e "Utenti".
```text
1. Creiamo un Gruppo SNMPv3 che richiede massima sicurezza (priv):
R1(config)# snmp-server group GRUPPO_SNOC v3 priv

2. Creiamo un Utente e lo assegniamo al Gruppo, specificando gli algoritmi:
R1(config)# snmp-server user ADMIN_SNOC GRUPPO_SNOC v3 auth sha MyAuthPassword priv aes 128 MyPrivPassword
```

---

## 5. Cheat Sheet per lo SNOC
*   Se un monitoraggio Zabbix non funziona, controlla:
    1.  Hai configurato l'IP del server Zabbix nelle ACL del router? L'SNMP usa **UDP 161**.
    2.  La Community String (o la password v3) combacia al 100%? (Case sensitive!).
    3.  C'è un firewall in mezzo che blocca il traffico UDP?
*   Per il debug: usa `show snmp` per vedere se il router sta effettivamente ricevendo e processando le richieste.

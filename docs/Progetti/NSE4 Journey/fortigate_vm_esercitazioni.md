# Esercitazioni per FortiGate VM

Utilizzare una macchina virtuale FortiGate (FortiOS) è un ottimo modo per prepararsi alle certificazioni (come l'NSE 4) o per fare pratica pratica. La versione di valutazione (Trial) gratuita dura 15 giorni e permette di testare la maggior parte delle funzionalità.

Ecco una lista di laboratori e scenari pratici che puoi svolgere, in ordine di difficoltà.

> [!IMPORTANT]
> **Novità:** È disponibile la [Guida Completa Step-by-Step ai Laboratori](file:///C:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/NSE4%20Journey/nse4_labs_guide.html) con le soluzioni dettagliate per la GUI per completare tutti questi esercizi!

---

## 1. Configurazione Iniziale e Amministrazione (Base)
Questo lab ti aiuta a familiarizzare con l'interfaccia (GUI e CLI) e a mettere in sicurezza l'accesso al firewall.

*   **Configurazione di Base:** Modifica l'hostname del dispositivo, configura il fuso orario (NTP) e imposta una *Password Policy* robusta.
*   **Interfacce:** Crea 3 zone logiche. Ad esempio: 
    *   `port1` (WAN) con IP statico o DHCP.
    *   `port2` (LAN) con un IP privato (es. `10.0.0.254/24`).
    *   `port3` (DMZ) per futuri server (es. `172.16.0.254/24`).
*   **DHCP Server:** Abilita il server DHCP sull'interfaccia LAN in modo che i client connessi ottengano automaticamente un IP.
*   **Gestione Amministratori:** Crea un nuovo utente amministratore (profilo Read-Only) e limita l'accesso amministrativo (SSH, HTTPS) solo da determinati IP (*Trusted Hosts*).

## 2. Routing e NAT (Base)
L'obiettivo è far navigare i client su Internet e permettere l'accesso dall'esterno verso i server interni.

*   **Routing Statico:** Configura una rotta statica di default (`0.0.0.0/0`) verso il gateway del tuo ISP (sull'interfaccia WAN).
*   **Source NAT (SNAT):** Crea una IPv4 Policy per permettere alla LAN di accedere a Internet (WAN) attivando il NAT in uscita (Usa *Outgoing Interface Address*).
*   **Destination NAT (VIP):** Crea un Virtual IP (VIP) per inoltrare il traffico in ingresso (es. porta 80/HTTP sulla WAN) verso un server web situato nella zona DMZ. Crea la policy associata.

## 3. Gestione Oggetti e Policy Avanzate (Intermedio)
Impara a semplificare la gestione delle regole utilizzando oggetti.

*   **Objects:** Crea oggetti address per PC specifici e un *Address Group* chiamato "IT_Team". Crea un *Service Group* personalizzato che includa HTTP, HTTPS e SSH.
*   **Policy Granulari:** Crea una policy posizionata **sopra** la regola generale di navigazione che permetta all' "IT_Team" di usare RDP e SSH verso Internet, e fai in modo di loggare tutto il traffico (*Log Allowed Traffic -> All Sessions*).
*   **Schedules:** Crea un oggetto "Orario Lavorativo" (es. Lun-Ven, 8:00-18:00) e applicalo a una policy per bloccare la navigazione fuori da questo orario.

## 4. Security Profiles e UTM (Intermedio / Avanzato)
Questi sono il cuore del Next-Generation Firewall (NGFW). Testali avendo una VM client (es. Windows o Linux) posizionata nella LAN.

*   **Antivirus:** Crea un profilo AV per bloccare tutto. Scarica il file di test innocuo **EICAR** via HTTP/HTTPS e verifica che il FortiGate lo blocchi e che il log registri l'evento.
*   **Web Filtering:** 
    *   Crea un profilo che blocchi le categorie "Social Networking" e "Adult Materials".
    *   Imposta una quota (es. 5 minuti al giorno) per la categoria "Streaming Media".
    *   Verifica l'apparizione della pagina di blocco (*FortiGuard Block Page*).
*   **Application Control:** Blocca l'utilizzo di specifiche applicazioni come **BitTorrent** o **TeamViewer**, a prescindere dalla porta utilizzata.
*   **SSL/SSH Inspection:** (*Richiede certificati*) Configura la *Deep Inspection* per poter applicare Antivirus e Web Filtering al traffico HTTPS cifrato. Installa il certificato del FortiGate sul PC client per evitare errori del browser.

## 5. Virtual Private Networks - VPN (Avanzato)
Per le VPN site-to-site è ideale avere due VM FortiGate.

*   **SSL VPN (Remote Access):**
    *   Configura il portale *Web-Only* per accedere a un server interno tramite bookmark.
    *   Configura la modalità *Tunnel* e testa la connessione con l'applicazione **FortiClient**. Configura l'assegnazione degli IP per i client VPN.
*   **IPsec Site-to-Site:**
    *   Imposta un tunnel IPsec tra due FortiGate (usando il *VPN Wizard* o manualmente in modalità Route-based).
    *   Crea le rotte statiche sul tunnel e le firewall policy bidirezionali per permettere il ping tra le due LAN remote.

## 6. SD-WAN (Avanzato)
La gestione del traffico su link multipli.

*   **Setup Iniziale:** Assicurati che la tua VM abbia due interfacce per la WAN (es. `port1` e `port4`). Raggruppale in una zona SD-WAN.
*   **Performance SLA:** Configura un Health Check (ping verso `8.8.8.8`) per monitorare la latenza, il jitter e il packet loss dei due link.
*   **SD-WAN Rules:** Crea regole per bilanciare il traffico. Ad esempio: fai uscire tutto il traffico "YouTube" sulla WAN2, e usa la regola *Lowest Cost (SLA)* per il traffico generale.

## 7. Virtual Domains - VDOM (Avanzato)
I VDOM permettono di dividere logicamente un FortiGate in più firewall virtuali indipendenti.

*   **Abilitazione e Creazione:** Abilita i VDOM (richiede un riavvio logico). Crea un VDOM chiamato "Customer-A".
*   **Assegnazione:** Sposta un'interfaccia libera dal VDOM `root` al VDOM `Customer-A`.
*   **VDOM Link (Inter-VDOM Routing):** Crea un VDOM Link per connettere il VDOM `root` al VDOM `Customer-A`. Configura gli indirizzi IP sul link, il routing e le policy per far comunicare una macchina nel VDOM root con una nel VDOM Customer-A.

---
> [!TIP]
> **Consiglio per il Lab:** Se usi GNS3, EVE-NG o VMware, fai uno **snapshot** (o un backup della configurazione locale tramite *Admin > Configuration > Backup*) ogni volta che completi un capitolo. Ti permetterà di tornare rapidamente a uno stato "pulito" se commetti errori irreversibili.

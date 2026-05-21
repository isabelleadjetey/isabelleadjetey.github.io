# Quiz CCNA — IP Services, VPN & Security Avanzata

**Argomenti coperti:** SNMP · IPSec/VPN · Wireless Security (WPA2/WPA3) · AAA/RADIUS/TACACS+
**Formato:** Domande aperte con risposta + QCM (scelta multipla)

---

## PARTE 1 — DOMANDE APERTE CON RISPOSTA

---

### 📡 Blocco 1: SNMP

---

**Q1. Qual è la differenza tra una Trap e un Inform?**

> **Risposta:**
> La **Trap** è una notifica spontanea che il router invia all'NMS quando accade un evento (es. interfaccia DOWN). Non richiede conferma — se il pacchetto viene perso, l'NMS non lo sa mai.
> L'**Inform** funziona allo stesso modo, ma l'NMS deve rispondere con un ACK. Se il router non riceve l'ACK, ritrasmette. L'Inform è molto più affidabile della Trap.

---

**Q2. Hai un router con `snmp-server community public RW`. Perché è un problema gravissimo?**

> **Risposta:**
> "public" è la community string di default conosciuta da tutti. Con accesso **RW (Read-Write)**, chiunque conosca questa stringa può non solo leggere tutta la configurazione del router, ma anche **modificarla** (spegnere interfacce, cambiare routing, ecc.). Nello SNOC equivale a lasciare la porta del datacenter aperta con la chiave nel buco.

---

**Q3. Elenca i 3 livelli di sicurezza di SNMPv3 in ordine crescente.**

> **Risposta:**
> 1. **noAuthNoPriv** — Nessuna autenticazione, nessuna cifratura. Come SNMPv2c, traffico in chiaro.
> 2. **authNoPriv** — Autenticazione con MD5 o SHA, ma traffico ancora in chiaro.
> 3. **authPriv** — Autenticazione (SHA) **+** Cifratura (AES). Standard enterprise, lo si usa sempre in ambienti professionali.

---

**Q4. Cos'è un OID? A cosa serve?**

> **Risposta:**
> Un **OID (Object Identifier)** è il "numero di targa" univoco di una specifica variabile all'interno della MIB (il dizionario del router). È un indirizzo numerico gerarchico (es. `1.3.6.1.2.1.1.5.0` = sysName = hostname del router). L'NMS usa l'OID per chiedere all'Agent il valore di una precisa metrica.

---

**Q5. Su quale porta e protocollo lavora SNMP? E le Traps?**

> **Risposta:**
> - Query SNMP (Get, Set): **UDP porta 161**
> - Traps e Informs: **UDP porta 162**
> Usa UDP perché è leggero e veloce — il monitoraggio genera tantissimo traffico e la bassa latenza è preferita all'affidabilità di TCP.

---

### 🔐 Blocco 2: VPN e IPSec

---

**Q6. Qual è la differenza tra Site-to-Site e Remote Access VPN?**

> **Risposta:**
> - **Site-to-Site:** connette due **sedi fisse** (es. Milano ↔ Roma) tramite i loro router/firewall. Il tunnel è sempre attivo. Gli utenti non si accorgono di nulla.
> - **Remote Access:** connette un **singolo utente remoto** (es. tecnico in smart working) alla rete aziendale tramite un client VPN (es. Cisco AnyConnect). L'utente attiva la connessione manualmente.

---

**Q7. Qual è la differenza tra AH e ESP in IPSec? Quale si usa sempre?**

> **Risposta:**
> - **AH (Authentication Header):** garantisce solo l'autenticità e l'integrità del pacchetto. **Non cifra nulla** — il contenuto è leggibile.
> - **ESP (Encapsulating Security Payload):** cifra il contenuto **E** autentica. È quello usato sempre in pratica perché fornisce sicurezza completa.

---

**Q8. IPSec costruisce il tunnel in 2 fasi. Cosa fa ciascuna?**

> **Risposta:**
> - **Fase 1 — IKE (Internet Key Exchange):** I due router si autenticano e negoziano un canale sicuro per la comunicazione. È la "stretta di mano" iniziale.
> - **Fase 2 — IPSec SA (Security Association):** Usando il canale sicuro della Fase 1, vengono negoziati i parametri del tunnel dati (algoritmi di cifratura, chiavi). Dopo questa fase il tunnel è operativo e il traffico scorre cifrato.

---

**Q9. GRE da solo è sicuro? Perché si usa GRE + IPSec insieme?**

> **Risposta:**
> **No**, GRE da solo non cifra nulla — è un tunnel in chiaro. Si usa insieme a IPSec perché:
> - **GRE** permette di trasportare protocolli che IPSec non supporta da solo (es. OSPF, multicast, broadcast)
> - **IPSec** cifra tutto il contenuto che GRE trasporta
> La combinazione GRE+IPSec = tunnel che supporta routing dinamico + traffico completamente cifrato.

---

**Q10. Cisco AnyConnect usa IPSec o SSL? È Site-to-Site o Remote Access?**

> **Risposta:**
> Cisco AnyConnect è una soluzione di **Remote Access VPN** e usa **SSL/TLS** (non IPSec) per creare il tunnel. Si chiama anche SSL VPN. È lo standard moderno per lo smart working perché non richiede configurazioni complesse sul client.

---

### 📶 Blocco 3: Wireless Security

---

**Q11. Metti in ordine cronologico e di sicurezza: WPA3, WEP, WPA2, WPA.**

> **Risposta (dal più vecchio/insicuro al più recente/sicuro):**
> 1. **WEP** (1997) — Rotto, craccabile in minuti
> 2. **WPA** (2003) — Miglioramento temporaneo con TKIP, ancora vulnerabile
> 3. **WPA2** (2004) — Standard attuale, AES-CCMP, robusto
> 4. **WPA3** (2018) — Il più sicuro, SAE, protegge anche da attacchi offline

---

**Q12. Qual è la differenza tra WPA2-Personal e WPA2-Enterprise?**

> **Risposta:**
> - **Personal (PSK):** tutti gli utenti condividono la **stessa password** (Pre-Shared Key). Semplice, usato a casa o piccoli uffici.
> - **Enterprise (802.1X):** ogni utente ha le **proprie credenziali individuali**. L'autenticazione è delegata a un server **RADIUS** esterno. Usato in ambienti aziendali — molto più sicuro e gestibile.

---

**Q13. Cosa introduce WPA3 rispetto a WPA2?**

> **Risposta:**
> WPA3 introduce **SAE (Simultaneous Authentication of Equals)** che sostituisce il vecchio handshake a 4 vie di WPA2. SAE elimina la vulnerabilità agli attacchi "offline dictionary attack" — anche catturando il traffico di handshake, un attaccante non può provare password offline. Usa anche **AES-GCMP-256** (più robusto di AES-CCMP di WPA2).

---

**Q14. In un'azienda con 200 dipendenti useresti WPA2-Personal o Enterprise?**

> **Risposta:**
> **WPA2-Enterprise** (o WPA3-Enterprise). Con Personal, se un dipendente lascia l'azienda dovresti cambiare la password su tutti i 200 dispositivi. Con Enterprise, basta revocare le credenziali di quell'utente sul server RADIUS — zero modifiche agli AP o agli altri dispositivi.

---

### 🔑 Blocco 4: AAA, RADIUS, TACACS+

---

**Q15. Cosa significano le 3 A di AAA? Spiega ciascuna con un esempio.**

> **Risposta:**
> - **Authentication (Chi sei?):** verifica l'identità. Es: il tecnico inserisce username e password per fare SSH su un router.
> - **Authorization (Cosa puoi fare?):** definisce i permessi. Es: il tecnico junior può solo fare `show` commands, non `configure terminal`.
> - **Accounting (Cosa hai fatto?):** registra tutte le azioni. Es: log che mostra che il tecnico ha digitato `no shutdown` sull'interfaccia Gi0/0 alle 14:32.

---

**Q16. RADIUS usa TCP o UDP? TACACS+?**

> **Risposta:**
> - **RADIUS:** UDP (porte 1812 per autenticazione, 1813 per accounting)
> - **TACACS+:** TCP (porta 49)

---

**Q17. Quale dei due cifra l'intero pacchetto? Quale solo la password?**

> **Risposta:**
> - **RADIUS:** cifra **solo la password** nel pacchetto — il resto dei dati viaggia in chiaro.
> - **TACACS+:** cifra **l'intero pacchetto** — molto più sicuro per la gestione dei dispositivi.

---

**Q18. Per autenticare admin SSH ai router dello SNOC, useresti RADIUS o TACACS+?**

> **Risposta:**
> **TACACS+**, perché:
> 1. Cifra l'intero pacchetto (più sicuro per credenziali admin)
> 2. Separa Authentication, Authorization e Accounting — permette di definire permessi granulari per ogni tecnico (chi può fare cosa su ogni dispositivo)
> 3. È il protocollo Cisco preferito per la gestione dei device di rete

---

**Q19. WPA2-Enterprise autentica tramite quale protocollo + quale server?**

> **Risposta:**
> Usa il protocollo **802.1X** come framework di autenticazione, che a sua volta si appoggia a un server **RADIUS** per verificare le credenziali degli utenti.

---

**Q20. Con AAA centralizzato, quante modifiche fai se un tecnico lascia l'azienda?**

> **Risposta:**
> **Una sola modifica** — sul server AAA centrale (RADIUS o TACACS+) si disabilita o elimina l'account del tecnico. Tutti i dispositivi di rete (router, switch, AP) che si appoggiano a quel server rifiuteranno automaticamente le credenziali revocate. Senza AAA, dovresti modificare manualmente ogni singolo dispositivo.

---
---

## PARTE 2 — QCM (Scelta Multipla)

*Scegli la risposta corretta. Le risposte sono alla fine del documento.*

---

**QCM 1.** Quale versione di SNMP cifra l'intero pacchetto di monitoraggio?
- A) SNMPv1
- B) SNMPv2c
- C) SNMPv3 con livello noAuthNoPriv
- D) SNMPv3 con livello authPriv

---

**QCM 2.** Su quale porta UDP lavora il MIB Browser per le query SNMP?
- A) UDP 69
- B) UDP 161
- C) UDP 162
- D) TCP 443

---

**QCM 3.** Qual è la differenza principale tra Trap e Inform in SNMP?
- A) Le Trap usano TCP, gli Inform usano UDP
- B) Gli Inform richiedono un ACK di conferma, le Trap no
- C) Le Trap sono solo per SNMPv3, gli Inform per SNMPv2c
- D) Non c'è differenza, sono sinonimi

---

**QCM 4.** Quale protocollo IPSec fornisce sia autenticazione che cifratura?
- A) AH (Authentication Header)
- B) ESP (Encapsulating Security Payload)
- C) GRE (Generic Routing Encapsulation)
- D) IKE (Internet Key Exchange)

---

**QCM 5.** Perché si usa GRE insieme a IPSec?
- A) Perché IPSec non supporta IPv6
- B) Perché GRE aggiunge la cifratura mancante a IPSec
- C) Perché IPSec da solo non trasporta traffico multicast/routing dinamico
- D) Perché GRE è più veloce di IPSec

---

**QCM 6.** Cisco AnyConnect è:
- A) Una VPN Site-to-Site basata su IPSec
- B) Una VPN Remote Access basata su SSL/TLS
- C) Un protocollo di routing dinamico
- D) Un tool di monitoraggio SNMP

---

**QCM 7.** Quale protocollo di sicurezza Wi-Fi è considerato "rotto" e non deve mai essere usato?
- A) WPA3
- B) WPA2
- C) WEP
- D) 802.1X

---

**QCM 8.** WPA2-Enterprise si differenzia da WPA2-Personal perché:
- A) Usa AES invece di TKIP
- B) Ogni utente ha credenziali individuali verificate da un server RADIUS
- C) Non richiede password
- D) Funziona solo in reti cablate

---

**QCM 9.** Quale protocollo AAA usa TCP porta 49 e cifra l'intero pacchetto?
- A) RADIUS
- B) TACACS+
- C) Kerberos
- D) LDAP

---

**QCM 10.** Un tecnico si dimette. Con AAA centralizzato, cosa devi fare?
- A) Aggiornare le credenziali su ogni router e switch manualmente
- B) Revocare le credenziali solo sul server AAA centrale
- C) Cambiare la password di tutti gli utenti
- D) Spegnere e riaccendere tutti i dispositivi

---

**QCM 11.** Cosa fa la "A" di Accounting in AAA?
- A) Verifica l'identità dell'utente
- B) Definisce i permessi dell'utente
- C) Registra le azioni eseguite dall'utente
- D) Cifra il traffico dell'utente

---

**QCM 12.** Quale OID corrisponde al hostname (sysName) del router?
- A) `.1.3.6.1.2.1.1.1.0`
- B) `.1.3.6.1.2.1.1.3.0`
- C) `.1.3.6.1.2.1.1.5.0`
- D) `.1.3.6.1.2.1.2.1.0`

---

**QCM 13.** In IPSec, cosa fa la Fase 1 (IKE)?
- A) Cifra il traffico dati dell'utente
- B) I router si autenticano e negoziano un canale sicuro
- C) Crea il tunnel GRE
- D) Assegna gli indirizzi IP al tunnel

---

**QCM 14.** Quale algoritmo di cifratura usa WPA2?
- A) RC4
- B) TKIP
- C) AES-CCMP
- D) DES

---

**QCM 15.** Per autenticare tecnici che accedono via SSH ai router aziendali, il protocollo AAA preferito è:
- A) RADIUS, perché usa UDP ed è più veloce
- B) TACACS+, perché cifra tutto e separa autenticazione da autorizzazione
- C) WPA2-Enterprise, perché è lo standard IEEE
- D) SNMPv3, perché supporta authPriv

---

## ✅ RISPOSTE QCM

| N° | Risposta | Motivazione rapida |
|---|---|---|
| 1 | **D** | authPriv = auth SHA + priv AES |
| 2 | **B** | UDP 161 per query, UDP 162 per Traps |
| 3 | **B** | Inform = ACK richiesto, Trap = fire & forget |
| 4 | **B** | ESP cifra + autentica. AH autentica solo |
| 5 | **C** | IPSec non trasporta multicast → serve GRE |
| 6 | **B** | AnyConnect = Remote Access + SSL/TLS |
| 7 | **C** | WEP craccabile in minuti, mai usare |
| 8 | **B** | Enterprise = 802.1X + RADIUS, credenziali individuali |
| 9 | **B** | TACACS+ = TCP 49, pacchetto cifrato interamente |
| 10 | **B** | AAA centralizzato = un'unica modifica sul server |
| 11 | **C** | Accounting = log di tutte le azioni |
| 12 | **C** | sysName = `.1.3.6.1.2.1.1.5.0` |
| 13 | **B** | Fase 1 IKE = autenticazione + negoziazione chiavi |
| 14 | **C** | WPA2 = AES-CCMP |
| 15 | **B** | TACACS+ per gestione device Cisco |

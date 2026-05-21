# QCM CCNA — IP Services, VPN & Security Avanzata

**Argomenti:** SNMP · IPSec/VPN · Wireless Security (WPA2/WPA3) · AAA/RADIUS/TACACS+
**Formato:** Scelta multipla (A/B/C/D)
**Le risposte con motivazione sono in fondo al documento.**

---

## 📡 Sezione 1: SNMP

**Q1.** Quale versione di SNMP cifra l'intero pacchetto di monitoraggio?
- A) SNMPv1
- B) SNMPv2c
- C) SNMPv3 — noAuthNoPriv
- D) SNMPv3 — authPriv

---

**Q2.** Qual è la differenza principale tra Trap e Inform in SNMP?
- A) Le Trap usano TCP, gli Inform usano UDP
- B) Gli Inform richiedono un ACK di conferma, le Trap no
- C) Le Trap sono solo per SNMPv3
- D) Non c'è differenza, sono sinonimi

---

**Q3.** Su quale porta UDP lavora il MIB Browser per le query SNMP?
- A) UDP 69
- B) UDP 161
- C) UDP 162
- D) TCP 443

---

**Q4.** Hai un router con `snmp-server community public RW`. Cosa consente questa configurazione a chiunque conosca la community?
- A) Solo leggere le informazioni di sistema
- B) Leggere e modificare la configurazione del router
- C) Accedere alla CLI del router via SSH
- D) Inviare Traps al server di monitoraggio

---

**Q5.** Cos'è un OID in SNMP?
- A) Il nome del server di monitoraggio
- B) L'indirizzo IP dell'Agent SNMP
- C) Il numero di targa univoco di una variabile nella MIB
- D) Il protocollo usato per cifrare le query SNMP

---

## 🔐 Sezione 2: VPN e IPSec

**Q6.** Quale protocollo IPSec fornisce sia autenticazione che cifratura?
- A) AH (Authentication Header)
- B) ESP (Encapsulating Security Payload)
- C) GRE (Generic Routing Encapsulation)
- D) IKE (Internet Key Exchange)

---

**Q7.** Perché si usa GRE insieme a IPSec?
- A) Perché IPSec non supporta IPv6
- B) Perché GRE aggiunge la cifratura mancante a IPSec
- C) Perché IPSec da solo non trasporta traffico multicast/routing dinamico (es. OSPF)
- D) Perché GRE è più veloce di IPSec

---

**Q8.** Cisco AnyConnect è:
- A) Una VPN Site-to-Site basata su IPSec
- B) Una VPN Remote Access basata su SSL/TLS
- C) Un protocollo di routing dinamico
- D) Un tool di monitoraggio SNMP

---

**Q9.** In IPSec, cosa fa la Fase 1 (IKE)?
- A) Cifra il traffico dati dell'utente
- B) I router si autenticano e negoziano un canale sicuro
- C) Crea il tunnel GRE
- D) Assegna gli indirizzi IP al tunnel

---

**Q10.** Qual è la differenza tra Site-to-Site e Remote Access VPN?
- A) Site-to-Site usa SSL, Remote Access usa IPSec
- B) Site-to-Site connette sedi fisse, Remote Access connette singoli utenti remoti
- C) Site-to-Site è temporaneo, Remote Access è permanente
- D) Non c'è differenza pratica tra i due tipi

---

## 📶 Sezione 3: Wireless Security

**Q11.** Quale protocollo di sicurezza Wi-Fi è considerato "rotto" e non deve mai essere usato?
- A) WPA3
- B) WPA2
- C) WEP
- D) 802.1X

---

**Q12.** WPA2-Enterprise si differenzia da WPA2-Personal perché:
- A) Usa AES invece di TKIP
- B) Ogni utente ha credenziali individuali verificate da un server RADIUS
- C) Non richiede password
- D) Funziona solo in reti cablate

---

**Q13.** Quale algoritmo di cifratura usa WPA2?
- A) RC4
- B) TKIP
- C) AES-CCMP
- D) DES

---

**Q14.** Cosa introduce WPA3 rispetto a WPA2?
- A) Sostituisce AES con RC4 per maggiore velocità
- B) Introduce SAE (Simultaneous Authentication of Equals) che elimina gli attacchi offline
- C) Rimuove la necessità di una password
- D) Funziona solo con dispositivi Cisco

---

**Q15.** In un'azienda con 200 dipendenti, quale modalità Wi-Fi è preferibile?
- A) WPA2-Personal, perché è più semplice da gestire
- B) WEP, perché è compatibile con tutti i dispositivi
- C) WPA2-Enterprise, perché ogni utente ha credenziali individuali revocabili
- D) Nessuna cifratura, perché la rete aziendale è già protetta dal firewall

---

## 🔑 Sezione 4: AAA, RADIUS, TACACS+

**Q16.** Quale protocollo AAA usa TCP porta 49 e cifra l'intero pacchetto?
- A) RADIUS
- B) TACACS+
- C) Kerberos
- D) LDAP

---

**Q17.** Cosa fa la "A" di Accounting in AAA?
- A) Verifica l'identità dell'utente
- B) Definisce i permessi dell'utente
- C) Registra le azioni eseguite dall'utente
- D) Cifra il traffico dell'utente

---

**Q18.** Per autenticare tecnici che accedono via SSH ai router aziendali, il protocollo AAA preferito è:
- A) RADIUS, perché usa UDP ed è più veloce
- B) TACACS+, perché cifra tutto e separa autenticazione da autorizzazione
- C) WPA2-Enterprise
- D) SNMPv3

---

**Q19.** Con AAA centralizzato, se un tecnico si dimette, cosa devi fare?
- A) Aggiornare le credenziali su ogni router e switch manualmente
- B) Revocare le credenziali solo sul server AAA centrale
- C) Cambiare la password di tutti gli utenti
- D) Riavviare tutti i dispositivi

---

**Q20.** WPA2-Enterprise autentica gli utenti Wi-Fi tramite:
- A) Una password condivisa (PSK) e un firewall
- B) Il protocollo 802.1X con un server RADIUS esterno
- C) Il protocollo TACACS+ con autenticazione SHA
- D) Un certificato digitale gestito direttamente dall'Access Point

---

## ✅ Risposte con Motivazione

| N° | Risposta | Motivazione |
|---|---|---|
| Q1 | **D** | authPriv = SHA (autenticazione) + AES (cifratura) — unico livello che cifra tutto |
| Q2 | **B** | Inform = ACK richiesto. Trap = fire & forget, se il pacchetto si perde l'NMS non lo sa |
| Q3 | **B** | UDP 161 per query. UDP 162 è per Traps/Informs (notifiche spontanee) |
| Q4 | **B** | Community RW = lettura E scrittura → può modificare la config del router |
| Q5 | **C** | OID = Object Identifier, il "numero di targa" di ogni variabile nella MIB |
| Q6 | **B** | ESP cifra + autentica. AH autentica solo, non cifra il contenuto |
| Q7 | **C** | IPSec non trasporta multicast → OSPF non funziona nel tunnel senza GRE |
| Q8 | **B** | AnyConnect = Remote Access VPN basata su SSL/TLS, non IPSec |
| Q9 | **B** | Fase 1 IKE = autenticazione reciproca + negoziazione chiavi e algoritmi |
| Q10 | **B** | Site-to-Site = sedi fisse sempre connesse. Remote Access = utente mobile |
| Q11 | **C** | WEP craccabile in minuti con tool gratuiti. Non usare mai |
| Q12 | **B** | Enterprise = 802.1X + RADIUS, credenziali individuali per ogni utente |
| Q13 | **C** | WPA2 = AES-CCMP. WEP/WPA usano RC4/TKIP (insicuri e deprecati) |
| Q14 | **B** | SAE elimina la vulnerabilità agli attacchi dizionario offline di WPA2 |
| Q15 | **C** | Enterprise: un dipendente lascia → si revoca solo il suo account sul RADIUS |
| Q16 | **B** | TACACS+ = TCP 49, cifra l'intero pacchetto. RADIUS usa UDP e cifra solo la password |
| Q17 | **C** | Accounting = log completo di chi ha fatto cosa e quando (fondamentale per audit SNOC) |
| Q18 | **B** | TACACS+ per device management: cifratura totale + granularità dei permessi per comando |
| Q19 | **B** | AAA centralizzato = 1 modifica sul server, tutti i dispositivi la recepiscono automaticamente |
| Q20 | **B** | 802.1X è il framework di autenticazione, RADIUS è il server che verifica le credenziali |

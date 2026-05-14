# Lab CCNA: Monitoraggio Proattivo (NTP e Syslog)

*🎯 **Obiettivo:** Trasformare un router "isolato" in un apparato monitorato professionalmente, garantendo che ogni evento sia registrato con la data e l'ora esatta.*

---

## 1. Topologia del Lab
Configura in PNETLab o Packet Tracer:
*   **Router (R1):** Il cuore della nostra sede.
*   **Server (SRV-SNOC):** Un server che simula il centro di monitoraggio Sorint.
    *   IP Router (Gi0/0): `10.0.0.1/24`
    *   IP Server: `10.0.0.100/24`

---

## 2. Fase 1: Il Caos Temporale
Prima di iniziare, guarda quanto è confuso il tuo router.
Comando: `show clock`

> 🚩 **Problema:** Probabilmente vedrai una data come *March 1, 1993*. Se succede un guasto ora, i tuoi log diranno che è successo 30 anni fa. Inaccettabile in uno SNOC!

---

## 3. Fase 2: Configurazione NTP (L'Orologio)
Impostiamo il server come sorgente temporale.

**Su R1:**
```text
configure terminal
! Impostiamo il server come riferimento
ntp server 10.0.0.100
! (Opzionale) Impostiamo il fuso orario italiano
clock timezone CET 1
clock summer-time CEST recurring
exit
```

**Verifica:**
*   `show ntp status`: Cerca la scritta **"Clock is synchronized"**. (Potrebbe volerci qualche minuto, l'NTP è un protocollo "calmo").
*   `show ntp associations`: Vedrai un asterisco `*` accanto all'IP del server quando sono sincronizzati.

---

## 4. Fase 3: Configurazione Syslog (Il Diario)
Ora diciamo al router di mandare i suoi messaggi al server.

**Su R1:**
```text
configure terminal
! Abilitiamo l'invio dei log al server
logging host 10.0.0.100
! Fondamentale: includi data e ora precisa in ogni riga di log
service timestamps log datetime msec
! Scegliamo cosa inviare (livello 5 - Notifications e superiori)
logging trap notifications
exit
```

---

## 5. Fase 4: "Il Test del Crimine"
Adesso simuliamo un guasto e vediamo se lo SNOC se ne accorge.

1.  **Genera l'evento:**
    ```text
    interface GigabitEthernet 0/1
    shutdown
    no shutdown
    ```
2.  **Controlla i log:**
    *   `show logging`: Guarda le ultime righe. 
    *   **Cosa dovresti vedere:** Una riga che dice `%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to administratively down` con l'orario **esatto** di oggi!

---

## 💡 Trucco da Senior SNOC
Se durante il turno vedi dei log che iniziano con un asterisco `*` o un punto `.` (es: `*.Mar 1 00:00:23`), significa che **l'NTP non è sincronizzato**. 
*   `*` = L'ora è impostata manualmente ma non sincronizzata via NTP.
*   `.` = L'NTP era sincronizzato ma ha perso il segnale.

**Messaggio per il tuo mentor:** *"Ho notato che alcuni apparati hanno il punto accanto ai timestamp dei log, potrei controllare se i server NTP aziendali sono raggiungibili da quelle zone di rete?"* (Punti bonus assicurati! 🚀)

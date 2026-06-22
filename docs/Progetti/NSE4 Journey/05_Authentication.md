# Lesson 5: Firewall Authentication

L'autenticazione permette di creare policy "Identity-Based", autorizzando non solo l'IP, ma il singolo utente o gruppo.

## Autenticazione Attiva vs Passiva
- **Autenticazione Attiva:** Richiede un intervento diretto dell'utente (es. *Captive Portal* che mostra un popup o una pagina web per l'inserimento di username e password).
- **Autenticazione Passiva:** Trasparente per l'utente. Esempio classico è l'**FSSO (Fortinet Single Sign-On)** che cattura i log di login dai Domain Controller di Active Directory.

## Server di Autenticazione
- **Utenti Locali:** Creati direttamente sul database del FortiGate.
- **Server Esterni:** Il FortiGate interroga un database aziendale.
  - *LDAP:* Perfetto per l'integrazione con Microsoft Active Directory.
  - *RADIUS:* Usato spesso per accessi WiFi, VPN o autenticazione 2FA complessa.

## Two-Factor Authentication (2FA)
- FortiGate supporta il *FortiToken* (Fisico o Mobile Push).
- Di default il FortiGate include 2 licenze FortiToken gratuite.
- L'orario (NTP) deve essere perfettamente sincronizzato affinché il token generi codici validi.

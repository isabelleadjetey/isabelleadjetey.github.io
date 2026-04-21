# Recap CCNA: Security Device Hardening (5.3 & 5.4)

Questo documento copre le basi della messa in sicurezza del router/switch stesso. Nello SNOC, prima di proteggere i dati del cliente, bisogna assicurarsi che nessuno possa "bucare" l'interfaccia di gestione degli apparati.

---

## 1. L'Analogia: La "Cassaforte nel Bunker"
Non serve a nulla avere un bunker impenetrabile se la chiave della cassaforte è appesa alla porta con scritto "1234".
*   **Device Hardening:** È il processo di cambiare le serrature di default, criptare le combinazioni e assicurarsi che solo chi ha l'impronta digitale giusta possa entrare nella stanza dei bottoni.

---

## 2. Password Security: Secret vs Password
Cisco offre due modi per proteggere l'accesso alla modalità privilegiata (`enable`).
*   `enable password`: **INSICURO.** Viene salvata in chiaro o con una cifratura debole (Type 0 o 7).
*   `enable secret`: **SICURO.** Viene salvata con un hash (Type 5 o superiore) impossibile da decifrare.

### La Ricetta: Criptare tutto
Anche se scrivi una password, devi assicurarti che non sia leggibile se qualcuno guarda sopra la tua spalla mentre fai un `show run`.
```text
service password-encryption   <-- Cripta tutte le password in chiaro nel file di config.
enable secret SorintLab2024!  <-- Usa sempre 'secret', mai 'password'.
```

---

## 3. Remote Access: Dire addio a Telnet (SSH)
Telnet invia tutto (comandi e password) in chiaro. Nello SNOC è **vietatissimo**. Usiamo solo **SSH** (Secure Shell), che cripta l'intera sessione.

### Configurazione SSH Passo dopo Passo
```text
! 1. Imposta un nome dominio (necessario per generare le chiavi)
ip domain-name sorint.it

! 2. Genera le chiavi crittografiche RSA (minimo 1024 bit)
crypto key generate rsa
 (scegli 1024 o 2048)

! 3. Crea un utente locale con privilegi
username federico privilege 15 secret SuperSecretPassword!

! 4. Configura le linee virtuali (VTY) per accettare solo SSH
line vty 0 4
 login local               <-- Usa l'utente creato sopra
 transport input ssh       <-- BLOCCA Telnet e permette solo SSH
```

---

## 4. Banner e Protezione Brute Force
È importante scoraggiare gli intrusi e rallentare chi prova a indovinare le password.
*   **Banner MOTD:** Fornisce un avviso legale (importante in caso di azioni legali).
*   **Login Block:** Blocca gli accessi se qualcuno fallisce troppe volte.

```text
banner motd # ACCESSO RISERVATO - TUTTI GLI ACCESSI SONO MONITORATI #

! Blocca gli accessi per 3 minuti se falliscono 3 tentativi in 60 secondi
login block-for 180 attempts 3 within 60
```

---

## 5. I Ferri del Mestiere (Troubleshooting)
1.  **`show run | include password`**: Per vedere se ci sono password rimaste in chiaro.
2.  **`show ip ssh`**: Per verificare che la versione 2 di SSH sia attiva.
3.  **`show line vty 0 4`**: Per controllare chi è collegato al router in questo momento.

---

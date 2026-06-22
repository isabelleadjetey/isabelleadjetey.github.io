# Lesson 3: Firewall Policies

## Logica di Matching
- **Top to Bottom:** Le regole vengono lette dall'alto verso il basso (in base alla *Sequence*, non al Policy ID). Appena si trova una corrispondenza, l'azione viene applicata e la lettura si ferma.
- **Criteri di Match:** Affinché una regola faccia "match", devono coincidere *tutti* questi elementi:
  1. Incoming Interface
  2. Outgoing Interface
  3. Source (IP, FSSO User, ISDB)
  4. Destination (IP, VIP, ISDB)
  5. Service (Porta/Protocollo)
  6. Schedule (Orario)
- **Implicit Deny:** La regola invisibile in fondo alla lista che blocca tutto il traffico non esplicitamente permesso.

## Internet Service Database (ISDB)
- Permette di creare regole basate su servizi cloud noti (es. "Office 365", "Netflix") usando indirizzi IP e porte gestite dinamicamente da FortiGuard.
- Lavora a Layer 3 e Layer 4 (più leggero dell'Application Control che è Layer 7).
- Non richiede licenze aggiuntive.

## Funzionalità Aggiuntive
- **Multiple Interface Policies:** Feature da abilitare nella GUI per permettere l'inserimento di più interfacce d'ingresso/uscita o la voce "Any" nella stessa regola.
- **Security Profiles:** Possono essere applicati solo se l'azione della policy è "Accept". Ispezionano il contenuto (Antivirus, Web Filter, ecc.) tramite approccio *Flow-based* o *Proxy-based*.

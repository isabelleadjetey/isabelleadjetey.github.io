# Lesson 8: Web Filtering

## Categorie FortiGuard e Azioni
FortiGuard analizza in tempo reale e categorizza i domini web. Per ogni categoria possiamo applicare un'azione:
- **Allow:** Permetti.
- **Monitor:** Permetti ma registra nei log.
- **Block:** Blocca la pagina.
- **Warning:** Mostra un avviso; l'utente può scegliere di continuare a suo rischio.
- **Authenticate:** Richiede login per accedere a quella specifica categoria.

## Flow-based vs Proxy-based
- **Flow-based:** Più veloce, non bufferizza file interi. Le azioni come *Warning* e *Authenticate* non sono sempre disponibili o sono limitate senza proxy.
- **Proxy-based:** Il FortiGate si mette in mezzo e termina le connessioni TCP. Più lento e usa più risorse, ma permette controlli più profondi e l'uso di timer (Quote) per la navigazione.

## Altre Feature
- **DNS Filtering:** Intercetta e blocca la query DNS prima ancora che inizi la richiesta HTTP/HTTPS. È leggerissimo e blocca sul nascere le richieste verso domini malevoli. Il FortiGate controlla la cache e/o interroga i server FortiGuard.
- **Web Content Filter:** Blocca pattern o parole specifiche all'interno della pagina (richiede Deep SSL Inspection se il sito è HTTPS).
- **Overrides:** Permette di sbloccare o bloccare uno specifico URL ignorando la sua categoria globale.

# Lesson 7: Certificate Operations

I certificati in FortiOS servono principalmente per 3 compiti:
1. **Inspection:** Ispezionare il traffico SSL/TLS.
2. **Privacy:** Criptare tunnel (es. VPN).
3. **Authentication:** Autenticare admin o utenti senza password.

## SSL Inspection
Visto che il traffico moderno è HTTPS (cifrato), i virus e le minacce passano indisturbati se il firewall non decifra il pacchetto.

- **Full SSL Inspection (Deep Inspection):**
  - Il FortiGate agisce da proxy (Man-in-the-Middle).
  - Termina la sessione col server, decifra il contenuto, lo ispeziona (Antivirus/IPS), lo ricifra usando un certificato "generato al volo" e lo invia al client.
  - Affinché il client (browser) non dia errore di sicurezza, deve avere installato la **Root CA** del FortiGate tra le sue Autorità di Certificazione Attendibili (operazione solitamente fatta via GPO aziendale).

- **SSL Certificate Inspection:**
  - Non decifra il pacchetto e non fa Man-in-the-Middle.
  - Si limita ad ascoltare la fase di handshake in chiaro (Client Hello e Server Certificate).
  - Legge l'**SNI (Server Name Indication)** inviato dal client e il **CN (Common Name)** sul certificato del server per capire a quale sito si sta accedendo e applicare eventuali blocchi di Web Filtering.

## Verifica Validità
Il firewall verifica che il certificato: non sia scaduto, sia firmato da una CA fidata e non sia revocato controllando le **CRL (Certificate Revocation List)** o tramite query **OCSP (Online Certificate Status Protocol)**.

# Lesson 9: Application Control

## Concetto
Diversamente dal Web Filtering (che blocca in base a URL o Categorie Web), l'Application Control blocca o monitora le applicazioni **in base al loro comportamento o alla loro signature**, indipendentemente dalla porta o dall'URL che usano.
Esempio: Bloccare l'applicazione "BitTorrent" o l'applicazione "Skype", anche se tentano di usare la porta 80.

## Come Funziona
- Funziona sempre e solo in modalità **Flow-Based** perché utilizza l'**IPS Engine** del FortiGate per analizzare le firme (signature) dei pacchetti.
- Richiede la **SSL Inspection (Deep Inspection)** per funzionare sulle applicazioni cifrate (es. bloccare solo i messaggi di WhatsApp ma non WhatsApp Web intero), altrimenti vede solo traffico TLS generico.

## Utilizzi Pratici
- Evitare il traffico P2P (Peer to Peer).
- Applicare *Traffic Shaping* per limitare la banda consumata da applicazioni specifiche (es. limitare YouTube a 2 Mbps).
- Bloccare traffico anonimizzatore (es. Tor, Proxy Server).

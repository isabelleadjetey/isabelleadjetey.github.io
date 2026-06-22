# Missione 1: La Rete "Guest" Blindata

## Lo Scenario Aziendale
Il tuo capo ti ha chiesto di prendere il PC della sala d'attesa (la tua macchina virtuale **Lubuntu** collegata alla `port2`) e configurarlo come "Rete Ospiti". Gli ospiti devono poter navigare su Internet, ma con delle restrizioni precise, e il traffico deve uscire con un indirizzo IP pubblico diverso da quello aziendale principale.

## I tuoi Task da completare sul FortiGate:

### 1. Oggetti e NAT (IP Pool)
*   **Address Object:** Crea un oggetto chiamato `PC_Ospite` con l'indirizzo IP del tuo Lubuntu (es. 10.0.0.2).
*   **SNAT Avanzato (IP Pool):** Crea un oggetto **IP Pool** (tipo *Overload*) usando un IP a tua scelta sulla rete della tua WAN, ad esempio `192.168.1.200` (assicurati che sia libero nella tua rete locale).

### 2. Sicurezza (Security Profiles)
*   **Web Filter:** Crea un nuovo profilo chiamato `Ospiti_Web` e imposta l'azione su **Block** per l'intera categoria *Social Networking* (Facebook, X, ecc.).
*   **Application Control:** Crea un nuovo profilo chiamato `Ospiti_App` e cerca l'applicazione *YouTube*, impostandola su **Block**.

### 3. Firewall Policy
Crea una nuova policy (o modifica quella esistente) per far uscire il `PC_Ospite` verso Internet:
*   **NAT:** NON usare "Use Outgoing Interface Address". Seleziona "Use Dynamic IP Pool" e scegli l'IP Pool creato nel Task 1.
*   **Security Profiles:** Applica i due profili creati (`Ospiti_Web` e `Ospiti_App`).
*   **Inspection:** Assicurati che SSL Inspection sia su `certificate-inspection`.
*   **Logging:** Imposta Log Allowed Traffic su `All Sessions`.

## L'Obiettivo Finale (Il Test)
Una volta configurato tutto, vai sulla macchina virtuale Lubuntu e apri il browser:
1.  Cerca su Google "Wikipedia": **DEVE FUNZIONARE**.
2.  Prova ad andare su `facebook.com` o `youtube.com`: **DEVI ESSERE BLOCCATO** dalla pagina FortiGuard.
3.  Vai su un sito come `https://www.mio-ip.it` per verificare con quale IP pubblico stai uscendo su Internet. Deve mostrare l'IP che hai inserito nell'IP Pool (es. 192.168.1.200), e NON l'IP principale del firewall.

Buon lavoro!

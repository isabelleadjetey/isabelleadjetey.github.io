# Recap CCNA: VPN Concepts & Fundamentals (5.5)

Le VPN (Virtual Private Networks) sono la tecnologia che permette alle aziende di far comunicare le proprie sedi o i propri dipendenti remoti usando Internet come se fosse un cavo privato e sicuro.

---

## 1. L'Analogia: Il "Tunnel Invisibile"
Immagina di voler mandare una lettera segreta attraversando una piazza affollatissima (Internet).
*   **Senza VPN:** Chiunque nella piazza può intercettare la lettera e leggerla.
*   **Con VPN:** È come se costruissi un tunnel sotterraneo blindato che attraversa la piazza. Tu vedi la folla, ma nessuno può vedere cosa passa dentro il tunnel.

---

## 2. Tipologie di VPN

### A. Site-to-Site VPN (Sede-a-Sede)
Collega intere reti tra loro. I router alle due estremità si occupano di tutto.
*   **Esempio:** La sede di Sorint Lab (Milano) collegata alla sede di un cliente (Roma).
*   **Tecnologia:** Solitamente si usa **IPsec**.

### B. Remote Access VPN (Lavoro Agile)
Collega un singolo dispositivo alla rete aziendale.
*   **Esempio:** Tu da casa che usi il PC per collegarti ai server dell'ufficio.
*   **Tecnologia:** Solitamente si usa **AnyConnect** (SSL/TLS) o IPsec nel client.

---

## 3. I Pilastri di IPsec (L'Armatura del Tunnel)
Per essere sicuro, un tunnel IPsec deve garantire 4 cose:
1.  **Confidenzialità:** Nessuno può leggere i dati (Crittografia: AES, DES, 3DES).
2.  **Integrità:** I dati non sono stati manomessi durante il viaggio (Hashing: SHA-1, SHA-256).
3.  **Autenticazione:** Sono sicuro di parlare con chi dico di parlare (Certificati o PSK - Pre-Shared Key).
4.  **Anti-Replay:** Nessuno può intercettare un pacchetto e rinviarlo per "imitare" un utente legittimo.

---

## 4. IPsec vs GRE: La differenza che conta
*   **GRE (Generic Routing Encapsulation):** È bravo a creare tunnel, ma **non cripta nulla**. Però permette di far passare il traffico di routing (come OSPF).
*   **IPsec:** È il re della crittografia, ma non ama il traffico multicast (routing).
*   **La Soluzione SNOC:** Spesso si usa **GRE over IPsec**. GRE crea il tunnel e permette il routing, IPsec avvolge tutto e lo cripta. È il "match perfetto".

---

## 5. Terminologia da SNOC
*   **Public IP:** L'indirizzo "esterno" dei due router che creano il tunnel.
*   **Private Segment:** Le reti locali (es. 192.168.10.0/24) che devono parlare tra loro attraverso il tunnel.
*   **Tunnel Interface:** L'interfaccia "virtuale" che il tecnico vede sul router per gestire il traffico VPN.

---

# VPN Specialization: Road to SNOC Operations 🛡️

Questo piano di studio è focalizzato sull'approfondimento delle tecnologie VPN (Virtual Private Network), con un'enfasi particolare sugli standard industriali richiesti per lavorare in un Security Network Operations Center (SNOC).

---

## 📅 Fase 1: Fondamenta della Criptografia (Teoria)
Per capire le VPN, bisogna capire come vengono protetti i dati.
*   [ ] **Criptazione Simmetrica vs Asimmetrica**: Differenza tra AES (veloce) e RSA (scambio chiavi).
*   [ ] **Hashing (Integrità)**: Comprendere algoritmi come SHA-256 e MD5 per la verifica dei dati.
*   [ ] **Autenticazione**: Uso di Pre-Shared Keys (PSK) e Certificati Digitali.

## 📅 Fase 2: Il Protocollo IPsec (Deep Dive)
IPsec è lo standard per le VPN Site-to-Site.
*   [ ] **IKE (Internet Key Exchange)**:
    *   **Fase 1 (ISAKMP)**: Creazione del canale sicuro tra i router (Policy, DH Group).
    *   **Fase 2 (IPsec SA)**: Creazione del tunnel per i dati degli utenti (Transform Set).
*   [ ] **AH vs ESP**: Perché ESP (Encapsulating Security Payload) è il protocollo preferito (offre criptazione, AH no).
*   [ ] **Tunnel vs Transport Mode**: Quando si usa l'uno o l'altro.

## 📅 Fase 3: Tipologie di VPN Enterprise
*   [ ] **Site-to-Site VPN**: Collegamento tra due uffici tramite Router Cisco.
*   [ ] **Remote Access VPN (AnyConnect)**: Introduzione all'accesso SSL/TLS per gli utenti remoti.
*   [ ] **GRE over IPsec**: Come trasportare il traffico di routing (OSPF/EIGRP) all'interno di un tunnel sicuro.

## 📅 Fase 4: Troubleshooting Operativo (SNOC Skills)
La capacità più richiesta in uno SNOC è capire *perché* una VPN non funziona.
*   [ ] **Show Commands**:
    *   `show crypto isakmp sa`: Verifica della Fase 1.
    *   `show crypto ipsec sa`: Verifica della Fase 2 e conteggio dei pacchetti criptati.
*   [ ] **Debug Commands**:
    *   `debug crypto isakmp`: Analisi della negoziazione (mismatch di password o algoritmi).

---

### 🚀 Obiettivo Finale: Il Laboratorio VPN
Creare un tunnel IPsec Site-to-Site tra due router in PNETLab, far passare il traffico OSPF al suo interno e simulare un guasto per analizzare i log di errore.

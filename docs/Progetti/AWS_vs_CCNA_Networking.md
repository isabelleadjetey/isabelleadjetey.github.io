# CCNA vs AWS: Il Ponte Tecnico

Se capisci come funziona un router Cisco, hai già capito l'80% del networking di AWS. Devi solo imparare i "nomi nuovi" che Amazon dà alle stesse vecchie tecnologie.

---

## 🏗️ Infrastruttura: Dallo Switch alla VPC

| Concetto CCNA (Fisico) | Concetto AWS (Cloud) | Descrizione |
| :--- | :--- | :--- |
| **Data Center / Sede** | **VPC (Virtual Private Cloud)** | Il tuo recinto privato e isolato dentro AWS. |
| **VLAN / Subnet** | **Subnet (Public/Private)** | Fette della VPC. In AWS le subnet sono sempre associate a una **Availability Zone (AZ)**. |
| **Router Fisico** | **Implicit Router / Route Table** | In AWS ogni subnet ha una tabella di routing "virtuale" che decide dove mandare i pacchetti. |
| **IP Pubblico** | **Elastic IP / Public IP** | L'indirizzo visibile su Internet. |

---

## 🔐 Sicurezza: Dai "Buttafuori" ai Security Groups

Questa è la parte dove molti sbagliano, ma per te sarà semplice:

*   **Network ACL (NACL) ≈ ACL Estese di Cisco:** 
    *   Sono **Stateless** (devi permettere il traffico sia in entrata che in uscita).
    *   Si applicano all'intera **Subnet**.
    *   Hanno regole numerate (100, 200, ecc.).

*   **Security Groups (SG) ≈ Firewall Stateful:**
    *   Sono **Stateful** (se permetti l'entrata, l'uscita è permessa automaticamente).
    *   Si applicano alla **singola istanza (EC2)**, non alla rete.
    *   Funzionano solo con permessi "Allow" (non esiste il "Deny" esplicito, tutto ciò che non è permesso è bloccato).

---

## 🌐 Connettività Esteriore

*   **Internet Gateway (IGW):** È il tuo **Edge Router** (il router che ti collega all'ISP). Senza IGW, la tua VPC è un'isola deserta.
*   **Virtual Private Gateway (VGW):** È il lato AWS della tua **VPN Site-to-Site**.
*   **Direct Connect:** È l'equivalente di una **Linea Dedicata** (MPLS) in cui stendi un cavo fisico tra il tuo ufficio e il data center di AWS.

---

## ⚡ Route 53 e CloudFront

*   **Route 53:** È semplicemente il **Server DNS** di AWS. Si chiama "53" perché il DNS usa la porta UDP 53.
*   **CloudFront (CDN):** Immagina di avere una **Cache** distribuita in tutto il mondo. Serve a velocizzare il caricamento dei siti tenendo i dati "vicini" all'utente.

---

### 💡 ProTip d'Esame:
Quando una domanda cita la **"Shared Responsibility Model"** legata al networking:
*   AWS è responsabile dell'infrastruttura fisica (cavi, switch fisici, data center).
*   **TU** sei responsabile della configurazione (Route Tables, Security Groups, NACL).

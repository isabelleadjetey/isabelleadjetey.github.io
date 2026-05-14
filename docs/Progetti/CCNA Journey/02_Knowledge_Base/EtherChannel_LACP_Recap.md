# Recap CCNA: EtherChannel e LACP (Dominio 2)

*📚 **Riferimento di Studio:** [Jeremy's IT Lab (Day 17)](https://www.youtube.com/playlist?list=PLQQoNK6GeB_YfshLIX7YjEq946_S7xT03)*

L'**EtherChannel** è la tecnica che ci permette di raggruppare più link fisici tra due switch in un unico **link logico** (interfaccia `Port-Channel`). Serve per aumentare la banda e garantire che, se un cavo si rompe, la connessione non cada.

---

## 1. L'Analogia: "L'Unione fa la forza"
Immagina di avere due switch collegati con un solo cavo da 1Gbps. Se il traffico aumenta, la strada si intasa.
*   **Problema STP:** Se aggiungi un secondo cavo, lo Spanning Tree lo bloccherà per evitare loop. Avrai sempre solo 1Gbps utile.
*   **Soluzione EtherChannel:** "Inganniamo" lo Spanning Tree facendo credere che i due (o più) cavi siano **una sola grande autostrada**. STP vedrà un unico interfaccia logica e non bloccherà nulla. Ora hai 2Gbps di banda!

---

## 2. I Protocolli di Negoziazione
Per mettere d'accordo i due switch, usiamo dei protocolli. Ecco la sfida da esame CCNA:

| Protocollo | Proprietario | Modalità |
| :--- | :--- | :--- |
| **LACP** | Standard (IEEE) | **Active** (Inizia lui) / **Passive** (Aspetta) |
| **PAgP** | Cisco | **Desirable** (Inizia lui) / **Auto** (Aspetta) |
| **Statico** | Nessuno | **On** (Forzato, sconsigliato) |

---

## 3. La Ricetta: Configurazione LACP (Standard)
È il protocollo che userai nel 99% dei casi nello SNOC, essendo compatibile con tutti i brand.

```text
! 1. Seleziona il gruppo di interfacce fisiche
interface range GigabitEthernet 0/1 - 2

 ! 2. Assegna le porte al gruppo logico (Channel 1)
 channel-group 1 mode active

! 3. Configura l'interfaccia LOGICA appena creata
interface port-channel 1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
```

---

## 4. Le Regole d'Oro (Matching Requirements)
Se le porte non hanno parametri **identici**, l'EtherChannel non salirà mai. Devono coincidere:
*   Velocità (Speed) e Duplex.
*   Modalità (Access o Trunk).
*   VLAN consentite e Native VLAN.

---

## 5. I Ferri del Mestiere (Troubleshooting)
1.  **`show etherchannel summary`**: Il comando fondamentale. 
    *   Cerca la lettera **(P)** accanto alle interfacce: significa che sono "in bundle" e funzionano.
    *   Se vedi **(D)** (Down) o **(I)** (Independent), c'è un errore di configurazione.
2.  **`show interfaces port-channel 1`**: Per vedere quanta banda totale sta gestendo il link logico.
3.  **`show etherchannel load-balance`**: Per capire come lo switch distribuisce i pacchetti tra i vari cavi (es. in base all'IP o al MAC).

---

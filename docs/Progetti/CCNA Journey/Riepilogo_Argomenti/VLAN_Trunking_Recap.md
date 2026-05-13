# Recap CCNA: VLAN e Trunking (Dominio 2)

*📚 **Riferimento di Studio:** [Jeremy's IT Lab (Day 11 & 12)](https://www.youtube.com/playlist?list=PLQQoNK6GeB_YfshLIX7YjEq946_S7xT03)*

Questo documento riassume i concetti di segmentazione logica dello switch, fondamentali per dividere il traffico aziendale (es. Amministrazione vs Guest) senza dover comprare uno switch diverso per ogni ufficio.

---

## 1. L'Analogia: Le "Stanze della Casa"
Immagina uno switch come una grande casa.
*   **VLAN = Le Stanze:** Ogni stanza ha una porta chiusa. Anche se tutti sono sotto lo stesso tetto (lo stesso switch fisico), le persone nella Stanza 10 (VLAN 10) non possono vedere né sentire quello che succede nella Stanza 20 (VLAN 20).
*   **Trunk = Il Corridoio Comune:** Se hai due switch in due piani diversi, il "Trunk" è il corridoio che permette alle persone di passare da un piano all'altro mantenendo l'appartenenza alla propria stanza (tagging).

---

## 2. La Ricetta: Configurazione Base

### Creazione e Assegnazione (Access Port)
Le porte "Access" sono quelle dove attacchiamo i PC dei dipendenti. Possono appartenere a una sola stanza.
```text
! 1. Crea la stanza
vlan 10
 name AMMINISTRAZIONE

! 2. Entra nella porta del PC e assegnala alla stanza
interface FastEthernet 0/1
 switchport mode access
 switchport access vlan 10
```

### Il Collegamento tra Switch (Trunk Port)
Il Trunk usa il protocollo **802.1Q** per aggiungere un "tag" (un'etichetta) a ogni pacchetto, così lo switch dall'altra parte sa a quale VLAN appartiene.
```text
interface GigabitEthernet 0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20  <-- (Best practice: consenti solo le VLAN che servono)
```

---

## 3. L'Insidia: La "Native VLAN"
Di default, la **VLAN 1** è la Native VLAN. Questo significa che tutto il traffico senza etichetta (Untagged) viene buttato lì dentro.
*   **Pericolo SNOC:** Lasciare la VLAN 1 come native è un rischio di sicurezza (VLAN Hopping). È meglio spostarla su una VLAN inutilizzata.
```text
interface GigabitEthernet 0/1
 switchport trunk native vlan 999
```

---

## 4. I Ferri del Mestiere (Troubleshooting)
Se i PC in VLAN 10 non si pingano tra switch diversi, controlla questi comandi:

1.  **`show vlan brief`**: La porta `Fa0/1` è davvero nella VLAN 10? La VLAN 10 è `Active`?
2.  **`show interfaces trunk`**: È il comando più importante. Ti dice se la porta è in modalità Trunk e quali VLAN sono "Allowed and Active". 
3.  **`show vlan id 10`**: Per vedere tutti i dettagli di una singola stanza.

---

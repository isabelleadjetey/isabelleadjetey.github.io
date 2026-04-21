# Recap CCNA: BGP (Border Gateway Protocol)

Questo documento riassume le basi del protocollo che "tiene in piedi Internet". A differenza di OSPF, il BGP non serve a trovare la strada più veloce tra due switch, ma a negoziare il passaggio dei dati tra intere nazioni digitali.

---

## 1. L'Analogia: BGP = "L'Aeroporto Internazionale"
Come visto negli appunti di mentorship, se OSPF è il vigile urbano della tua città, il BGP è il **Controllo di Volo** mondiale:
*   **Gestisce Nazioni (AS):** Ogni azienda o provider è un'entità indipendente chiamata **Autonomous System (AS)** con il suo numero identificativo (**ASN**).
*   **Decide le tratte aeree:** Non gli importa se una strada è asfaltata bene (metrica), gli importa quali nazioni deve attraversare per arrivare a destinazione.
*   **È lento ma scalabile:** Un aeroporto non decolla ogni secondo come un'auto al semaforo, ma può gestire milioni di passeggeri senza mandare in tilt il sistema.

---

## 2. Il DNA del BGP: Path Vector
Il BGP è un protocollo **Path Vector**. Ecco come si posiziona rispetto agli altri che abbiamo studiato:

| Protocollo | Categoria | Cosa scambia? | Loop Prevention |
| :--- | :--- | :--- | :--- |
| **RIP** | Distance Vector | Distanza (Hop) | Timer / Split Horizon |
| **OSPF** | Link-State | Mappa dei link | Algoritmo di Dijkstra |
| **BGP** | **Path Vector** | **Lista di AS (AS-Path)** | Se vedo il mio AS nella lista, scarto la rotta |

---

## 3. eBGP vs iBGP (Voli Internazionali vs Nazionali)
Non tutto il BGP è uguale. Dipende da *chi* stai parlando:
*   **eBGP (External):** I due router appartengono ad **AS diversi** (es. Sorint parla con Vodafone). La distanza amministrativa (affidabilità) è bassissima (**20**), perché queste sono le rotte più importanti.
*   **iBGP (Internal):** I due router appartengono allo **stesso AS**. Serve a propagare le rotte esterne dentro la propria rete. La distanza amministrativa è molto alta (**200**).

---

## 4. La Ricetta: Configurazione Base
Il BGP è **paranoico**: non instaurerà mai una sessione se non glielo dici tu a mano.

```text
! 1. Entra nel processo usando il TUO AS (es. 65001)
router bgp 65001

 ! 2. Dichiara esplicitamente il tuo vicino e il SUO AS
 neighbor 192.168.1.2 remote-as 65002
 
 ! 3. Annuncia le tue reti (ATTENZIONE: La mask deve essere IDENTICA alla tabella di routing)
 network 10.0.0.0 mask 255.255.255.0
```

---

## 5. Gli Stati della sessione (La Torre di Controllo)
Prima di scambiare rotte, i router devono fare "amicizia". Segui questa sequenza nel troubleshooting:
1.  **Idle:** Il router è fermo, forse l'interfaccia è giù.
2.  **Connect:** Sta aspettando che la connessione TCP (porta 179) si apra.
3.  **Active:** **ATTENZIONE!** Nonostante il nome, è uno stato di errore. Significa che il router sta provando a connettersi ma non riceve risposta (es. configurazione neighbor sbagliata).
4.  **OpenSent / OpenConfirm:** I router si stanno scambiando i parametri.
5.  **Established:** **L'unico stato buono.** Il volo è decollato, le rotte fluiscono.

---

## 6. I Ferri del Mestiere (Troubleshooting)
Nello SNOC userai questi comandi ogni giorno:

*   **`show ip bgp summary`**: Per vedere il tabellone dei vicini. Se alla colonna `State/PfxRcd` vedi un numero, sei in Established. Se vedi del testo (es. `Active`), c'è un problema.
*   **`show ip bgp`**: Per vedere il "Libro Mastro" di tutte le rotte imparate dal mondo e i loro attributi.
*   **`show ip route bgp`**: Per vedere quali rotte BGP hanno effettivamente vinto e sono finite nella tabella di routing principale (marcate col prefisso **B**).

---

> [!WARNING]
> **Il Sogno (o Incubo) dello SNOC: BGP Prefix Hijacking**
> Succede quando un AS annuncia per errore (o cattiveria) di possedere degli IP non suoi (es. gli IP di Google). Il BGP, se non filtrato bene, si fida e devia tutto il traffico mondiale verso l'impostore. È un'emergenza da "codice rosso" che solo i Senior sanno gestire!

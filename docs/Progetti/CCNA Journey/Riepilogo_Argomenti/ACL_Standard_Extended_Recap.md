# Recap CCNA: ACL Standard ed Estese (5.6)

Le **ACL (Access Control Lists)** sono le regole fondamentali per filtrare il traffico. Senza ACL, la rete è un'autostrada senza caselli dove chiunque può andare ovunque.

---

## 1. L'Analogia: Il "Buttafuori del Club"
Immagina un router come l'ingresso di un club esclusivo. Le ACL sono le regole che dai al buttafuori.
*   **ACL Standard:** Il buttafuori controlla solo "Chi sei". Se il tuo IP è sulla lista nera, non entri. Non gli importa dove vuoi andare o che vestiti porti.
*   **ACL Estesa:** Il buttafuori è molto più pignolo. Controlla:
    *   **Chi sei** (IP Sorgente)
    *   **Dove vuoi andare** (IP Destinazione)
    *   **Che "vestito" porti** (Protocollo: TCP, UDP, ICMP)
    *   **A che ora è l'appuntamento** (Porta: 80-HTTP, 443-HTTPS, ecc.)

---

## 2. La Regola d'Oro: "Implicit Deny Any"
C'è una regola invisibile alla fine di ogni ACL: **Tutto ciò che non è esplicitamente permesso, è proibito.**
*   **Errore Fatale SNOC:** Se scrivi un'ACL per bloccare un solo utente e ti dimentichi di aggiungere un `permit any` finale, bloccherai **tutta l'azienda**. Il buttafuori, se non riceve ordini contrari, chiude la porta a tutti.

---

## 3. La Ricetta: Standard vs Estesa

### ACL Standard (Numeri 1-99) - Semplice ma grezza
```text
ip access-list standard BLOCCA_GUEST
 deny 192.168.10.50 0.0.0.0    <-- Blocca solo questo PC
 permit any                    <-- Permette a tutti gli altri (IMPORTANTE!)
```

### ACL Estesa (Numeri 100-199) - Chirurgica
```text
ip access-list extended PROTEZIONE_WEB
 ! Permette al dipendente (1.1.1) di andare sul web (80/443) ma non altrove
 permit tcp host 192.168.1.1 any eq 80
 permit tcp host 192.168.1.1 any eq 443
 deny ip any any               <-- (Già implicito, ma utile scriverlo per i log)
```

---

## 4. Dove posizionare le ACL? (Regola d'Oro CCNA)
*   **Standard:** Si mette il più vicino possibile alla **destinazione** (perché non potendo scegliere la destinazione nel comando, rischieresti di bloccare il traffico verso ovunque).
*   **Estesa:** Si mette il più vicino possibile alla **sorgente** (per risparmiare banda: se il traffico deve essere bloccato, meglio farlo subito invece di farlo viaggiare per tutta la rete per poi buttarlo via alla fine).

---

## 5. I Ferri del Mestiere (Troubleshooting)
1.  **`show ip access-lists`**: Ti mostra quante volte ogni riga è stata attivata (i "matches"). Se vedi 0 match, l'ACL o non è applicata o è scritta male.
2.  **`ip access-group [nome] in/out`**: L'ACL non funziona finché non la applichi a un'interfaccia. Ricorda: `in` (entra nel router), `out` (esce dal router).
3.  **Wildcard Mask:** Ricorda che è l'opposto della Subnet Mask (es. /24 è `0.0.0.255`).

---

## 6. Il "Mondo a Parte": IPv6 ACLs
Le ACL in IPv6 funzionano in modo molto simile, ma ci sono **3 grandi differenze** che chiedono sempre all'esame:
1.  **Niente Wildcard Mask:** In IPv6 si usa direttamente il prefisso di rete (es. `/64`), molto più logico!
2.  **Solo Named ACLs:** In IPv6 non esistono più i "numeri" (niente 1-99), devi sempre usare un nome.
3.  **Le 3 Regole Invisibili:** Alla fine di un'ACL IPv6, oltre all'ovvio `deny ipv6 any any`, ci sono **prima** due regole `permit` invisibili fondamentali per far funzionare la rete locale (Neighbor Discovery):
    *   `permit icmp any any nd-na` (Neighbor Advertisement)
    *   `permit icmp any any nd-ns` (Neighbor Solicitation)
    *   `deny ipv6 any any`

*Esempio Config IPv6:*
```text
ipv6 access-list BLOCCA_IPV6_GUEST
 deny ipv6 2001:DB8:ACAD:A::/64 any
 permit ipv6 any any

interface GigabitEthernet 0/1
 ipv6 traffic-filter BLOCCA_IPV6_GUEST in   <-- Si usa 'traffic-filter', non 'access-group'!
```

---

## 7. Proteggere le "Porte Virtuali" (VTY Lines)
Nello SNOC, non vorrai mai che chiunque possa tentare di loggarsi in SSH sul tuo router. Si usa un'ACL per permettere l'accesso solo all'IP del Management Server o del PC del sistemista.
*   **La trappola dell'Esame:** Per applicare un'ACL a un'interfaccia fisica usi `ip access-group`. Ma sulle linee VTY si usa una parola completamente diversa: **`access-class`**.

*Esempio Config VTY:*
```text
! 1. Crea un'ACL Standard
access-list 10 permit 192.168.100.5   <-- Permette solo al PC del Sistemista

! 2. Applica alla linea virtuale
line vty 0 4
 access-class 10 in                   <-- Usa 'access-class'! Questo è importantissimo.
```

# Recap CCNA: L2 Security Hardening (5.7)

La sicurezza di Layer 2 protegge il "punto di accesso" fisico alla rete. Nello SNOC, queste sono le misure che impediscono a un utente malintenzionato (o distratto) di attaccare un dispositivo abusivo a una presa al muro dell'ufficio.

---

## 1. L'Analogia: Il "Badge all'Ingresso"
Immagina un ufficio dove ogni scrivania ha una presa di rete.
*   **Senza L2 Security:** Chiunque può entrare di notte, staccare il PC aziendale, attaccare il proprio laptop e iniziare a sniffare il traffico.
*   **Con L2 Security (Badge):** La presa di rete riconosce la "faccia" (il MAC Address) del PC autorizzato. Se vede una faccia diversa, "chiude a chiave" la presa e suona l'allarme nello SNOC.

---

## 2. Port Security: Il controllo del MAC Address
È la prima linea di difesa sulle porte di accesso degli switch.

### Modalità di apprendimento
*   **Static:** Inserisci il MAC a mano (molto faticoso).
*   **Dynamic:** Lo switch impara il primo MAC che parla (ma lo dimentica se si riavvia).
*   **Sticky:** **Il preferito dello SNOC.** Lo switch impara il MAC dinamicamente e lo scrive nella configurazione (`running-config`), così lo ricorda anche dopo un riavvio.

### Le Violazioni (Cosa succede se arriva un estraneo?)
1.  **Shutdown (Default):** La porta si spegne subito (`error-disable`). Bisogna intervenire a mano per riaccenderla.
2.  **Restrict:** La porta resta su, ma scarta i pacchetti dell'estraneo e invia un log (e aumenta un contatore).
3.  **Protect:** La porta scarta i pacchetti ma non dice nulla a nessuno (silenziosa).

---

## 3. DHCP Snooping: Anti-Rogue DHCP
Evita che un utente attacchi un routerino domestico alla rete e inizi a distribuire indirizzi IP sbagliati a tutti (attacco "Man-in-the-Middle").
*   **Trusted Ports:** Le porte verso i server DHCP legittimi e gli altri switch.
*   **Untrusted Ports (Default):** Le porte verso i PC. Se da qui arriva un'offerta DHCP, lo switch la blocca all'istante.

---

## 4. Dynamic ARP Inspection (DAI)
Sfrutta il database del DHCP Snooping per verificare che nessuno stia fingendo di essere un altro PC (ARP Spoofing/Poisoning). Lo switch controlla: *"Vuoi rispondere per l'IP 1.1.1? Vediamo se il DHCP Snooping dice che quell'IP è davvero tuo... NO? Allora ti blocco!"*.

---

## 5. La Ricetta: Port Security Sticky
```text
interface FastEthernet 0/1
 switchport mode access
 switchport port-security             <-- ATTIVA la sicurezza
 switchport port-security maximum 1   <-- Permette solo 1 MAC
 switchport port-security mac-address sticky  <-- Impara e ricorda!
 switchport port-security violation shutdown  <-- Se cambia, spegni tutto.
```

---

## 6. I Ferri del Mestiere (Troubleshooting)
1.  **`show port-security interface Fa0/1`**: Per vedere se la porta è sicura o se è andata in violazione.
2.  **`show port-security address`**: Per vedere quali MAC address sono stati imparati come "Sticky".
3.  **`errdisable recovery cause psecure-violation`**: Un trucco utile per far riaccendere la porta automaticamente dopo un po' di tempo.

---

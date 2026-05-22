# 📘 CCNA Knowledge Base: Advanced Layer 2 Security: DAI & IP Source Guard

> **Obiettivo:** Documento di revisione rapida e configurazione per l'esame CCNA.
> **Dominio CCNA:** Core Networking

---

Queste tecnologie rappresentano il livello superiore della sicurezza negli switch Enterprise e sono fondamentali per proteggere la rete da attacchi di "Man-in-the-Middle" e "Spoofing".

---

## 1. DAI: Dynamic ARP Inspection 🛡️
Il DAI serve a prevenire l'**ARP Spoofing** (o ARP Poisoning).

### Il Problema: ARP Spoofing
L'ARP è un protocollo "ingenuo": se un PC dice "Io sono il Gateway", gli altri gli credono e iniziano a mandargli tutto il traffico. Un hacker può intercettare tutto così.

### La Soluzione: DAI
Lo switch non si fida più delle risposte ARP che riceve sulle porte "untrusted". Ogni volta che arriva un pacchetto ARP, lo switch lo confronta con il database del **DHCP Snooping**.
*   Se il MAC e l'IP nel pacchetto ARP **corrispondono** a quelli registrati nel DHCP Snooping -> **Passa**.
*   Se **non corrispondono** -> Lo switch **scarta** il pacchetto e blocca l'attacco.

### Comandi Chiave:
```text
ip dhcp snooping
ip arp inspection vlan [ID]

! Sulle porte verso il router (Trust)
interface [INT]
 ip arp inspection trust
```

---

## 2. IP Source Guard (IPSG) 🔒
L'IPSG serve a prevenire l'**IP Spoofing**.

### Il Problema: IP Spoofing
Un utente cambia manualmente il suo indirizzo IP con quello di un server o di un altro utente per superare i controlli delle ACL o per rubare l'identità.

### La Soluzione: IPSG
Lo switch crea un filtro automatico sulla porta. Permette il traffico solo se il pacchetto ha come "Sorgente" l'indirizzo IP che quel PC ha ricevuto via DHCP. Se l'utente si inventa un IP, la porta non lo fa passare.

### Comandi Chiave:
```text
interface [INT]
 ip verify source [port-security]
```

---

## 3. Sintesi Operativa (Il "Trio della Sicurezza")
Per una porta utente sicura al 100%, la configurazione ideale è:
1.  **DHCP Snooping**: La base (crea il database).
2.  **DAI**: Protegge l'identità a livello MAC/ARP.
3.  **IPSG**: Protegge l'identità a livello IP.
4.  **Port Security**: Protegge il numero di MAC address sulla porta.

---
*(Recap per Isabelle - Fase Finale CCNA)*


---

### 🎯 Cheat Sheet per l'Esame
*(Sezione riservata a comandi rapidi e QCM per il ripasso finale)*

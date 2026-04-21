# Recap Lab CCNA: Il mondo DHCP (Client, Server e Relay)

*📄 **File Esercizio Originale:** [23-1 DHCP Configuration Lab Exercise.pdf](file:///C:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/23-1%20DHCP%20Configuration%20Lab%20Exercise.pdf)*

Questo file riassume le tre facce del **DHCP (Dynamic Host Configuration Protocol)** viste durante l'esercitazione pratica in Packet Tracer e modellate sugli argomenti ufficiali dell'esame CCNA.

## 1. Il Router come DHCP Client (Verso l'esterno)
A volte non hai un indirizzo fisso dall'Internet Service Provider (es. TIM, Vodafone), e il router deve farsi "prestare" un IP per la sua interfaccia WAN (quella verso strada). Al router viene ordinato di supplicare l'ISP di regalargli una connessione.

**Comandi:**
```text
interface f0/0
 ip address dhcp
 no shutdown
```
* **Per verificare di averlo ottenuto:** `show ip interface brief` (Noterai che la colonna *Method* riporterà la voce `DHCP`).
* **Per capire i dettagli del contratto (chi ce l'ha fornito):** `show dhcp lease` (Mostrerà l'IP del server del Provider).

---

## 2. Il Router come DHCP Server (Verso l'interno)
Usare il router per generare e assegnare in automatico le configurazioni IP ai PC dei dipendenti (Assegnazione Dinamica).

* **Regola Universale:** Prima di creare la vasca dei regali, devi escludere gli IP dei dispositivi fissi (il Gateway/Router, gli Switch, le Stampanti) per evitare i famosi conflitti `Duplicate Address`.

**Comandi:**
```text
! 1. Escludi i primi indirizzi
ip dhcp excluded-address 10.10.10.1 10.10.10.10

! 2. Crea il serbatoio (Pool)
ip dhcp pool NOME_RETE
 
 ! 3. Definisci il range della rete (Network)
 network 10.10.10.0 255.255.255.0
 
 ! 4. Consegna l'IP del gateway essenziale per navigare all'esterno
 default-router 10.10.10.1
 
 ! 5. Consegna l'IP del traduttore di nomi a dominio
 dns-server 10.10.20.10
```
* **Come leggere le "vendite effettuate":** Per vedere, dal punto di vista del Router, quali PC hanno preso quale indirizzo (e per quanto tempo vale il contratto), si lancia: `show ip dhcp binding`.

---

## 3. Il "Postino": Configurarsi da Relay Agent (IP Helper)
Spesso nelle grandi aziende (Enterprise), si toglie il peso del DHCP dal router e lo si affida a un grande Macchinone Server con Windows in un'altra stanza sicura.

* **La Domanda da Esame:** *Perché il server smette di consegnare gli IP anche se è perfetto?*
Smette di funzionare perché il famosissimo messaggio D.O.R.A. iniziale del PC in cerca disperata di un IP (il `DHCP Discover`) viaggia sotto forma di un urlo **Broadcast** (`255.255.255.255`). E **i Router per natura sono concepiti per bloccare ed uccidere i Broadcast** al confine della propria stanza.

* **La Soluzione:** Si ordina all'interfaccia a cui sono attaccati gli studenti di ascoltare queste urla, trasformarle in un "pacchetto postale" incartato (Unicast) e inoltrarle con gentilezza alla stanza del grande Server.

**Comando:** (Da dare rigorosamente sulla interfaccia LAN attaccata agli utenti)
```text
interface f0/1
 ip helper-address 10.10.20.10
```

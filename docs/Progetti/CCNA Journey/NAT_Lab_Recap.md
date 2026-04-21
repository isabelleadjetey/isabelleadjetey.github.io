# Recap Lab CCNA: Network Address Translation (NAT)

*📄 **File Esercizio Originale:** [29-1 NAT Configuration Lab Exercise.pdf](file:///C:/Users/isabe/.gemini/antigravity/scratch/portfolio-repo/docs/Progetti/CCNA%20Journey/29-1%20NAT%20Configuration%20Lab%20Exercise.pdf)*

Questo file riassume le tre tipologie di NAT viste durante il laboratorio pratico, essenziali per mascherare la tua rete privata e permetterle di navigare in sicurezza sull'oceano sconfinato di Internet.

## La Regola d'Oro Universale: La Dogana ("Inside" / "Outside")
Qualunque tipo di NAT tu stia configurando, il Router deve sapere "dove vivono i dipendenti" e "dove si spalanca la strada". Senza questa marcatura non funziona nulla!
```text
interface f0/1 (e f1/0 etc., porte collegate all'azienda)
 ip nat inside
 
interface f0/0 (La porta isolata collegata verso il provider e internet)
 ip nat outside
```

---

## 1. NAT Statico (Vetrina su strada / Traduzione 1-a-1)
Si usa specificatamente per **esporre un Server Interno** su Internet, incatenando il suo IP Privato in modo fisso e immutabile a un IP Pubblico che la tua azienda ha acquistato in esclusiva.

* **La Ricetta:**
  ```text
  ip nat inside source static 10.0.1.10 203.0.113.3
  ```

---

## 2. Dynamic NAT "Base" (Il sacchetto di caramelle / Molti-a-Molti)
Si usa quando hai comprato un pacchetto (Pool) di svariati IP Pubblici e vuoi prestarli progressivamente al primo dipendente che ne necessita (chi prima arriva, alloggia l'IP intero).

* **La Ricetta in tre step:**
```text
! 1. Raggruppa nel secchio gli IP pubblici comprati
ip nat pool NOME_POOL 203.0.113.4 203.0.113.12 netmask 255.255.255.240

! 2. Scegli a chi farli usare compilando la lizza degli invitati (ACL)
access-list 1 permit 10.0.2.0 0.0.0.255

! 3. Avvia la fusione collegando la lista al secchio
ip nat inside source list 1 pool NOME_POOL
```
* **Il Limite:** Scordato l'ultimo IP, nessuno naviga più (Timeout).

---

## 3. PAT / NAT Overload (Il Santo Graal: L'immortalità / Molti-a-Uno)
**PAT sta per Port Address Translation.** Questa magica tecnica fa parte della famiglia del **NAT Dinamico** (le regole vengono create "al volo" al momento della navigazione e poi scartate), una categoria che è l'esatto opposto del NAT Statico.
Si usa quando hai **un solo minuscolo IP pubblico** (o un pool esaurito) ma devi far uscir su internet letteralmente migliaia di device in simultanea. 
Il Router intercetta i dipendenti all'uscio, li avvolge tutti nello stesso identico mantello (IP Pubblico), e per capire qual è il mantello del capo e quello dello stagista ci spilla sopra una molletta al petto numerata (la famigerata **Porta** TCP/UDP a partire dalla `1024` in poi).

🚨 **Nota vitale sull'Access List (La "Lista degli Invitati"):**
Nel PAT, l'ACL associata non fa da firewall di sicurezza! Semplicemente seleziona *quali reti interne hanno il diritto* di essere mascherate e uscire. Se colleghi svariati dipartimenti a porte diverse del Router (es. `192.168.1.0/24` e `192.168.2.0/24`), basta accumulare più voci `permit` in quella singola ACL per coprire tutti!

* **La Ricetta con il Pool Esaurito:**
  Sovrascrivi la regola precedente di base schiaffandoci la magic word:
  ```text
  ip nat inside source list 1 pool NOME_POOL overload
  ```

* **La Ricetta in assoluto più sfruttata nel mondo reale (A Interfaccia Singola DHCP):**
  L'azienda è povera e l'unico IP Pubblico ti viene sputato in faccia dal Provider sul tuo cavo inserito in `FastEthernet0/0`.
```text
access-list 1 permit 10.0.2.0 0.0.0.255

! Avverti come sparisce la parola "pool" sostituita dal nome del cavo fisico
ip nat inside source list 1 interface FastEthernet0/0 overload
```

---
## I Ferri del Mestiere (Troubleshooting)
Domande super gettonate da esame e da vita in cantiere:
* **L'incubo della Rotta Scomparsa ("Destination Host Unreachable"):** Se il ping dal PC fallisce con questa dicitura inviata dal gateway, significa che il tuo file NAT è perfetto MA il tuo router ha scordato la strada per uscire. Spesso la rotta di default si cancella omette da sola per sicurezza quando si spegne un'interfaccia (ad. es per impostarla in DHCP). Verifica sempre inserendo `show ip route` e, se manca `0.0.0.0/0`, rida' la bussola al router ri-scrivendola a mano: `ip route 0.0.0.0 0.0.0.0 [Indirizzo_Provider]`
* **Il cestino intasato:** Per gettare via lo storico e forzare un comando (se un pacchetto ti inceppa la sovrascrittura di una nuova regola in overload): `clear ip nat translation *`
* **La Prova del Nove:** Per curiosare il libro mastro del router con le coppie di IP mischiati e la lista puntuale delle porte usate: `show ip nat translations`
* **Modalità The Matrix:** Per spiare i pacchetti tradotti in diretta testualmente a schermo a ogni refresh di pagina web del client: `debug ip nat`
* **I Segreti del Laboratorio (Test-Net e virtualizzazione):** Per simulare Internet negli emulatori senza sovraccaricare la rete, si usa fingere che l'ISP stesso sia il target (Es: server Google). Per farlo in totale sicurezza si consigliano:
  1. I blocchi **TEST-NET (es. 203.0.113.x)** come IP pubblici anziché inventati a caso, scongiurando sovrapposizioni black-hole con provider reali mondiali.
  2. Le interfacce **Loopback** (es. configuri sull'ISP una `interface Loopback 0` con IP `8.8.8.8`). Si tratta di interfacce squisitamente "virtuali" invulnerabili ai distacchi di cavo (*Always Up*), perfette per fare la parte del server remote infallibile e pingare con i tool da casa!

---

## 4. L'Incubo da Esame: Il Dizionario del NAT
Cisco usa queste quattro parole chiave per comporre le tabelle di traduzione. Creano estrema confusione nei test CCNA. Per tradurle mentalmente all'istante, impara a smontarle parola per parola:

* **"Inside"** = Il TUO dispositivo (PC o Router dentro l'azienda).
* **"Outside"** = Il LORO dispositivo (Il server di destinazione aperto su Internet).
* **"Local"** = Indirizzo "in Pigiama" (L'IP privato che vedi *restando dentro*).
* **"Global"** = Indirizzo "in Smoking" (L'IP pubblico che vedi stando in *strada pubblica*).

Combinando i termini otteniamo i 4 elementi della tua tabella `show ip nat translations`:
1. **Inside Local (Il Pigiama):** Il vero, semplice IP privato del tuo PC aziendale (es. `10.0.1.1`).
2. **Inside Global (Lo Smoking):** L'IP pubblico che ti ha prestato NAT. È la maschera con cui ti vedono i poliziotti su internet prima che tu rientri e ti rimetta il pigiama (es. `203.0.0.1`).
3. **Outside Global (Il Palazzo Esterno):** L'indirizzo pubblico incancellabile del Server web che stai provando a contattare fuori sede (es. Google `8.8.8.8`).
4. **Outside Local (L'Ospite Esterno):** L'indirizzo del server esterno così come lo vedi restando in pigiama a casa tua. Nel 99% dei casi e dei lab, è **Esattamente Identico** al Global (continui a vederlo e digitarlo come `8.8.8.8`) perché non devi tradurlo.

# Appunti Mentorship: Sopravvivenza e Crescita nello SNOC (Sorint Lab)

Questo documento raccoglie le strategie per integrarsi in un team SNOC lavorando in Full-Remote e un "cheat-sheet" di domande intelligenti da porre ai colleghi Senior per dimostrare proattività e collegare lo studio teorico (CCNA) al mondo reale aziendale.

---

## Le 4 Strategie "Rompi-Ghiaccio" (Full Remote)

1. **La Chiamata Parassita (Silent Shadowing):**
   *Cosa chiedere:* "Posso unirmi alle vostre chiamate di troubleshooting puro ascolto / mutata per imparare come ragionate sui ticket reali?"
2. **Le "Domande a Pacchetto":**
   *Cosa fare:* Non inviare una domanda ogni mezz'ora. Appunta i dubbi in settimana e prenota un "caffè virtuale" di 15 minuti il venerdì per lo spiegone.
3. **Le Domande "A + B = C":**
   *Cosa fare:* Non fare domande generiche ("Cos'è X?"). Dimostra lo studio preventivo chiedendo solo il tassello finale aziendale ("Ho studiato che X funziona così, ma noi per i clienti usiamo la variante A o B?").
4. **I Canali Pubblici:**
   *Cosa fare:* Usa le chat di gruppo anziché i messaggi diretti per le domande di studio, così mostri ai manager il tuo sforzo proattivo e permetti a chiunque sia libero di risponderti senza pressione.

---

## Cheat-Sheet: "Domande Sensate" tecnico-aziendali

### 🌐 Domande sul NAT / PAT
* **Il ruolo dei Firewall:** "Dai nostri clienti enterprise, di solito il NAT lo fate gestire dai Firewall dedicati (es. Fortinet, Palo Alto) che stanno dietro al router di frontiera, o lo si configura ancora puro sui router Cisco come nei lab CCNA?"
* **L'uso del NAT Statico:** "Sui ticket storici vi capita spesso di dover fare troubleshooting su configurazioni di NAT Statico (es. vecchi server esposti), o ormai l'architettura dei clienti si affida quasi solo a Reverse Proxy dietro a un PAT?"

### 📭 Domande sul DHCP
* **I Server DHCP Reali:** "Quando studiamo il DHCP su Cisco configuriamo il Pool sul router. Nelle reti dei clienti più grossi, solitamente tengono il servizio sul router stesso o usano Server (Windows/Linux) dedicati, con il router che fa solo da `ip helper-address`?"
* **Ticket Frequenti:** "Qual è il ticket più rognoso e classico sul DHCP gestito da voi? IP esauriti nei pool (Exhaustion), tabelle bloccate o Rogue DHCP Server collegati per sbaglio dagli utenti?"

### 🗺️ Domande su OSPF
* **Il mito dell'Area 0:** "La CCNA spinge tantissimo sulla divisione in Aree multiple (Design Gerarchico). Nelle topologie reali dei nostri clienti vedete sul serio questa netta divisione, oppure si tende a inserire tutti i link indistintamente nella singola Backbone Area 0?"
* **Tempi di Convergenza nei Link-Down:** "Quando cade un link aziendale su un dominio OSPF e deve subentrare la linea di backup, i tempi di convergenza sono veloci e indolori come nei libri o si generano spesso micro-disservizi (asimmetrie temporanee) di cui dobbiamo rendere conto al cliente?"

### 🌍 Domande su BGP
* **Il vero ruolo del BGP:** "Capo, so che l'OSPF gestisce le rotte *interne* dell'azienda, ma per quanto riguarda il BGP, i clienti lo usano solo per dialogare con gli ISP esterni veri e propri (Internet), oppure le grosse multinazionali lo usano anche internamente (iBGP) nei loro tunnel MPLS/SD-WAN per collegare le filiali mondiali?"
* **L'incubo dello SNOC:** "A livello di ticketing, qual è il problema BGP più insidioso e frequente che vedete? Le sessioni BGP con i provider che cadono (*Neighbor Down*) o la manipolazione asimmetrica delle rotte (*BGP Prefix Hijacking / AS-Path errato*)?"

---

## 🚀 Il Messaggio "Ice-Breaker" per Federico (Il Capo)
*Usare questo esatto messaggio su Teams per rompere il ghiaccio dopo un periodo di full-immersion di studio senza farsi sentire. Giustifica il silenzio con la produttività e sfrutta l'assist che Federico stesso aveva lanciato sul BGP.*

> *"Ciao Federico! Nelle ultime due settimane ho fatto una bella full-immersion e mi sono concentrata a fondo su OSPF, NAT e DHCP, testandoli anche in laboratori pratici. Ora inizio ad affacciarmi anche sul BGP come mi avevi saggiamente consigliato... avendo incamerato bene le prime basi di routing, quando hai un quarto d'ora di respiro in questi giorni, riusciresti a farmi quello spiegone panoramico di cui parlavamo? Così mi aiuti a 'unire i puntini' su come lo applichiamo noi in Sorint prima di perdermi sui manuali!"*

---

## 🧠 Curiosità / Metafora Mentale: OSPF vs BGP
*Un trucchetto utilissimo da tenere a mente durante le chiacchierate con i Senior per decifrare al volo di cosa si sta parlando.*

* **OSPF = "Il Vigile Urbano":** È il re del traffico *Interno*. Conosce a memoria ogni singola stradina, ogni incrocio e la via più veloce in assoluto per girare dentro la città (l'azienda). Agisce in frazioni di secondo. Non sa nulla di cosa ci sia fuori dai confini comunali.
* **BGP = "L'Aeroporto Internazionale":** Se ne frega totalmente delle stradine interne. Lavora su scala mondiale. Il suo unico scopo è decidere se i pacchetti per andare da Milano a New York devono passare per lo scalo di Francoforte (Vodafone) o di Parigi (Fastweb). È un controllore di volo tra Nazioni/Aziende diverse (Autonomous Systems). Lento ma in grado di reggere milioni di rotte senza bloccarsi.


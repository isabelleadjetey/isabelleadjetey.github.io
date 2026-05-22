# 📘 CCNA Knowledge Base: Wireless — Fondamentali, Architetture e Sicurezza

> **Obiettivo:** Documento di revisione rapida e configurazione per l'esame CCNA.
> **Dominio CCNA:** Core Networking

---

Questo documento copre tutti i sotto-argomenti wireless del Blueprint CCNA 200-301:
- **Dominio 1:** Fondamentali wireless — frequenze, canali, standard 802.11, CSMA/CA
- **Dominio 2 (Network Access):** Architetture WLAN — Autonomous AP, Lightweight AP, WLC, CAPWAP
- **Dominio 1 + 5:** Sicurezza wireless — WPA2, WPA3, 802.1X, RADIUS

---

## PARTE 0 — Wireless Fundamentals

### Cos'è un Access Point (AP)? E i Client?

Prima di addentrarci nei dettagli fisici, definiamo gli attori principali di una rete Wi-Fi:
- **L'Access Point (AP):** È il dispositivo che "crea" la rete Wi-Fi. Fa da **ponte (bridge)** tra la rete cablata aziendale (gli switch) e il mondo senza fili. Trasforma i segnali elettrici del cavo in onde radio, e viceversa.
- **Il Client (o STA):** È qualsiasi dispositivo finale dell'utente che sfrutta la rete (es. il tuo smartphone, il laptop, una stampante Wi-Fi).

In breve: l'AP "eroga" il servizio, il Client lo "consuma".

---

### Il Mezzo Trasmissivo: Onde Radio

A differenza dell'Ethernet (bit su cavo fisico), il Wi-Fi usa **onde radio** per trasmettere dati nell'aria. Questo crea sfide uniche:
- **Mezzo condiviso** — tutti i dispositivi vicini "sentono" tutto il traffico
- **Attenuazione** — il segnale cala con la distanza e gli ostacoli
- **Interferenze** — altri dispositivi sulla stessa frequenza degradano il segnale
- **Half-duplex** — un AP non può trasmettere e ricevere contemporaneamente sulla stessa frequenza

---

### Bande di Frequenza

| Banda | Portata | Velocità | Canali non sovrapposti | Note |
|---|---|---|---|---|
| **2.4 GHz** | ✅ Alta | ❌ Bassa (max ~600 Mbps) | **3** (canali 1, 6, 11) | Più congestionata, attraversa meglio i muri |
| **5 GHz** | ❌ Minore | ✅ Alta (multi-Gbps) | ~24 | Meno interferenze, ideale per uffici |
| **6 GHz (Wi-Fi 6E)** | ❌ Bassa | ✅✅ Altissima | Moltissimi | Solo dispositivi recenti |

**Perché solo 3 canali non sovrapposti a 2.4 GHz?**
La banda 2.4 GHz è larga ~83 MHz. Ogni canale occupa 22 MHz. 3 × 22 MHz = 66 MHz → si riesce a inserire esattamente 3 canali senza sovrapposizione: **1, 6, 11**.

Un quarto canale non ci starebbe senza sovrapporsi agli altri — il che causerebbe **Co-Channel Interference** e degrado delle performance.

---

### Standard 802.11 — L'Evoluzione del Wi-Fi

| Standard | Anno | Banda | Velocità Max (teorica) | Nome |
|---|---|---|---|---|
| 802.11b | 1999 | 2.4 GHz | 11 Mbps | Wi-Fi 1 |
| 802.11a | 1999 | 5 GHz | 54 Mbps | Wi-Fi 2 |
| 802.11g | 2003 | 2.4 GHz | 54 Mbps | Wi-Fi 3 |
| **802.11n** | 2009 | 2.4 + 5 GHz | 600 Mbps | **Wi-Fi 4** |
| **802.11ac** | 2013 | 5 GHz | 3.5 Gbps | **Wi-Fi 5** |
| **802.11ax** | 2019 | 2.4 + 5 + 6 GHz | 9.6 Gbps | **Wi-Fi 6/6E** |

> Per il CCNA le versioni più importanti: **802.11n (Wi-Fi 4)** e **802.11ac (Wi-Fi 5)**.

---

### CSMA/CA — Come Si Evitano le Collisioni

Ethernet usa **CSMA/CD** — rileva le collisioni dopo che accadono. Nel Wi-Fi è impossibile: un dispositivo non può trasmettere e ascoltare contemporaneamente (half-duplex). Si usa **CSMA/CA (Collision Avoidance)**:

1. **Ascolta** il canale prima di trasmettere
2. Se il canale è occupato → aspetta
3. Se il canale è libero → aspetta un **tempo random aggiuntivo** (backoff)
4. Trasmette
5. Il ricevente manda un **ACK** — se non arriva, ritrasmette

> Wi-Fi è intrinsecamente meno efficiente di Ethernet: ogni trasmissione richiede un "turno di cortesia".

---

### Topologie e Identificatori

**SSID (Service Set Identifier)**
Il nome della rete Wi-Fi (es. "TIM-12345"). Un AP può trasmettere più SSID mappati su VLAN diverse (es. "Dipendenti" → VLAN 10, "Ospiti" → VLAN 20).

**BSS (Basic Service Set)**
La cella base: un singolo AP con i suoi client. Identificata dal **BSSID** (= MAC address dell'AP).

**ESS (Extended Service Set)**
Più AP che trasmettono lo stesso SSID → la rete appare unica. Permette il **roaming**: muovendoti nell'edificio, passi da AP1 ad AP2 senza interruzione.

```
        ESS "Azienda-WiFi"
┌──────────────────────────────────────┐
│  BSS1 [AP1]   BSS2 [AP2]  BSS3 [AP3]│
│   Piano 1      Piano 2     Piano 3   │
│  Stesso SSID → roaming trasparente   │
└──────────────────────────────────────┘
```

---

## PARTE 1 — Architetture Wireless


### Il Problema: Scalare il Wi-Fi Aziendale

In una piccola rete (1-3 AP), configurarli singolarmente è accettabile. In un'azienda con 200 Access Point distribuiti su più piani e sedi, configurarli uno ad uno è impossibile. Ogni cambio di SSID, password o policy richiederebbe 200 interventi manuali.

**La soluzione: centralizzare la gestione con un Controller.**

---

### 1. Autonomous AP — Il Modello "Vecchio"

Ogni AP è **completamente indipendente** e fa da "ponte" (bridge) tra il mondo senza fili e la rete cablata aziendale. Contiene tutta la logica di autenticazione, sicurezza, gestione del canale e roaming. Fa **tutto da solo**:
1. Trasmette e riceve il segnale radio (onde elettromagnetiche) usando le sue antenne.
2. Invia i messaggi di "Beacon" per annunciare l'SSID.
3. Gestisce l'autenticazione e la sicurezza (controlla password WPA2 o parla col RADIUS).
4. Gestisce la connessione (Association) per far entrare il client in rete.
5. Decifra e cifra i dati mentre passano dall'aria al cavo e viceversa.

Si configura singolarmente tramite CLI o GUI web.

**Caratteristiche:**
- Configurazione locale su ogni dispositivo
- Adatto a: reti piccole (casa, piccolo ufficio con 1-5 AP)
- Roaming tra AP diversi: lento e visibile all'utente

**Problema di scalabilità:**
```
[AP1 autonomo] ← configurazione separata
[AP2 autonomo] ← configurazione separata
[AP3 autonomo] ← configurazione separata
         ...
[AP200 autonomo] ← configurazione separata  ← impossibile gestire
```

---

### 2. Lightweight AP (LAP) + WLC — Il Modello Enterprise

#### Lightweight AP (LAP)
Un AP "stupido" — fa solo il "lavoro di fatica" fisico e urgente. Non ha configurazione locale propria. 

**Il Lightweight AP fa SOLO le cose fisiche e real-time:**
1. Trasmette e riceve il **segnale radio**.
2. Invia i **Beacon** e risponde ai **Probe**.
3. **Cifra e decifra i pacchetti** in tempo reale (mandare il traffico al WLC solo per decifrarlo saturerebbe la rete).

Tutta l'intelligenza (autenticazione, policy, roaming) è delegata al controller centrale.

All'avvio, il LAP non fa nulla finché non trova il WLC — gli manda un messaggio di discovery e scarica la configurazione automaticamente. Questo processo si chiama **Zero-Touch Provisioning**: installi fisicamente l'AP, lo accendi e il WLC lo configura da solo.

#### WLC — Wireless LAN Controller
È il "cervello centrale" (Control Plane) della rete wireless. In un'architettura Split-MAC, il WLC toglie l'onere decisionale ai Lightweight AP e accentra la gestione.

**Cosa fa esattamente il WLC:**
1. **Provisioning:** Configura centralmente SSID, VLAN, sicurezza e QoS, inviando le configurazioni a tutti i LAP in modo massivo.
2. **Autenticazione e Associazione:** Riceve le richieste di accesso dai client tramite gli AP e decide se farli entrare in rete (spesso inoltrando la richiesta a un server RADIUS).
3. **Roaming (Mobility):** Segue il client mentre si muove nell'edificio, passando la connessione da un AP all'altro in modo trasparente e senza cadute.
4. **Radio Resource Management (RRM):** Analizza le interferenze nell'etere e assegna dinamicamente i canali migliori e la potenza di trasmissione ideale a ciascun AP per evitare sovrapposizioni.
5. **Aggiornamento Centralizzato:** Carichi il nuovo firmware sul WLC e lui lo distribuisce a tutti gli AP contemporaneamente.

```
[LAP1] ──CAPWAP──┐
[LAP2] ──CAPWAP──┤──> [WLC] ← unica configurazione per tutti
[LAP3] ──CAPWAP──┘
```

---

### 3. CAPWAP — Il Protocollo Collante

**CAPWAP (Control And Provisioning of Wireless Access Points)** è il tunnel che connette ogni LAP al WLC. Usa **UDP** e trasporta due tipi di traffico su canali separati:

| Canale | Porta UDP | Contenuto | Cifrato? |
|---|---|---|---|
| **Control Channel** | **5246** | Configurazioni, comandi, heartbeat | ✅ Sì (DTLS) |
| **Data Channel** | **5247** | Traffico dati degli utenti Wi-Fi | Opzionale |

Il Control Channel è sempre cifrato con DTLS (Datagram TLS) — nessuno può intercettare i comandi di configurazione che il WLC manda agli AP.

---

### 4. Split-MAC Architecture — Come Sono Divise le Funzioni

Con l'architettura Lightweight, le funzioni del vecchio AP autonomo vengono **"spezzate"** tra LAP e WLC. Questo si chiama **Split-MAC**:

| Funzione | Chi la esegue |
|---|---|
| Trasmissione radio (antenna) | **LAP** |
| Invio Beacon e Probe Response | **LAP** |
| Cifratura/decifratura dei frame | **LAP** (più veloce localmente) |
| Autenticazione 802.11 e 802.1X | **WLC** |
| Associazione del client | **WLC** |
| QoS wireless | **WLC** |
| Gestione del roaming | **WLC** |
| Assegnazione canali e potenza | **WLC** |

---

### 5. FlexConnect — Per gli Uffici Remoti

**Problema:** un ufficio remoto ha i suoi LAP, ma il WLC è nella sede centrale connessa via WAN. Se la WAN cade, i LAP non ricevono più comandi dal WLC → tutti i client Wi-Fi perdono la connessione.

**FlexConnect** risolve questo: il LAP può operare in modo **autonomo locale** anche senza WLC, usando l'ultima configurazione ricevuta.

```
Sede Centrale:   [WLC] ←── gestione normale
                    │
                  WAN
                    │
Ufficio Remoto: [LAP FlexConnect]
                    │
               (se WAN cade → continua a funzionare localmente)
```

Modalità di funzionamento FlexConnect:
- **Connected Mode:** WAN attiva, il WLC gestisce tutto normalmente
- **Standalone Mode:** WAN down, il LAP usa la configurazione cached e continua a servire i client

---

### 6. Riepilogo Architetture per l'Esame

| Aspetto | Autonomous AP | Lightweight AP + WLC |
|---|---|---|
| Configurazione | Locale (per ogni AP) | Centralizzata (sul WLC) |
| Intelligenza | **Nell'AP** | **Nel WLC** |
| Protocollo | — | **CAPWAP** (UDP 5246/5247) |
| Scalabilità | ❌ Piccole reti | ✅ Enterprise |
| Roaming | Lento | ✅ Trasparente |
| Zero-Touch Provisioning | ❌ | ✅ |
| Resilienza WAN | ✅ Sempre ok | ⚠️ FlexConnect necessario |

---

## PARTE 2 — Wireless Security

### Il Problema del Wi-Fi

Il Wi-Fi trasmette segnali radio nell'aria — fisicamente chiunque nelle vicinanze può "sentire" il traffico. La sicurezza wireless deve risolvere due problemi:
1. **Autenticazione:** verificare che chi si connette sia autorizzato
2. **Cifratura:** rendere il traffico illeggibile agli intercettatori

---

### 1. Evoluzione dei Protocolli di Sicurezza Wireless

#### WEP (1997) — Morto ☠️
Il primo tentativo. Usa cifratura **RC4** con chiavi statiche di 40 o 104 bit. Completamente rotto — craccabile in **meno di 5 minuti** con strumenti gratuiti come Aircrack-ng. Non va mai usato.

*Perché è rotto:* le chiavi non cambiano mai e l'IV (Initialization Vector) di soli 24 bit si ripete frequentemente, permettendo attacchi statistici.

#### WPA (2003) — Deprecato ⚠️
Nato come patch di emergenza al WEP usando hardware esistente. Introduce **TKIP** (Temporal Key Integrity Protocol) che cambia la chiave dinamicamente per ogni pacchetto. Meglio di WEP ma ancora vulnerabile ad attacchi TKIP. Ufficialmente deprecato nel 2012.

#### WPA2 (2004) — Lo Standard Attuale ✅
Il salto di qualità reale. Abbandona TKIP e adotta **AES** (Advanced Encryption Standard) con il protocollo **CCMP** (Counter Mode with CBC-MAC Protocol). È robusto e ancora lo standard attuale su quasi tutti i dispositivi.

*Vulnerabilità nota:* attacchi "offline dictionary attack" — catturando l'handshake a 4 vie, un attaccante può provare password offline indefinitamente.

#### WPA3 (2018) — Il Futuro ✅✅
Risolve le vulnerabilità di WPA2. Introduce **SAE** (Simultaneous Authentication of Equals) che sostituisce l'handshake a 4 vie con un protocollo matematicamente resistente agli attacchi offline. Usa **AES-GCMP-256** (più robusto di AES-CCMP di WPA2). Obbligatorio per i dispositivi certificati Wi-Fi 6.

*Cosa fa SAE:* anche se un attaccante cattura tutto il traffico dell'handshake, non può provare password offline — il protocollo richiede interazione live con il dispositivo.

---

### 2. Le Due Modalità: Personal vs Enterprise

Sia WPA2 che WPA3 esistono in due varianti che definiscono il **metodo di autenticazione**:

#### Personal (PSK — Pre-Shared Key)
Tutti i dispositivi usano la **stessa password condivisa**.

- Semplice da configurare — ideale per casa o piccoli uffici (SOHO)
- Problema: se un dipendente lascia l'azienda, devi cambiare la password su tutti i dispositivi
- Problema: non c'è visibilità su "chi" si è connesso — solo "qualcuno con la password giusta"

#### Enterprise (802.1X)
Ogni utente ha le **proprie credenziali individuali** (username + password).

- L'AP non autentica direttamente — delega tutto a un **server RADIUS** esterno
- Il protocollo usato è **802.1X** (standard IEEE per il controllo accessi alla rete)
- Quando un dipendente lascia l'azienda: si revoca solo il suo account sul RADIUS — zero modifiche agli AP
- Il sistema sa esattamente chi si è connesso, quando e per quanto tempo (Accounting)
- Adatto a: ambienti enterprise, SNOC, università, ospedali

**Flusso autenticazione 802.1X:**
```
[Client Wi-Fi] ──credenziali──> [AP (Authenticator)] ──RADIUS──> [Server RADIUS]
                                                                        │
                                                              Verifica credenziali
                                                                        │
[Client] <── accesso concesso ─────────────────────────────────────────┘
```

---

### 3. Tabella Comparativa — Per l'Esame

| Protocollo | Cifratura       | Auth Personal | Auth Enterprise  | Sicurezza    |
|------------|-----------------|---------------|------------------|--------------|
| **WEP**    | RC4 (statico)   | Chiave statica| ❌               | ❌ Rotto     |
| **WPA**    | TKIP (dinamico) | PSK           | 802.1X           | ⚠️ Debole     |
| **WPA2**   | **AES-CCMP**    | PSK           | **802.1X**       | ✅ Standard   |
| **WPA3**   | **AES-GCMP-256**| **SAE**       | 802.1X (Enhanced) | ✅✅ Migliore |


---

## 🧠 Cheat Sheet per l'Esame

| Domanda tipo | Risposta |
|--- ----------|---|
| "AP gestiti centralmente" | **Lightweight AP + WLC** |
| "Protocollo tra LAP e WLC" | **CAPWAP (UDP 5246/5247)** |
| "AP che funziona anche senza WLC" | **FlexConnect** |
| "Funzioni divise tra LAP e WLC" | **Split-MAC Architecture** |
| "Protocollo Wi-Fi completamente rotto" | **WEP** |
| "Standard Wi-Fi enterprise con credenziali individuali" | **WPA2/WPA3 Enterprise + 802.1X** |
| "Server che verifica le credenziali Wi-Fi" | **RADIUS** |
| "WPA3 cosa introduce rispetto a WPA2" | **SAE (resistente ad attacchi offline)** |
| "Cifratura usata da WPA2" | **AES-CCMP** |
| "In casa con router TIM: WPA2-Personal o Enterprise?" | **Personal (PSK)** |
| "In azienda con 200 dipendenti" | **Enterprise (802.1X + RADIUS)** |

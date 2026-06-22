# Guida al Setup di FortiGate VM su VMware

Poiché utilizzi VMware (VMware Workstation o ESXi), ecco i passaggi e le best practice per preparare al meglio il tuo ambiente di laboratorio per l'NSE 4.

## 1. Importazione della VM
1. Scarica l'immagine per VMware (file `.ovf` e `.vmdk` contenuti in uno zip) dal portale di supporto Fortinet.
2. Su VMware, vai su **File > Open** e seleziona il file OVF estratto.
3. Accetta la licenza e scegli il nome della VM.

## 2. Configurazione delle Schede di Rete (Virtual Network Adapters)
Il FortiGate VM di default si avvia con diverse schede di rete. Su VMware, l'ordine degli "Adapter" corrisponde esattamente all'ordine delle porte sul firewall (Adapter 1 = port1, Adapter 2 = port2, ecc.).

Per un setup ottimale del laboratorio, ti consiglio questa configurazione:

*   **Network Adapter 1 (port1 - WAN):** Imposta su **NAT** o **Bridged**. 
    *   *Perché:* Permetterà alla tua VM di ricevere un IP automaticamente dal tuo router di casa o da VMware e di uscire su internet.
*   **Network Adapter 2 (port2 - LAN):** Imposta su **Host-only** o su un *LAN Segment* specifico (es. `LAN-1`).
    *   *Perché:* Creerà una rete isolata. Se usi *Host-only*, potrai accedere comodamente all'interfaccia grafica (GUI) del FortiGate direttamente dal tuo PC fisico.
*   **Network Adapter 3 (port3 - DMZ):** Imposta su un *LAN Segment* specifico (es. `LAN-DMZ`).
    *   *Perché:* Qui potrai collegare in futuro altre VM (es. un server Linux/Windows virtuale) per fare test di firewalling e NAT.

## 3. Primo Avvio e Accesso via CLI
1. Avvia la VM. Vedrai il processo di boot nel terminale di VMware.
2. Al prompt di login, inserisci le credenziali predefinite:
   *   **Username:** `admin`
   *   **Password:** *(lascia vuoto e premi Invio)*
3. Ti verrà immediatamente chiesto di inserire una nuova password sicura.

## 4. Configurazione IP per accedere alla GUI
Per poter usare l'interfaccia grafica via browser, devi assicurarti che una porta abbia un IP assegnato e l'accesso HTTP/HTTPS consentito.

**Opzione A: Trovare l'IP assegnato via DHCP sulla WAN (port1)**
Di default, la `port1` è configurata in DHCP. Per scoprire quale IP ha preso da VMware:
```text
diagnose ip address list
```
Cerca l'IP associato a `port1`. Apri il browser del tuo PC su `https://<IP-assegnato>` (accetta l'avviso del certificato non valido).

**Opzione B: Impostare un IP statico sulla LAN (port2)**
Se vuoi assegnare manualmente un IP alla porta 2 (quella in Host-only, supponendo che la rete VMware Host-only sia `192.168.100.x`):
```text
config system interface
    edit port2
    set ip 192.168.100.254 255.255.255.0
    set allowaccess ping https ssh http
end
```
Ora potrai accedere alla GUI andando su `https://192.168.100.254`.

## 5. Licenza di Valutazione
Se utilizzi l'ultima versione di FortiOS (7.2 o superiore), al primo login dalla GUI ti verrà chiesto di attivare la "Free Trial". 
Avrai bisogno di inserire le credenziali del tuo account **FortiCloud** (la registrazione sul sito Fortinet è gratuita). Fatto questo, la VM si riavvierà con la licenza trial di 15 giorni attiva.

---
> [!TIP]
> **Snapshot VMware:** VMware Workstation ha una funzione fantastica per gli snapshot (`VM > Snapshot > Take Snapshot`). Fallo subito dopo aver configurato gli IP e l'accesso! Se durante i test blocchi per errore il tuo stesso accesso al firewall (lockout), potrai ricaricare lo snapshot in 5 secondi senza dover rifare tutto da zero.

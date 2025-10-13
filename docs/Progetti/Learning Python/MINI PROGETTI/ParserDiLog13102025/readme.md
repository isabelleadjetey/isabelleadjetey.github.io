# PROGETTINO PARSER DI LOG 


Il programma legge un file di log riga per riga, estrae da ciascuna riga il timestamp, il livello (es. INFO, ERROR) e il messaggio, conta quante occorrenze ha ogni livello e stampa il riassunto dei conteggi.

## Panoramica del programma
Il programma legge un file di log riga per riga, estrae da ciascuna riga il timestamp, il livello (es. INFO, ERROR) e il messaggio, conta quante occorrenze ha ogni livello e stampa il riassunto dei conteggi.

---

### Funzione parse_line — cosa fa e perché
- Prende in ingresso una stringa chiamata **line**.  
- Applica **line.strip()** per rimuovere spazi e newline all’inizio e alla fine.  
- Esegue **.split(" ", 2)** per separare la stringa in al massimo 3 parti usando lo spazio come separatore; il risultato è una lista assegnata a **parts**.  
- Verifica che **parts** contenga almeno 3 elementi; se no ritorna **None** per indicare una riga malformata.  
- Se ci sono 3 parti, le assegna a **timestamp**, **level**, **message** e restituisce un dizionario con queste chiavi.

---

### Funzione count_levels — cosa fa e come lavora
- Riceve il percorso del file **path**.  
- Inizializza un dizionario vuoto **counts** per accumulare i conteggi per ogni livello.  
- Apre il file in lettura con codifica **utf-8** usando il contesto **with** per garantire la chiusura automatica del file.  
- Itera su ogni riga del file; per ogni riga chiama **parse_line(line)** e salva il risultato in **p**.  
- Se **p** è **None** salta la riga con **continue**.  
- Altrimenti ottiene il livello con **p["level"]** e aggiorna il conteggio: **counts[level] = counts.get(level, 0) + 1**.  
- Alla fine ritorna il dizionario **counts** con i conteggi per livello.

---

### Blocco principale if __name__ == "__main__"
- Il blocco viene eseguito solo se lo script è lanciato direttamente, non quando viene importato come modulo.  
- Chiama **count_levels("sample.log")** e salva il risultato in **summary**.  
- Itera su **summary.items()** e stampa per ogni livello la stringa formattata **"{level}: {c}"**.

---

### Struttura dei file 
-log_parser.py  script principale
-sample.log - file di esempio con righe di log 

### Esempio di input e output attesi
- Righe di esempio nel file:
  - 2025-10-13T10:00:00 INFO Avvio servizio  
  - 2025-10-13T10:01:00 ERROR Errore connessione  
- Output atteso:
  - INFO: 1  
  - ERROR: 1

---

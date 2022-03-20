# Pizzarando
## Notwendige Programme
- Node (https://nodejs.org/en/download/)
- XAMPP
## Start
Um den JavaScript-Server zu testen müssen Sie:
1. Server vorbereiten
    1. In den "server"-Ordner navigieren
    2. "npm install" ausführen
2. Datenbank vorbereiten
    1. XAMPP öffnen
    2. Apache- und SQl-Server starten
    3. "https://localhost/phpmyadmin" in einem Browser aufrufen
    4. Eine neue Datenbank mit dem Titel "pizzarando" erstellen
    5. Innerhalb der neuen Datenbank die Datei "database/pizzaria.sql" importieren oder ausführen
3. Datenbank verbinden
    3. In den "database"-Ordner navigieren
    4. Die "database.js"-Datei entsprechend der Angaben modifizieren
4. JavaScript-Server starten
    1. In den "server"-Ordner navigieren
    2. "node server.js" ausführen

Um die Website nun testen zu können lässt sie sich innerhalb eines Browsers unter "http://localhost" aufrufen.
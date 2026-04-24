# Changelog

## v1.4.0

### Verbesserungen

- **Swipe-Back-Geste auf Android:** In den Info-Screens kann nun per Wisch nach rechts zurücknavigiert werden — sowohl innerhalb des Info-Stacks als auch vom Info-Menü zurück zum Karten-Tab. Auf iOS bleibt die native Geste unverändert.
- **Neue Logos im Info-Screen:** Logos von CAU, ADDIX und UXMA hinzugefügt, sowie "reakt"-Logo. Neue Sektionen "In Kooperation mit" und "Bestandteil von" ergänzt.
- **Tooltip-Textgröße erhöht:** Schriftgröße in POI-Tooltips (Titel und Beschreibung) auf 16px erhöht, Hint-Textstil global von 12px auf 14px angepasst.
- **Ungenutzte Packages entfernt:** `axios`, `expo-constants`, `expo-file-system`, `expo-media-library`, `make-plural` und `react-native-webview` aus den Dependencies entfernt.

## v1.3.0

### Verbesserungen

- **Warnungen neben Location-Button:** Warnungen (Fahrzeug-Nähe, Bahnübergang) erscheinen nun neben statt über dem Location-Button.
- **Geschwindigkeitsanzeige:** Speed-Icon entfernt und Schriftgröße reduziert für eine aufgeräumtere Darstellung.
- **Geschwindigkeitswert verbessert:** Genauere Berechnung/Darstellung der Geschwindigkeit.
- **POI-Texte aktualisiert:** Aktualisierte Beschreibungen für Points of Interest.
- **POI verschoben:** Position eines POI korrigiert.

### Bugfixes

- **Map-Marker auf Android fehlte:** Fehlender Marker auf der Karte bei Android behoben.
- **Demo-Railtrail Glitching:** Visuelles Glitching der Demo-Railtrail-Route behoben.
- **Nummer 99 herausgefiltert:** Unerwünschter Eintrag (Nummer 99) wird nicht mehr angezeigt.
- **Dummy-Track entfernt:** Nicht benötigter Test-Track aus den Daten entfernt.

## v1.2.0

### Bugfixes

- **GPS-Position friert ein nach App-Backgrounding (iOS):** Wenn die App während einer aktiven Fahrt in den Hintergrund ging (Handy gesperrt, andere App geöffnet), wurde die `watchPositionAsync`-Subscription von iOS beendet. Beim Zurückkehren in den Vordergrund kamen keine GPS-Updates mehr — Position und Geschwindigkeit blieben permanent eingefroren. Fix: AppState-Listener in HomeScreen, der bei Rückkehr in den Vordergrund die Location-Subscription automatisch erneuert.

### Verbesserungen

- Distanzen für Warnungen zu Draisinen in der Nähe angepasst.

## v1.1.1

- remove logs
- add try/finally
- remove duplicated calculation

## v1.1.0

- Initial tracked release

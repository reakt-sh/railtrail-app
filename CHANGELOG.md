# Changelog

## v2.0.0

### Neue Features

- **Off-Track-Draisinen werden ausgeblendet:** Das Positions-WebSocket liefert pro Draisine ein `offtrack`-Flag. Meldet eine Draisine `offtrack=true` (z.B. neben dem Gleis abgestellt oder abtransportiert), wird sie sofort aus dem Redux-State entfernt und verschwindet damit von der Karte, aus der Fahrzeugauswahl und aus den Warnungen. Kehrt sie auf die Strecke zurück (`offtrack=false`), erscheint sie automatisch wieder. Ausnahme: Die eigene Draisine wird während einer aktiven Fahrt nie entfernt, da ihr Marker zugleich der Nutzer-Marker ist und per GPS positioniert wird. Neue Redux-Action `trip/remove-vehicle`; der Filter greift zentral am WebSocket-Eingang (`api-actions.ts`), analog zum `EXCLUDED_VEHICLE_IDS`-Muster.

## v1.8.0

### Bugfixes

- **Draisine 99 löste weiterhin Warnungen aus, obwohl sie ausgeblendet war:** Die Motorbahn (ID 16) wurde bisher nur in der Karte und im Fahrzeugauswahl-BottomSheet gefiltert. Die Warn-Berechnung (`calculateWarnings()`) berücksichtigte den Filter nicht, sodass beim Fahren eine Warnung für eine "entgegenkommende Draisine" auftauchte. Fix: Filter erfolgt jetzt zentral am WebSocket-Eingang (`api-actions.ts`); ausgeschlossene Fahrzeuge gelangen gar nicht erst in den Redux-State. Konstante `HIDDEN_VEHICLE_IDS` zu `EXCLUDED_VEHICLE_IDS` umbenannt, da die Semantik jetzt "vollständig aus allen Interaktionen ausgeschlossen" ist (nicht mehr nur "vor der Karte versteckt").

## v1.7.0

### Bugfixes

- **Geschwindigkeit blieb im Stillstand auf altem Wert hängen:** Im Track-Modus mit registrierter Draisine fiel der Tacho beim Anhalten nicht auf 0, weil der Speed-Reset-Timer (8 s ohne neues GPS-Update → 0) ausschließlich im lokalen Modus aktiv war. Wenn `expo-location` im Stillstand wegen `distanceInterval` keine Updates mehr lieferte, blieb der zuletzt geglättete Wert bestehen. Fix: Reset-Timer für alle Modi mit echtem GPS aktiviert (Simulation-Modus weiterhin ausgenommen). Zusätzlich Speed-Gap-Reset im Track-Modus analog zum lokalen Modus, damit nach App-Resume aus dem Hintergrund nicht der alte EMA-Wert weiterläuft.
- **Distanzverlust im lokalen Modus (~2 % zu kurz):** Der Bezugspunkt für die Haversine-Berechnung wurde bei jedem Location-Update verschoben — auch wenn das Update vom Jitter-Filter (≥ 5 m) verworfen wurde. Bei langsamer Fahrt liefert `expo-location` wegen `timeInterval` jede Sekunde Updates, oft mit < 5 m Bewegung; diese wanderten dem Bezugspunkt hinterher, ohne dass die Distanz addiert wurde. Folge: Reihen aus 4 m + 4 m + 4 m … wurden zu 0 m gemessener Distanz. Fix: Bezugspunkt-Strategie hängt jetzt vom GPS-Bewegungszustand ab — bei sicher erkanntem Stillstand (`loc.coords.speed < 0,5 m/s`) wandert die Referenz pro Update mit, sodass GPS-Jitter nicht zu Phantom-Distanz akkumuliert; bei Bewegung bleibt die Referenz liegen, bis der Jitter-Filter überschritten ist, sodass kleine Schritte korrekt kumulieren.

## v1.6.0

### Bugfixes

- **Distanz wurde im lokalen Modus nicht akkumuliert:** Eine fehlende Import-Anweisung (`MIN_DISTANCE_JITTER_FILTER`) führte dazu, dass der Jitter-Check stets fehlschlug und keine Distanz addiert wurde. Fix: Import ergänzt.
- **Mehrfach registrierte Background-Task:** `TaskManager.defineTask` wurde bei jedem Trip-Start erneut aufgerufen, wodurch alte Closures aktiv blieben und mehrfach feuern konnten. Fix: Task wird einmalig auf Modul-Ebene definiert; der Callback wird über eine Modul-Referenz ausgetauscht.
- **Fremde Tasks wurden mit-deregistriert:** Beim Trip-Ende rief die App `TaskManager.unregisterAllTasksAsync()` auf, was potenziell auch andere Tasks betraf. Fix: Nur noch `stopLocationUpdatesAsync` für die spezifische Background-Task; Aufräumen mit `hasStartedLocationUpdatesAsync`-Check.
- **Tacho zeigte bei langsamer Fahrt fälschlich 0 km/h:** Im lokalen Modus wurde die Geschwindigkeit nur aus Distanz/Zeit berechnet, was bei langsamen Bewegungen (~3 km/h) wegen GPS-Genauigkeitsschwellen scheiterte. Fix: Primär wird jetzt der GPS-eigene Speed (`loc.coords.speed`) verwendet, Haversine nur noch als Fallback. Außerdem Reset-Timeout von 3 → 8 Sekunden, damit der Tacho bei seltenen Updates nicht ständig auf 0 fällt.

### Neue Features

- **Foreground-Service-Notification (Android):** Während einer aktiven Fahrt erscheint eine dauerhafte Benachrichtigung „Fahrt läuft – Distanz und Geschwindigkeit werden im Hintergrund aufgezeichnet." Das hält den OS-Service stabil und verhindert, dass Android das Tracking unter Doze beendet. Vollständig lokalisiert (DE/EN).
- **Sichtbare Warnung bei abgelehnter Background-Permission:** Wer im Permission-Dialog „Später" wählt oder die System-Berechtigung ablehnt, sieht jetzt einen Hinweis: „Aufzeichnung eingeschränkt – Distanz und Geschwindigkeit werden nur aufgezeichnet, solange die App im Vordergrund geöffnet ist." Verhindert das stille Verlust-Szenario, in dem User glauben, das Tracking laufe weiter.

### Verbesserungen

- **Stabileres Background-Tracking (iOS):** `pausesUpdatesAutomatically: false`, `activityType: OtherNavigation` und `showsBackgroundLocationIndicator: true` setzen — das System pausiert die Updates nicht mehr selbständig, wenn es Stillstand vermutet, und der User sieht den blauen Indikator, während Tracking läuft.
- **AppState-Recovery während aktiver Fahrt:** Bei Rückkehr aus dem Hintergrund prüft die App, ob die Background-Task noch aktiv ist (`hasStartedLocationUpdatesAsync`), und startet sie bei Bedarf neu. Ohne Background-Permission greift Foreground-Tracking als Fallback.
- **Plausibilitäts-Cap (≈ 72 km/h):** GPS-Sprünge nach Empfangsverlust (Tunnel, Wald) werden in beiden Modi (Track und lokal) verworfen, statt fälschlich Distanz oder Geschwindigkeit zu erzeugen.
- **Distanz-Akkumulation bei Gap im lokalen Modus:** Statt die Distanz zwischen Hintergrund-Suspend und Resume zu verwerfen, wird sie akkumuliert — vorausgesetzt die implizite Geschwindigkeit ist plausibel. Reduziert den Distanzverlust beim Wiederöffnen der App.
- **Weicheres Accuracy-Gate (25 → 35 m):** Mehr GPS-Updates werden bei schlechtem Empfang (Wald, Brücken) akzeptiert; das Plausibilitäts-Cap fängt unrealistische Werte ab.
- **Speed-Konstanten intern auf m/s vereinheitlicht:** `STILLSTAND_THRESHOLD_MS` und `MAX_PLAUSIBLE_SPEED_MS` arbeiten jetzt in derselben Einheit (m/s); die Umrechnung in km/h erfolgt nur noch beim Dispatch an Redux/UI. Reine interne Refaktorierung, kein UI-Effekt.

### Sonstiges

- `fetch` aus `UIBackgroundModes` (iOS) entfernt — war ungenutzt.

## v1.5.0

### Bugfixes

- **Geschwindigkeit sinkt beim Anhalten nicht auf 0:** Die EMA-Glättung ließ die km/h-Anzeige nach dem Anhalten ~6 Sekunden lang langsam abklingen, statt sofort 0 zu zeigen. Fix: Bei Stillstand (Rohgeschwindigkeit unter 2 km/h) wird die Glättung übersprungen und sofort 0 angezeigt.

### Neue Features

- **Distanzmessung im Hintergrund:** Background Location Tracking wiederhergestellt. Während einer aktiven Fahrt wechselt die App auf `startLocationUpdatesAsync`, sodass GPS-Updates auch im Hintergrund ankommen und die Distanz korrekt weitergemessen wird. Beim Trip-Start wird die Background-Location-Permission angefragt (falls noch nicht erteilt). Beim Trip-Ende wird auf Foreground-Tracking zurückgewechselt.
- **Track-basierter Distanz-Fallback:** Im Normal-Modus (Track-Projektion) wird bei einem GPS-Gap (z.B. App-Resume) die verpasste Distanz anhand der Track-Positionen berechnet, statt sie zu verwerfen. Da die Draisine auf dem Gleis fährt, entspricht die Track-Distanz der tatsächlich gefahrenen Strecke.

### Sonstiges

- Datenschutzerklärung Abschnitt 3.2 aktualisiert: Erläutert die Hintergrund-Standorterfassung während aktiver Fahrten.

## v1.4.0

### Bugfixes

- **Distanzsprung nach App-Backgrounding (Lokaler Modus):** Wenn die App im Hintergrund war, wurde die Haversine-Distanz zwischen letzter und aktueller Position fälschlicherweise zur Gesamtdistanz addiert — das erzeugte einen fehlerhaften Sprung. Fix: Gap Detection im lokalen Modus, die bei großem Zeitsprung die Distanz überspringt.
- **Geschwindigkeit ging im Stillstand nicht auf 0 (Lokaler Modus):** GPS-Jitter im Stillstand erzeugte scheinbare Geschwindigkeiten von 3–5 km/h. Fix: Bewegung unterhalb der GPS-Genauigkeit wird als Rauschen ignoriert und nicht in die Geschwindigkeitsberechnung einbezogen.

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

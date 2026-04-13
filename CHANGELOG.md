# Changelog

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.1.1] - 2026-04-13

### Geändert

- POI-Description Schriftgröße von 12 auf 14 erhöht
- Trip-Overlay: Icon auf Speedometer geändert, zurückgelegte Strecke wird angezeigt
- POI "Bhf. Malente" (km 0,000) entfernt; Text auf "Bhf. Malente / Kurpark" übertragen
- Blinklichtanlage-Hinweise aus POI-Descriptions entfernt
- Wendepunkte bei km 2,500 und km 9,610 zeigen jetzt Andreaskreuz (Crossing-Priorität)
- Wendepunkt Bottervogel (km 2,800) auf Gleisposition korrigiert
- Feldweg km 13,940 als Wendepunkt markiert

### Behoben

- Rechtschreibfehler "seit Ihr" → "seid Ihr" (Bhf. Holsteinische Schweiz)

## [1.1.0] - 2026-04-10

### Geändert

- HomeScreen-Logik in Custom Hooks aufgeteilt (`useGPSProcessing`, `usePostTripFlow`, `useTripLifecycle`)
- Geschwindigkeitsberechnung verbessert: Stillstand-Filter und EMA-Glättung in eigene Funktion (`processSpeed`) ausgelagert
- Kaltstart-Erkennung: EMA-Glättung wird bei erstem Messwert übersprungen, damit niedrige Geschwindigkeiten nicht fälschlich als Stillstand gefiltert werden
- `eas.json` aus Git-Tracking entfernt (enthält Umgebungsvariablen); Template als `eas.json.example` bereitgestellt

## [1.0.0] - 2026-04-01

### Hinzugefügt

- Trip-Simulation (Demo-Modus) mit simulierten GPS-Positionen
- Trip-Summary nach Fahrtende mit Streckenübersicht
- Feedback-System (Bewertung + Text nach Trip)
- Trip-History: vergangene Fahrten einsehen und Feedback nachreichen
- Abfahrtstabelle
- Splash Screen
- Points of Interest mit Tooltips und Beschreibungen
- Fahrzeugwechsel während aktiver Fahrt
- Info-Bereich (Impressum, Datenschutz, Logos)
- Ladeindikator für Fahrzeuge
- Minimales Trip-Overlay (ersetzt Trip-Header)
- App-Icons für iOS und Android
- WebSocket-Integration für Echtzeit-Fahrzeugpositionen
- Umgebungsvariablen über `.env` (react-native-dotenv)

### Geändert

- Migration von Google Maps zu MapLibre GL (OpenFreeMap Tiles)
- Expo Upgrade von Version 48 auf 52
- Backend-Anbindung: REST-Polling durch WebSocket ersetzt
- Komplettes UI-Redesign
- Verbesserte Kartenanimationen und Kamera-Verhalten
- GPS-Geschwindigkeit mit EMA-Smoothing und Richtungserkennung
- Fahrzeug-Marker: Z-Order Fix
- Statusbar-Farben korrigiert (iOS + Android)
- Links in Texten klickbar
- New Architecture deaktiviert (MapLibre-Kompatibilität)

### Entfernt

- Google Maps API-Abhängigkeit
- Vehicle-API (Daten über WebSocket)
- QR-Code-Auswahl und -Komponenten
- Hintergrund-Location-Tracking (nur noch Foreground)
- Streckenauswahl-Screen (feste Strecke konfiguriert)

### Behoben

- Marker-Position oben links beim Laden (MapLibre-Bug)
- Tooltip-Verhalten auf Android
- Accordion-Darstellung auf Android
- Distanzberechnung für nächstes Hindernis
- POI-Marker-Positionierung
- Statusbar-Farbe auf verschiedenen Screens

---

## [0.1.0] - 2026-01-16

### Hinzugefügt

- Fork des Original-RailTrail-Projekts von [kieler/RailTrail](https://github.com/kieler/RailTrail)
- Projekt-Dokumentation (README, CONTRIBUTING)

### Geändert

- Projektstruktur für Produktivbetrieb angepasst
- Package-Konfiguration aktualisiert

### Ursprüngliche Features (vom Prototyp)

- Kartenansicht mit Google Maps Integration
- Live-Tracking der eigenen Position
- Trip-Management (Start/Stop)
- Fahrzeug-Auswahl
- Warnungen bei Bahnübergängen
- Warnungen bei Fahrzeugannäherung
- Hintergrund-Location-Tracking
- Mehrsprachigkeit (Deutsch/Englisch)
- Points of Interest Anzeige

---

## Ursprüngliche Entwicklung (CAU Kiel, 2023)

Das Original-Projekt wurde als studentischer Prototyp an der Christian-Albrechts-Universität zu Kiel entwickelt.

Für die vollständige Historie des Prototyps siehe:
https://github.com/kieler/RailTrail

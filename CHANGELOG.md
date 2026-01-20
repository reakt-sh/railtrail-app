# Changelog

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Hinzugefügt

- WebSocket-Integration für Echtzeit-Fahrzeugpositionen vom Production-Server
- Umgebungsvariablen über `.env` Datei (react-native-dotenv)
- `.env.example` Template für Entwickler

### Geändert

- Migration von Google Maps zu MapLibre GL (OpenFreeMap Tiles)
- Expo Upgrade von Version 48 auf 52
- Backend-Anbindung: REST-Polling durch WebSocket ersetzt
- Vehicle-Marker: Foreground und Background in einer PointAnnotation kombiniert (Z-Order Fix)
- New Architecture deaktiviert (Kompatibilität mit MapLibre)

### Entfernt

- Google Maps API-Abhängigkeit
- Vehicle-API (Daten kommen jetzt über WebSocket)
- Unnötige Auth-Logik für lokale Entwicklung

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

---

[Unreleased]: https://gitlab.uxma.io/hlb/railtrail-app/compare/v0.1.0...HEAD
[0.1.0]: https://gitlab.uxma.io/hlb/railtrail-app/-/releases/v0.1.0

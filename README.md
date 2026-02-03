# RailTrail Bordcomputer

> Digitaler Bordcomputer für Draisinen-Fahrzeuge auf der Strecke Malente–Lütjenburg

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Über dieses Projekt

Dieses Projekt ist eine Weiterentwicklung des [RailTrail-Prototyps](https://github.com/kieler/RailTrail), der 2023 als studentisches Projekt an der Christian-Albrechts-Universität zu Kiel (CAU) im Rahmen der [REAKT-Initiative](https://www.schiene-m-l.de/) entstanden ist.

**Ziel dieser Weiterentwicklung:** Transformation des Forschungs-Prototyps in ein produktionsreifes MVP (Minimum Viable Product) für den kommerziellen Einsatz im Draisinenverleih der HLB GmbH.

### Projektkontext

| | |
|---|---|
| **Auftraggeber** | HLB GmbH |
| **Projekt** | REAKT Cross-Re-Tour - Digitaler Bordcomputer für Draisinenverleih |
| **Strecke** | Malente–Lütjenburg (17 km, eingleisig, 7 Bahnübergänge) |
| **Ziel** | MVP einer produktionsreifen App für iOS & Android |

### Was der Prototyp bereits bietet

- Kartenansicht mit Live-Tracking der eigenen Position
- Points of Interest entlang der Strecke
- Echtzeit-Geschwindigkeitsanzeige
- Warnungen bei:
  - Annäherung an Bahnübergänge
  - Annäherung an andere Fahrzeuge
  - Entgegenkommende Fahrzeuge
- Hintergrund-Tracking während der Fahrt
- Mehrsprachigkeit (i18n)

## Schnellstart

### Voraussetzungen

- Node.js 18+
- npm oder yarn
- iOS Simulator (macOS) oder Android Emulator

### Installation

```bash
# Repository klonen
git clone https://github.com/reakt-sh/railtrail-app.git
cd railtrail-app

# Dependencies installieren
npm install

# Umgebungsvariablen einrichten
cp .env.example .env

# Entwicklungsserver starten
npx expo start
```

### iOS Build

```bash
# iOS Dependencies installieren
cd ios && pod install && cd ..

# iOS App bauen und starten
npx expo run:ios
```

**Hinweis:** Das Podfile enthält spezielle Konfiguration für MapLibre. Falls der Build fehlschlägt mit `Module 'MapLibre' not found`, siehe [Troubleshooting](#troubleshooting).

### Android Build

```bash
# Android App bauen und starten
npx expo run:android
```

### Konfiguration

Die App wird über Umgebungsvariablen in `.env` konfiguriert:

```bash
# Production Server (WebSocket für Echtzeit-Positionen)
POSITIONING_WS_URL=wss://railtrail.rtsys.informatik.uni-kiel.de/api/position-updates

# Local Development (optional)
# POSITIONING_WS_URL=ws://localhost:5010/position-updates

# API Timeout in milliseconds
API_TIMEOUT=3000

# Map Tile Server
MAP_STYLE_URL=https://tiles.openfreemap.org/styles/liberty
```

### Backend

Das Backend wird separat entwickelt:
- **Repository:** https://github.com/reakt-sh/railtrail
- **Production Server:** `railtrail.rtsys.informatik.uni-kiel.de`

Die App verbindet sich per WebSocket für Echtzeit-Positionsupdates der Fahrzeuge.

## Projektstruktur

```
.
├── api/              # Backend-Kommunikation
├── components/       # Wiederverwendbare UI-Komponenten
├── screens/          # Screen-Komponenten
├── redux/            # State Management
├── hooks/            # Custom React Hooks
├── effect-actions/   # Side-Effect Logik (API, Location)
├── navigation/       # React Navigation Setup
├── types/            # TypeScript Type Definitions
├── util/             # Utility-Funktionen & Konstanten
├── values/           # Design-Tokens (Farben, etc.)
└── assets/           # Icons, Bilder, Splash
```

## Troubleshooting

### iOS: `Module 'MapLibre' not found`

Dieser Fehler tritt auf, wenn das MapLibre iOS SDK nicht korrekt über Swift Package Manager eingebunden wird.

**Lösung:**

1. Stelle sicher, dass das Podfile die MapLibre-Konfiguration enthält:

```ruby
# Am Anfang des Podfiles (nach den require-Statements)
maplibre_path = File.join(__dir__, '../node_modules/@maplibre/maplibre-react-native/maplibre-react-native.podspec')
eval(File.read(maplibre_path), nil, maplibre_path)

# Im post_install Block
post_install do |installer|
  # ... andere post_install Aufrufe ...
  $MLRN.post_install(installer)
end
```

2. Pods neu installieren:

```bash
cd ios
rm -rf Pods Podfile.lock build
pod install
cd ..
```

3. Build neu starten:

```bash
npx expo run:ios --no-build-cache
```

### iOS: `expo-media-library` Compiler Warnings

Die Warnings `extra tokens at end of #ifndef directive` sind bekannte Issues im generierten Code und beeinträchtigen den Build nicht.

### iOS: Build schlägt nach Dependency-Update fehl

Nach dem Hinzufügen oder Aktualisieren von Dependencies:

```bash
cd ios
rm -rf Pods Podfile.lock build
pod install
cd ..
npx expo run:ios --no-build-cache
```

### Metro Bundler: Cache-Probleme

```bash
npx expo start --clear
```

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Informationen zur Mitarbeit am Projekt.

## Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

### Danksagung

Basiert auf dem [RailTrail-Projekt](https://github.com/kieler/RailTrail) der Christian-Albrechts-Universität zu Kiel (CAU), entwickelt 2023 im Rahmen der REAKT-Initiative.

---

**HLB GmbH / UXMA** | Projekt: REAKT Cross-Re-Tour

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

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Informationen zur Mitarbeit am Projekt.

## Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

### Danksagung

Basiert auf dem [RailTrail-Projekt](https://github.com/kieler/RailTrail) der Christian-Albrechts-Universität zu Kiel (CAU), entwickelt 2023 im Rahmen der REAKT-Initiative.

---

**HLB GmbH / UXMA** | Projekt: REAKT Cross-Re-Tour

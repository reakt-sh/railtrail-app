# Naturpark-Draisine Bordcomputer

> Digitaler Bordcomputer für Draisinen-Fahrzeuge auf der Strecke Malente–Lütjenburg

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Über dieses Projekt

Dieses Projekt ist eine Weiterentwicklung des [RailTrail-Prototyps](https://github.com/kieler/RailTrail), der 2023 als studentisches Projekt an der Christian-Albrechts-Universität zu Kiel (CAU) im Rahmen der [REAKT-Initiative](https://www.schiene-m-l.de/) entstanden ist.

**Ziel dieser Weiterentwicklung:** Transformation des Forschungs-Prototyps in ein produktionsreifes MVP (Minimum Viable Product) für den kommerziellen Einsatz im Draisinenverleih der HLB GmbH.

### Projektkontext

|                  |                                                                   |
| ---------------- | ----------------------------------------------------------------- |
| **Auftraggeber** | HLB GmbH                                                          |
| **Projekt**      | REAKT Cross-Re-Tour - Digitaler Bordcomputer für Draisinenverleih |
| **Strecke**      | Malente–Lütjenburg (17 km, eingleisig, 7 Bahnübergänge)           |
| **Ziel**         | MVP einer produktionsreifen App für iOS & Android                 |

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

# Dependencies installieren (Patches werden automatisch angewendet)
npm install

# Umgebungsvariablen einrichten
cp .env.example .env
```

### Development Build erstellen

Diese App verwendet einen **Development Build** (nicht Expo Go), da native Module wie MapLibre verwendet werden.

```bash
# Native Projekte generieren (iOS + Android)
npx expo prebuild

# iOS App bauen und starten
npx expo run:ios

# Android App bauen und starten
npx expo run:android
```

### Neustart nach Problemen

Falls der Build fehlschlägt oder nach größeren Änderungen:

```bash
# Alles bereinigen
rm -rf node_modules ios android package-lock.json

# Neu aufsetzen
npm install
npx expo prebuild
npx expo run:ios    # oder run:android
```

### Release Build

Für Release Builds auf physischen Testgeräten (ohne Xcode / Android Studio):

```bash
# iOS
npm run ios:release

# Android
npx expo run:android --variant release
```

### Expo Go (eingeschränkt)

Für schnelle UI-Änderungen ohne native Neukompilierung:

```bash
npx expo start
```

**Hinweis:** MapLibre und andere native Module funktionieren nur im Development Build, nicht in Expo Go.

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


# Demo-/Lokalmodus in der Fahrzeugauswahl anzeigen (optional, Default ohne Eintrag: false)
EXPO_PUBLIC_ENABLE_DEMO_MODE=false

# Feedback API Endpoint (optional – wenn nicht gesetzt, wird kein Feedback gesendet)
FEEDBACK_URL=https://example.com/api/feedback

# Track-Datei (dev-dummy | malente-luetjenburg)
TRACK_FILE=malente-luetjenburg
```

> Hinweis: Alle Variablen, die in `.env.example` stehen, müssen auch in der lokalen `.env` vorhanden sein — sonst bricht der Build (`safe: true` in `babel.config.js`).

### Demo-/Lokalmodus

Für Test- und Demo-Zwecke kann die App zwei virtuelle Fahrzeuge in die Fahrzeugauswahl einblenden:

- **Demo** – Simulierte Fahrt entlang der Strecke (7–15 km/h, automatisches Reversieren an den Streckenenden). Kein GPS und keine Backend-Verbindung nötig.
- **Lokal** – Echtes GPS-Tracking ohne Zuordnung zu einer realen Draisine. Nützlich für lokale Tests entlang der Strecke ohne Backend-Fahrzeug.

Aktivierung über die Env-Variable `EXPO_PUBLIC_ENABLE_DEMO_MODE`:

| Wert                     | Verhalten                                                |
| ------------------------ | -------------------------------------------------------- |
| nicht gesetzt (Default)  | Production-Modus – Demo und Lokal sind ausgeblendet.     |
| `true`                   | Dev/QA-Modus – Demo und Lokal erscheinen in der Auswahl. |
| `false` (oder sonstiges) | Production-Modus – Demo und Lokal sind ausgeblendet.     |

Die Variable ist als Default versteckt und muss nicht in der `.env` stehen — sie greift erst, wenn sie explizit auf `true` gesetzt wird. Für Release-Builds via EAS kann sie pro Build-Profile in `eas.json` gesetzt (Preview) oder weggelassen (Production) werden.

> Hinweis: Nach Änderung der Variable Metro-Cache leeren – `npx expo start -c` – sonst greift der neue Wert nicht.

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
├── navigation/       # React Navigation Setup
├── redux/            # State Management
├── contexts/         # React Contexts (Permissions, Trip-Lifecycle)
├── hooks/            # Custom React Hooks
├── effect-actions/   # Side-Effect Logik (API, Location)
├── constants/        # Design-Tokens, Farben, Fonts, App-Konstanten
├── types/            # TypeScript Type Definitions
├── util/             # Utility-Funktionen
├── scripts/          # Build-Helfer (z. B. EAS create-env.sh)
├── patches/          # patch-package-Patches für Dependencies
├── docs/             # Projektdokumentation
└── assets/           # Icons, Bilder, Splash
```

## Troubleshooting

### Generell: Build schlägt fehl

Bei den meisten Build-Problemen hilft ein kompletter Neustart:

```bash
rm -rf node_modules ios android package-lock.json
npm install
npx expo prebuild
npx expo run:ios    # oder run:android
```

### iOS: `Module 'MapLibre' not found`

Dieser Fehler tritt auf, wenn das MapLibre iOS SDK nicht korrekt eingebunden wird.

**Lösung:** Native Projekte neu generieren:

```bash
rm -rf ios
npx expo prebuild --platform ios
npx expo run:ios
```

### Android: `Cannot find native module`

Native Module fehlen nach Änderungen:

```bash
rm -rf android
npx expo prebuild --platform android
npx expo run:android
```

### Metro Bundler: Cache-Probleme

```bash
npx expo start --clear
```

### Patches

Diese App verwendet `patch-package` für Fixes in Dependencies. Patches liegen in `/patches/` und werden automatisch bei `npm install` angewendet.

Aktuell gepatchte Packages:

- `@maplibre/maplibre-react-native` - Null-Check für Subview in `MLRNMapView.m` (verhindert iOS-Crash beim Mounten)

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Informationen zur Mitarbeit am Projekt.

## Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

### Danksagung

Basiert auf dem [RailTrail-Projekt](https://github.com/kieler/RailTrail) der Christian-Albrechts-Universität zu Kiel (CAU), entwickelt 2023 im Rahmen der REAKT-Initiative.

---

**HLB GmbH / UXMA** | Projekt: REAKT Cross-Re-Tour

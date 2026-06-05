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

Für Release Builds auf physischen Testgeräten (ohne Xcode/Android Studio):

```bash
 npx expo run:ios --device --configuration Release
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

# Demo-/Lokalmodus in der Fahrzeugauswahl anzeigen (true | false)
ENABLE_DEMO_MODE=false
```

> Hinweis: Alle Variablen, die in `.env.example` stehen, müssen auch in der lokalen `.env` vorhanden sein — sonst bricht der Build (`safe: true` in `babel.config.js`).

### Demo-/Lokalmodus

Für Test- und Demo-Zwecke kann die App zwei virtuelle Fahrzeuge in die Fahrzeugauswahl einblenden:

- **Demo** – Simulierte Fahrt entlang der Strecke (7–15 km/h, automatisches Reversieren an den Streckenenden). Kein GPS und keine Backend-Verbindung nötig.
- **Lokal** – Echtes GPS-Tracking ohne Zuordnung zu einer realen Draisine. Nützlich für lokale Tests entlang der Strecke ohne Backend-Fahrzeug.

Aktivierung über die Env-Variable `ENABLE_DEMO_MODE`:

| Wert            | Verhalten                                                |
| --------------- | -------------------------------------------------------- |
| `false` (Default) | Production-Modus – Demo und Lokal sind ausgeblendet.    |
| `true`          | Dev/QA-Modus – Demo und Lokal erscheinen in der Auswahl. |

Für Release-Builds via EAS empfiehlt es sich, `ENABLE_DEMO_MODE=false` explizit pro Build-Profile in `eas.json` zu setzen, damit Production-Binaries garantiert ohne Demo-Modus ausgeliefert werden.

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

### iOS: Swift Compiler Error in `expo-localization`

Falls ein Fehler wie `Switch must be exhaustive` in `LocalizationModule.swift` auftritt:

Der Patch in `/patches/expo-localization+16.0.1.patch` behebt dieses Problem automatisch bei `npm install`. Falls der Patch nicht angewendet wurde:

```bash
npx patch-package
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

- `expo-localization` - Swift exhaustive switch fix für neuere Xcode-Versionen

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Informationen zur Mitarbeit am Projekt.

## Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

### Danksagung

Basiert auf dem [RailTrail-Projekt](https://github.com/kieler/RailTrail) der Christian-Albrechts-Universität zu Kiel (CAU), entwickelt 2023 im Rahmen der REAKT-Initiative.

---

**HLB GmbH / UXMA** | Projekt: REAKT Cross-Re-Tour

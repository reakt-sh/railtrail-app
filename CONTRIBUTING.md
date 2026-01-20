# Contributing Guide

Vielen Dank für dein Interesse an der Mitarbeit am RailTrail Bordcomputer!

## Projektübersicht

Dieses Projekt entwickelt einen digitalen Bordcomputer für Draisinen-Fahrzeuge als React Native App.

## Entwicklungsumgebung einrichten

### Voraussetzungen

- **Node.js** 18 oder höher
- **npm** oder **yarn**
- **Git**
- **Expo CLI**: `npm install -g expo-cli`
- **IDE**: VS Code empfohlen (mit ESLint und Prettier Plugins)

### Für iOS-Entwicklung (macOS)
- Xcode (neueste Version)
- iOS Simulator

### Für Android-Entwicklung
- Android Studio
- Android SDK
- Android Emulator oder physisches Gerät

### Projekt starten

```bash
# Repository klonen
git clone https://gitlab.uxma.io/hlb/railtrail-app.git
cd railtrail-app

# Dependencies installieren
npm install

# Expo starten
npx expo start
```

## Code-Richtlinien

### TypeScript

- Alle neuen Dateien in TypeScript (.tsx für React-Komponenten, .ts für Logik)
- Strikte Typisierung verwenden (keine `any` Types ohne guten Grund)
- Interfaces für Props und State definieren

### Komponenten

- Funktionale Komponenten mit Hooks verwenden
- Komponenten-Dateien in kebab-case benennen (z.B. `map-markers.tsx`)
- Eine Komponente pro Datei
- Props-Interface am Anfang der Datei definieren

```typescript
interface ExternalProps {
  readonly title: string
  readonly onPress: () => void
}

type Props = ExternalProps

export const MyComponent = ({ title, onPress }: Props) => {
  // ...
}
```

### State Management

- Redux wird für globalen State verwendet
- Lokaler Component-State mit `useState` für UI-spezifisches
- Actions in `redux/` definieren
- Bestehende Patterns aus `app.ts` und `trip.ts` folgen

### Styling

- StyleSheet.create() für Styles verwenden
- Farben aus `values/color.ts` importieren
- Keine Inline-Styles (außer für dynamische Werte)

### Formatierung

- Prettier für automatische Formatierung
- 2 Spaces für Einrückung
- Semikolons weglassen (Projekt-Konvention)
- Trailing Commas verwenden

## Git Workflow

### Branch-Namenskonvention

```
feature/kurze-beschreibung
bugfix/issue-nummer-beschreibung
hotfix/kritische-beschreibung
```

### Commit-Messages

Wir folgen [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Neue Funktion hinzugefügt
fix: Bug in der Kartenansicht behoben
docs: README aktualisiert
style: Code-Formatierung angepasst
refactor: Komponente umstrukturiert
test: Tests hinzugefügt
chore: Dependencies aktualisiert
```

Beispiele:
```
feat: Geschwindigkeitswarnung bei Überschreitung hinzugefügt
fix: Kartenmarker wird jetzt korrekt rotiert
docs: API-Dokumentation erweitert
```

### Pull Requests

1. Branch von `main` erstellen
2. Änderungen implementieren
3. Lokal testen (iOS und Android)
4. Pull Request erstellen
5. Code Review abwarten
6. Nach Approval mergen

## Projektstruktur

```
.
├── api/              # Backend-Kommunikation
├── components/       # Wiederverwendbare UI-Komponenten
├── effect-actions/   # Side-Effect Logik (API-Calls, Location)
├── hooks/            # Custom React Hooks
├── navigation/       # React Navigation Setup
├── redux/            # State Management
├── screens/          # Screen-Komponenten
├── types/            # TypeScript Type Definitions
├── util/             # Utility-Funktionen & Konstanten
└── values/           # Design-Tokens (Farben, etc.)
```

## Lokalisierung

- Texte in `hooks/use-translation.ts` oder entsprechenden i18n-Dateien
- Keine hartkodierten deutschen/englischen Texte in Komponenten
- Keys beschreibend benennen: `homeSnackbarWarningTitle`

## Testing

Aktuell noch keine formale Test-Strategie. Vor Merge:
- Manuelles Testen auf iOS Simulator
- Manuelles Testen auf Android Emulator
- Edge Cases prüfen (keine Netzverbindung, keine GPS-Berechtigung)

## Fragen?

Bei Fragen zur Entwicklung wende dich an das Entwicklungsteam.

---

## Lizenz

Durch deine Mitarbeit stimmst du zu, dass dein Code unter der [EPL-2.0 Lizenz](LICENSE) veröffentlicht wird.

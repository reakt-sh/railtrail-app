# Preview Build erstellen (EAS)

Die EAS-Konfiguration ist bereits eingerichtet (`eas.json`, `app.json` mit Owner `railtrailapp`).

## 1. EAS CLI installieren (falls noch nicht vorhanden)

```bash
npm install -g eas-cli
```

> **Hinweis:** Falls du `npx eas ...` statt einer globalen Installation bevorzugst, muss `eas-cli` erst als lokale devDependency installiert werden: `npm install --save-dev eas-cli`. Alle Commands in dieser Anleitung gehen von einer globalen Installation aus.

Danach einloggen (falls noch nicht geschehen):

```bash
eas login
```

Hier den **Expo-Account** verwenden (der Account, unter dem das Projekt `railtrailapp` läuft).

## 2. Testgerät registrieren (nur iOS)

> **Hinweis:** Dieser Schritt ist nur für iOS nötig. Android-APKs können direkt installiert werden.

```bash
eas device:create
```

### Was passiert im Terminal:

1. **Apple ID eingeben** — Die Apple ID vom **Apple Developer Account** (Entwicklerteam), **nicht** die persönliche Apple ID auf dem Testgerät. EAS muss das Gerät im Apple Developer Portal registrieren.

2. **Registrierungsmethode wählen** — EAS bietet zwei Optionen:
   - **Website**: Generiert einen Link/QR-Code. Den Link auf dem Testgerät öffnen — das Gerät registriert sich dann automatisch (UDID wird übermittelt). Das ist die einfachste Methode.
   - **Manuell (UDID eingeben)**: Die UDID des Geräts manuell eingeben. Die UDID findet man z.B. über Finder (Mac) → Gerät anschließen → Geräteinformationen.

3. Nach der Registrierung ist das Gerät im Apple Developer Portal hinterlegt und kann Ad-Hoc-Builds empfangen.

> **Tipp:** Für mehrere Testgeräte `eas device:create` mehrfach ausführen.

## 3. Preview Build starten

```bash
eas build --profile preview --platform all
```

Oder nur für eine Plattform:

```bash
# Nur iOS
eas build --profile preview --platform ios

# Nur Android (kein Gerät-Registrierung nötig)
eas build --profile preview --platform android
```

### Was passiert beim Build:

1. **iOS**: EAS fragt nach Apple-ID-Credentials (gleiche wie in Schritt 2) und erstellt automatisch Zertifikate und Provisioning-Profile. Bei der ersten Ausführung werden diese in der EAS-Cloud gespeichert.

2. **Android**: Der Build erstellt eine `.apk`-Datei, die direkt auf jedem Android-Gerät installiert werden kann.

3. Der Build läuft in der Cloud (dauert ca. 10–20 Minuten). Am Ende erhältst du:
   - Einen **Download-Link** im Terminal
   - Einen **QR-Code** zum Scannen mit dem Testgerät
   - Den Build auch unter [expo.dev](https://expo.dev) → Projekt → Builds

## 4. App auf dem Testgerät installieren

### iOS

- QR-Code scannen oder Link öffnen → "Installieren" bestätigen
- Falls die App nicht startet: **Einstellungen → Allgemein → VPN & Geräteverwaltung** → dem Entwicklerzertifikat vertrauen

### Android

- APK-Link öffnen oder Datei herunterladen
- "Installation aus unbekannten Quellen" erlauben, falls nötig
- APK installieren und öffnen

# Changelog

## v1.2.0

### Bugfixes

- **GPS-Position friert ein nach App-Backgrounding (iOS):** Wenn die App während einer aktiven Fahrt in den Hintergrund ging (Handy gesperrt, andere App geöffnet), wurde die `watchPositionAsync`-Subscription von iOS beendet. Beim Zurückkehren in den Vordergrund kamen keine GPS-Updates mehr — Position und Geschwindigkeit blieben permanent eingefroren. Fix: AppState-Listener in HomeScreen, der bei Rückkehr in den Vordergrund die Location-Subscription automatisch erneuert.

### Verbesserungen

- Distazen für Warnungen zu Draisinen in der Nähe angepasst.

## v1.1.1

- remove logs
- add try/finally
- remove duplicated calculation

## v1.1.0

- Initial tracked release

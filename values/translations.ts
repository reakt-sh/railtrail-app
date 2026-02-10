const translations = {
  en: {
    // Dialog
    alertOk: 'OK',
    alertYes: 'Yes',
    alertNo: 'No',
    buttonContinue: 'Continue',

    navigationMap: 'Map',
    navigationInfo: 'Info',
    landingPageWelcome: 'Welcome to the Naturpark-Draisine',
    landingPageDescription:
      'With RailTrail you can enjoy improved safety and see a lot of useful information on your trips.',
    landingPagePermissionExplanation:
      'In order to be able to use the app to its full extent, we recommend activating the location permissions for the app.',
    landingPageButtonWithoutLocation: 'Continue without location data',
    landingPageButtonWithLocation: 'Continue with location data',
    landingPagePrivacyPolicy: 'I accept the privacy policy.',

    homeSnackbarStartTitle: 'Start trip',
    homeSnackbarStartMessage: 'Click here to select a vehicle and start the trip',
    homeSnackbarWarningTitle: 'Warning',
    homeSnackbarWarningCrossingMessage: 'Level crossing in %{distance} m',
    homeSnackbarWarningVehicleMessage: 'Vehicle in %{distance} m',
    homeSnackbarWarningVehicleHeadingTowardsUserMessage: 'Oncoming vehicle in %{distance} m',
    homeDialogEndTripTitle: 'End Trip',
    homeDialogEndTripMessage: 'Do you really want to end the current trip?',
    homeDialogBackgroundPermissionTripTitle: 'Location Permission',
    homeDialogBackgroundPermissionMessage:
      'For best app experience, it is recommended to enable background location access. In order to access the location, the app must remain open in the background.',

    // Draisine Info Screen
    infoDraisineEquipment: 'Equipment of the Draisine',
    infoDraisineRules: 'Rules',
    infoDraisineTurning: 'Rotating and turning the draisine',

    // Bottom Sheet
    bottomSheetVehicleId: 'Vehicle number',
    bottomSheetChangeVehicleId:
      'If you change your vehicle during the trip, you can select the new vehicle number here.',
    bottomSheetStartTripMessage:
      'Enter the vehicle number to continue. The number can usually be found on the seat.',
    bottomSheetSelectVehicle: 'Select your draisine:',
    bottomSheetNoVehicles: 'No draisines available. Please wait for vehicles to appear on the map.',
    bottomSheetAlertVehicleIdNotFoundTitle: 'Vehicle not found',
    bottomSheetAlertVehicleIdNotFoundMessage:
      'The vehicle could not be found. Make sure the vehicle number is correct and the correct route is selected.',

    // Trip Header
    headerDistance: 'Distance traveled',
    headerNextVehicle: 'Next vehicle',
    headerSpeed: 'Speed',
    headerNextCrossing: 'Next level crossing',
    headerVehicleId: 'Vehicle:',

    // Info Menu
    infoTitleDraisineInfo: 'Draisine Explanations',
    infoTitleTripHistory: 'Past Trips',
    infoTitleGoodToKnow: 'Good to Know',
    infoTitleContacts: 'Numbers and Addresses',
    infoTitleImprint: 'Imprint',
    infoTitlePrivacyPolicy: 'Privacy Policy',

    // POI Labels
    poiGeneric: 'Info',
    poiLevelCrossing: 'Level crossing',
    poiLesserLevelCrossing: 'Crossing',
    poiPicnic: 'Picnic area',
    poiTrackEnd: 'End of track',
    poiTurningPoint: 'Turning point',
    poiHalt: 'Stop',
    poiEndOfTheLine: 'End of track',

    // Contacts Screen
    contactTouristInfoMalente: 'Tourist Info Malente',
    contactTouristInfoMalenteSubtitle: 'Booking & handout of draisines',
    contactTouristInfoLuetjenburg: 'Tourist Info Lütjenburg',
    contactTourismuszentraleSubtitle: 'Operator of the draisine railway',

    // Good to Know Screen (FAQ)
    faqDepartureTimes: 'What are the departure times?',
    faqDepartureTimesAnswer:
      'May–September: Weekdays and Saturdays at 10:00 AM (3–6 hrs) and 1:30 PM (3 hrs). Sundays at 10:00 AM (3 hrs).\n\nOctober–April: Weekdays at 10:00 AM and 1:30 PM. Weekends on request.\n\nPlease arrive 30 minutes before departure for formalities and handover.',
    faqPassengers: 'How many people can ride?',
    faqPassengersAnswer:
      'Up to 4 people can ride on each draisine – 2 people pedal, 2 people can relax. At least one adult per draisine is required.',
    faqPrice: 'What does a draisine cost?',
    faqPriceAnswer:
      '3-hour tour: €50 per draisine\nFamily price (with children under 16): €40\nostseecard holders receive €2 discount.\n\nGroup tours with up to 60 people are possible.',
    faqHowItWorks: 'How does a draisine work?',
    faqHowItWorksAnswer:
      'The draisine is powered by pedaling, similar to a bicycle. Important: Draisines have a long braking distance – drive with foresight!\n\nThere is one-way traffic, turning is done at the turning point.',
    faqRules: 'What should I pay attention to during the ride?',
    faqRulesAnswer:
      '• Stop at all level crossings – road traffic has right of way\n• Do not stop near private properties\n• Animals are not recommended due to noise level\n• Wear long, sturdy clothing and solid footwear (vegetation along the track)',
    faqVouchers: 'Are there vouchers for draisine rides?',
    faqVouchersAnswer:
      'Yes, vouchers are available and valid for 3 years. Ask at the Tourist Info Malente.',

    // Imprint Screen
    imprintOperator: 'Operator',
    imprintAppDevelopment: 'App Development',
    imprintDisclaimer: 'Disclaimer',
    imprintDisclaimerText:
      'The contents of this app were created with the utmost care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content.',

    // Privacy Policy Screen
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicyPlaceholder: 'Privacy policy will be displayed here.',

    // Trip History Screen
    tripHistoryTitle: 'Past Trips',
    tripHistoryDeleteTitle: 'Delete trip',
    tripHistoryDeleteMessage: 'Do you really want to delete this trip?',
    tripHistoryDeleteCancel: 'Cancel',
    tripHistoryDeleteConfirm: 'Delete',
    tripHistoryEmpty: 'No trips recorded yet.',
    tripHistoryEmptySubtext: 'Start a trip on the map to see it here.',
    tripHistoryHours: 'hrs',
    tripHistoryMinutes: 'min',

    // Accessibility
    a11yGoBack: 'Go back',
    a11yLocationTrackingActive: 'Location tracking active',
    a11yShowMyLocation: 'Show my location',
    a11yCenterOnVehicle: 'Center on vehicle',
    a11yStartTrip: 'Start trip',
    a11yStopTrip: 'Stop trip',
    a11yChangeVehicle: 'Change vehicle',
    a11yChangeVehicleHint: 'Opens vehicle selection',
    a11ySelectVehicle: 'Select %{name}',
    a11yCallPhone: 'Call %{phone}',
    a11ySendEmail: 'Send email to %{email}',
    a11yExpandSection: 'Double tap to expand',
    a11yCollapseSection: 'Double tap to collapse',
    a11yAcceptPrivacyPolicy: 'Accept privacy policy',
    a11yDeleteTrip: 'Delete trip',
  },

  de: {
    // Dialog

    alertOk: 'Ok',
    alertYes: 'Ja',
    alertNo: 'Nein',
    buttonContinue: 'Weiter',

    navigationMap: 'Karte',
    navigationInfo: 'Info',

    landingPageWelcome: 'Willkommen bei der Naturpark-Draisine',
    landingPageDescription:
      'Mit RailTrail sind Sie auf der Schiene sicher unterwegs und bekommen viele nützliche Informationen angezeigt.',
    landingPagePermissionExplanation:
      'Um die App im vollen Funktionsumfang nutzen zu können, empfehlen wir Ihnen die Standortdaten für die App zu aktivieren.',
    landingPageButtonWithoutLocation: 'Weiter ohne Standortdaten',
    landingPageButtonWithLocation: 'Weiter mit Standortdaten',
    landingPagePrivacyPolicy: 'Ich stimme der Datenschutzerklärung zu.',

    homeSnackbarStartTitle: 'Fahrt starten',
    homeSnackbarStartMessage: 'Hier klicken um ein Fahrzeug auszuwählen und die Fahrt zu beginnen',
    homeSnackbarWarningTitle: 'Warnung',
    homeSnackbarWarningCrossingMessage: 'Bahnübergang in %{distance} m',
    homeSnackbarWarningVehicleMessage: 'Fahrzeug in %{distance} m',
    homeSnackbarWarningVehicleHeadingTowardsUserMessage:
      'Entgegenkommendes Fahrzeug in %{distance} m',
    homeDialogEndTripTitle: 'Fahrt beenden',
    homeDialogEndTripMessage: 'Möchten Sie die aktuelle Fahrt wirklich beenden?',
    homeDialogBackgroundPermissionTripTitle: 'Standortberechtigungen',
    homeDialogBackgroundPermissionMessage:
      'Um die App optimal nutzen zu können, wird die Berechtigung für den Standortzugriff im Hintergrund benötigt. Die App muss dafür weiterhin im Hintergrund geöffnet bleiben.',

    // Draisine Info Screen
    infoDraisineEquipment: 'Ausrüstung der Draisine',
    infoDraisineRules: 'Fahrtregeln',
    infoDraisineTurning: 'Drehen und Wenden der Draisine',

    // Bottom Sheet
    bottomSheetVehicleId: 'Fahrzeugnummer',
    bottomSheetChangeVehicleId:
      'Wenn Sie während des Ausfluges Ihr Fahrzeug wechseln, können Sie hier die neue Fahrzeugnummer wählen.',
    bottomSheetStartTripMessage:
      'Geben Sie die Fahrzeugnummer ein um fortzufahren. Die Nummer kann in der Regel auf der Sitzbank gefunden werden.',
    bottomSheetSelectVehicle: 'Wählen Sie Ihre Draisine:',
    bottomSheetNoVehicles:
      'Keine Draisinen verfügbar. Bitte warten Sie, bis Fahrzeuge auf der Karte erscheinen.',
    bottomSheetAlertVehicleIdNotFoundTitle: 'Fahrzeug nicht gefunden',
    bottomSheetAlertVehicleIdNotFoundMessage:
      'Das Fahrzeug konnte nicht gefunden werden. Stellen Sie sicher dass die Fahrzeugnummer korrekt ist und die richtige Strecke ausgewählt ist.',

    // Trip Header
    headerDistance: 'Zurückgelegte Distanz',
    headerNextVehicle: 'Nächstes Draisine',
    headerSpeed: 'Geschwindigkeit',
    headerNextCrossing: 'Nächster Bahnübergang',
    headerVehicleId: 'Draisine:',

    // Info Menu
    infoTitleDraisineInfo: 'Erklärungen zur Draisine',
    infoTitleTripHistory: 'Vergangene Fahrten',
    infoTitleGoodToKnow: 'Gut zu wissen',
    infoTitleContacts: 'Nummern und Adressen',
    infoTitleImprint: 'Impressum',
    infoTitlePrivacyPolicy: 'Datenschutzerklärung',

    // POI Labels
    poiGeneric: 'Info',
    poiLevelCrossing: 'Bahnübergang',
    poiLesserLevelCrossing: 'Querung',
    poiPicnic: 'Rastplatz',
    poiTrackEnd: 'Streckenende',
    poiTurningPoint: 'Wendepunkt',
    poiHalt: 'Haltepunkt',
    poiEndOfTheLine: 'Streckenende',

    // Contacts Screen
    contactTouristInfoMalente: 'Tourist Info Malente',
    contactTouristInfoMalenteSubtitle: 'Buchung & Ausgabe der Draisinen',
    contactTouristInfoLuetjenburg: 'Tourist Info Lütjenburg',
    contactTourismuszentraleSubtitle: 'Betreiber der Draisinenbahn',

    // Good to Know Screen (FAQ)
    faqDepartureTimes: 'Wie sind die Abfahrtszeiten?',
    faqDepartureTimesAnswer:
      'Mai–September: Wochentags und Samstags um 10:00 Uhr (3–6 Std) und 13:30 Uhr (3 Std). Sonntags um 10:00 Uhr (3 Std).\n\nOktober–April: Wochentags um 10:00 und 13:30 Uhr. Am Wochenende auf Anfrage.\n\nBitte erscheinen Sie 30 Minuten vor Abfahrt für Formalitäten und Übergabe.',
    faqPassengers: 'Wie viele Personen können mitfahren?',
    faqPassengersAnswer:
      'Auf jeder Draisine können bis zu 4 Personen mitfahren – 2 Personen treten, 2 Personen können sich entspannen. Mindestens ein Erwachsener pro Draisine ist erforderlich.',
    faqPrice: 'Was kostet eine Draisine?',
    faqPriceAnswer:
      '3-Stunden-Tour: 50€ pro Draisine\nFamilienpreis (mit Kindern unter 16): 40€\nostseecard-Inhaber erhalten 2€ Rabatt.\n\nGruppentouren mit bis zu 60 Personen sind möglich.',
    faqHowItWorks: 'Wie funktioniert eine Draisine?',
    faqHowItWorksAnswer:
      'Die Draisine wird durch Treten angetrieben, ähnlich wie ein Fahrrad. Wichtig: Draisinen haben einen langen Bremsweg – fahren Sie vorausschauend!\n\nEs herrscht Einbahnverkehr, das Wenden erfolgt am Wendepunkt.',
    faqRules: 'Was muss ich bei der Fahrt beachten?',
    faqRulesAnswer:
      '• An allen Bahnübergängen anhalten – Straßenverkehr hat Vorfahrt\n• Nicht in der Nähe von Privatgrundstücken anhalten\n• Tiere sind wegen des Lärmpegels nicht empfohlen\n• Tragen Sie lange, feste Kleidung und festes Schuhwerk (Vegetation entlang der Strecke)',
    faqVouchers: 'Gibt es Gutscheine für Draisinenfahrten?',
    faqVouchersAnswer:
      'Ja, Gutscheine sind erhältlich und 3 Jahre gültig. Fragen Sie bei der Tourist-Info Malente nach.',

    // Imprint Screen
    imprintOperator: 'Betreiber',
    imprintAppDevelopment: 'App-Entwicklung',
    imprintDisclaimer: 'Haftungsausschluss',
    imprintDisclaimerText:
      'Die Inhalte dieser App wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',

    // Privacy Policy Screen
    privacyPolicyTitle: 'Datenschutzerklärung',
    privacyPolicyPlaceholder: 'Datenschutzerklärung wird hier angezeigt.',

    // Trip History Screen
    tripHistoryTitle: 'Vergangene Fahrten',
    tripHistoryDeleteTitle: 'Fahrt löschen',
    tripHistoryDeleteMessage: 'Möchtest du diese Fahrt wirklich löschen?',
    tripHistoryDeleteCancel: 'Abbrechen',
    tripHistoryDeleteConfirm: 'Löschen',
    tripHistoryEmpty: 'Noch keine Fahrten aufgezeichnet.',
    tripHistoryEmptySubtext: 'Starte eine Fahrt auf der Karte, um sie hier zu sehen.',
    tripHistoryHours: 'Std',
    tripHistoryMinutes: 'Min',

    // Accessibility
    a11yGoBack: 'Zurück',
    a11yLocationTrackingActive: 'Standort wird verfolgt',
    a11yShowMyLocation: 'Meinen Standort anzeigen',
    a11yCenterOnVehicle: 'Auf Fahrzeug zentrieren',
    a11yStartTrip: 'Fahrt starten',
    a11yStopTrip: 'Fahrt beenden',
    a11yChangeVehicle: 'Fahrzeug wechseln',
    a11yChangeVehicleHint: 'Öffnet Fahrzeugauswahl',
    a11ySelectVehicle: '%{name} auswählen',
    a11yCallPhone: '%{phone} anrufen',
    a11ySendEmail: 'E-Mail an %{email} senden',
    a11yExpandSection: 'Doppeltippen zum Öffnen',
    a11yCollapseSection: 'Doppeltippen zum Schließen',
    a11yAcceptPrivacyPolicy: 'Datenschutzerklärung akzeptieren',
    a11yDeleteTrip: 'Fahrt löschen',
  },
};
export { translations };

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
    landingPageButtonWithLocation: "Let's go",
    landingPagePrivacyPolicyPrefix: 'I accept the ',
    landingPagePrivacyPolicyLink: 'privacy policy',
    landingPagePrivacyPolicySuffix: '.',

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

    // Trip Drawer
    drawerNoActiveTrip: 'No active trip.\nStart a trip to see details here.',
    drawerUnknownVehicle: 'Unknown vehicle',
    drawerTripStats: 'Trip Statistics',
    drawerSpeed: 'Speed',
    drawerDistance: 'Distance traveled',
    drawerElapsedTime: 'Elapsed time',
    drawerUpcoming: 'Upcoming',
    drawerNextDraisine: 'Next draisine',
    drawerNextCrossing: 'Next level crossing',
    drawerNextTurningPoint: 'Next turning point',
    drawerRidingTips: 'Riding Tips',

    // QR Scanner
    qrScannerTitle: 'Scan QR Code',
    qrScannerSubtitle: 'Point your camera at the QR code on your draisine',
    qrScannerManualEntry: 'Select draisine manually',
    qrScannerLoadingCamera: 'Loading camera...',
    qrScannerPermissionRequired: 'Camera permission is required to scan QR codes',
    qrScannerGrantPermission: 'Grant Permission',

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
    privacyPolicySubtitle: 'Draisine On-Board Computer App\nLast updated: [DATE TO BE ADDED]',

    privacySection1Title: '1. Data Controller',
    privacySection1Content:
      'The data controller within the meaning of the General Data Protection Regulation (GDPR) is:\n\nHLB GmbH\n[Street and house number]\n[Postal code City]\nEmail: [Email address]\nPhone: [Phone number]\n\n[If a data protection officer has been appointed:]\nData Protection Officer: [Name / Contact details]',

    privacySection2Title: '2. Overview of Data Processing',
    privacySection2Content:
      'This app serves as a digital on-board computer for the draisine rental service on the Malente–Lütjenburg railway line. It has been deliberately designed to be privacy-friendly: there is no user registration, no login, no tracking, and no analytics tools. The app processes as little personal data as possible.\n\nIn the following, we inform you about what data is processed when using the app, for what purpose, and on what legal basis.',

    privacySection3Title: '3. Location Data (GPS)',
    privacySection3Content:
      "3.1 Local Use of Your Location Data\n\nIf you grant the app permission to access your mobile device's location, your GPS data is processed exclusively locally on your device. The location data is used to:\n\n• Display your own position on the route map,\n• Project your position onto the route (so-called snapping),\n• Calculate trip information such as speed and distance traveled.\n\nYour GPS data is never transmitted to a server. It does not leave your device and is not stored. When you close the app, the location data is discarded.\n\nLegal basis: Your consent pursuant to Art. 6(1)(a) GDPR, which you grant via the location permission of your operating system (iOS/Android). You can revoke the permission at any time in the device settings. The app can also be used without location permission – in this case, only the position of your draisine based on GNSS tracker data will be displayed.\n\n3.2 No Background Location Collection\n\nThe app only collects your location while it is active in the foreground. No location collection takes place in the background.",

    privacySection4Title: '4. Reception of Draisine Position Data',
    privacySection4Content:
      'The app receives position data of all draisines on the route from the backend server via a WebSocket connection. This data comes from the GNSS trackers (hardware) mounted on the draisines and is not generated by the app or your device.\n\nWhen establishing the WebSocket connection, your IP address is technically transmitted to the backend server. During operation, the app only sends a technical heartbeat signal ("ping") to maintain the connection. No personal data is sent to the server.\n\nServer location: The backend server is operated by Christian-Albrechts-Universität zu Kiel (CAU) in Germany.\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR. The connection is required for the core function of the app (display of draisine positions). The IP address is only processed within the scope of the technically necessary connection.',

    privacySection5Title: '5. Local Data Storage',
    privacySection5Content:
      'The app stores summaries of your trips locally on your device (using AsyncStorage). Only the following is stored:\n\n• Trip ID (internally generated),\n• Start and end time of the trip,\n• Draisine number and name,\n• Total distance traveled.\n\nNo GPS coordinates, no movement profiles, and no personal data are stored. This data remains exclusively on your device and is not transmitted to third parties. You can delete this data at any time by clearing the app data in your device settings or uninstalling the app.\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR (provision of trip history function). The data is only stored locally on your device.',

    privacySection6Title: '6. Map Display (MapLibre)',
    privacySection6Content:
      'The app uses MapLibre, an open-source map library, for map display. The map tiles are loaded from an external server. In this process, your IP address is technically transmitted to the tile server.\n\n[NOTE: The specific tile server provider must be added here, e.g., OpenStreetMap Foundation, Maptiler, or a self-hosted server. Different privacy notices may apply depending on the provider.]\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR. The map display is a core function of the app.',

    privacySection7Title: '7. Embedded YouTube Videos',
    privacySection7Content:
      "The app contains embedded YouTube videos (e.g., instructions for using the draisines and securing level crossings). The embedding is done via YouTube's enhanced privacy mode.\n\nWhen playing a video, a connection is established to servers of Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). The following data is transmitted to Google:\n\n• Your IP address,\n• The video accessed,\n• Technical information about your device and browser.\n\nIf you are logged into your Google account, Google may associate the video access with your profile. Google may also transfer the data to the USA. The transfer to the USA is based on the EU-US Data Privacy Framework (adequacy decision of the EU Commission pursuant to Art. 45 GDPR).\n\nMore information can be found in Google's privacy policy: https://policies.google.com/privacy\n\nLegal basis: Consent pursuant to Art. 6(1)(a) GDPR. The videos are only loaded when you actively play them.",

    privacySection8Title: '8. Feedback Form',
    privacySection8Content:
      'The app offers an anonymous feedback form where you can submit a star rating and optionally a free-text comment. The rating is transmitted without any personal reference – no IP address, device ID, draisine number, or other identifying characteristics are sent.\n\nLegal basis: Since no personal data is processed, the GDPR is not applicable to the mere feedback submission. If you provide personal data in the free text, processing is based on your consent pursuant to Art. 6(1)(a) GDPR.',

    privacySection9Title: '9. No Further Data Processing',
    privacySection9Content:
      'The app uses:\n\n• No user tracking or analytics (e.g., Firebase, Google Analytics),\n• No advertising or advertising IDs,\n• No social media plugins,\n• No user accounts or registration,\n• No cookies or comparable tracking technologies,\n• No sharing of data with third parties (except for the technical connections mentioned above).',

    privacySection10Title: '10. Your Rights',
    privacySection10Content:
      'You have the following rights under the GDPR:\n\n• Right to information (Art. 15 GDPR): You can request information about the personal data we process.\n• Right to rectification (Art. 16 GDPR): You can request the correction of inaccurate data.\n• Right to erasure (Art. 17 GDPR): You can request the deletion of your data if the conditions are met.\n• Right to restriction of processing (Art. 18 GDPR)\n• Right to data portability (Art. 20 GDPR)\n• Right to object (Art. 21 GDPR): You can object to processing based on legitimate interests.\n• Right to withdraw consent (Art. 7(3) GDPR): You can withdraw consent granted (e.g., location permission) at any time with effect for the future.\n\nTo exercise your rights, please contact the data controller mentioned above.',

    privacySection11Title: '11. Right to Lodge a Complaint',
    privacySection11Content:
      'If you believe that the processing of your personal data violates the GDPR, you have the right to lodge a complaint with a data protection supervisory authority.\n\nThe responsible supervisory authority is:\n\nUnabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)\nHolstenstraße 98, 24103 Kiel, Germany\nPhone: +49 431 988-1200\nEmail: mail@datenschutzzentrum.de\nhttps://www.datenschutzzentrum.de',

    privacySection12Title: '12. Changes to This Privacy Policy',
    privacySection12Content:
      'We reserve the right to adapt this privacy policy to accommodate changes in legislation or changes to the app. The current version is always available in the app.',

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

    // Language Selection
    languageLabel: 'Language',
    languageValue: 'English',

    // Trip Controls
    tripControlsScanDraisine: 'Scan draisine',
    tripControlsSelectDraisine: 'Select draisine',
    tripControlsEnterNumber: 'Enter number',

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
    a11yOpenDrawer: 'Open trip details',
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
    landingPageButtonWithLocation: "Los geht's",
    landingPagePrivacyPolicyPrefix: 'Ich stimme der ',
    landingPagePrivacyPolicyLink: 'Datenschutzerklärung',
    landingPagePrivacyPolicySuffix: ' zu.',

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

    // Trip Drawer
    drawerNoActiveTrip: 'Keine aktive Fahrt.\nStarten Sie eine Fahrt, um Details hier zu sehen.',
    drawerUnknownVehicle: 'Unbekanntes Fahrzeug',
    drawerTripStats: 'Fahrtstatistik',
    drawerSpeed: 'Geschwindigkeit',
    drawerDistance: 'Zurückgelegte Distanz',
    drawerElapsedTime: 'Verstrichene Zeit',
    drawerUpcoming: 'Voraus',
    drawerNextDraisine: 'Nächste Draisine',
    drawerNextCrossing: 'Nächster Bahnübergang',
    drawerNextTurningPoint: 'Nächster Wendepunkt',
    drawerRidingTips: 'Fahr-Tipps',

    // QR Scanner
    qrScannerTitle: 'QR-Code scannen',
    qrScannerSubtitle: 'Richten Sie Ihre Kamera auf den QR-Code Ihrer Draisine',
    qrScannerManualEntry: 'Draisine manuell wählen',
    qrScannerLoadingCamera: 'Kamera wird geladen...',
    qrScannerPermissionRequired: 'Kameraberechtigung wird zum Scannen von QR-Codes benötigt',
    qrScannerGrantPermission: 'Berechtigung erteilen',

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
    privacyPolicySubtitle: 'Draisinen-Bordcomputer App\nStand: [DATUM EINFÜGEN]',

    privacySection1Title: '1. Verantwortlicher',
    privacySection1Content:
      'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:\n\nHLB GmbH\n[Straße und Hausnummer]\n[PLZ Ort]\nE-Mail: [E-Mail-Adresse]\nTelefon: [Telefonnummer]\n\n[Sofern ein Datenschutzbeauftragter bestellt ist:]\nDatenschutzbeauftragte/r: [Name / Kontaktdaten]',

    privacySection2Title: '2. Übersicht der Datenverarbeitung',
    privacySection2Content:
      'Diese App dient als digitaler Bordcomputer für den Draisinenverleih auf der Bahnstrecke Malente–Lütjenburg. Sie wurde bewusst datenschutzfreundlich gestaltet: Es gibt keine Nutzerregistrierung, kein Login, kein Tracking und keine Analyse-Tools. Die App verarbeitet so wenig personenbezogene Daten wie möglich.\n\nIm Folgenden informieren wir Sie darüber, welche Daten bei der Nutzung der App verarbeitet werden, zu welchem Zweck und auf welcher Rechtsgrundlage.',

    privacySection3Title: '3. Standortdaten (GPS)',
    privacySection3Content:
      '3.1 Lokale Nutzung Ihrer Standortdaten\n\nWenn Sie der App die Berechtigung erteilen, auf den Standort Ihres Mobilgeräts zuzugreifen, werden Ihre GPS-Daten ausschließlich lokal auf Ihrem Gerät verarbeitet. Die Standortdaten werden verwendet, um:\n\n• Ihre eigene Position auf der Streckenkarte anzuzeigen,\n• Ihre Position auf den Streckenverlauf zu projizieren (sog. Snapping),\n• Fahrtinformationen wie Geschwindigkeit und zurückgelegte Distanz zu berechnen.\n\nIhre GPS-Daten werden zu keinem Zeitpunkt an einen Server übertragen. Sie verlassen Ihr Gerät nicht und werden nicht gespeichert. Wenn Sie die App schließen, werden die Standortdaten verworfen.\n\nRechtsgrundlage: Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO, die Sie über die Standortberechtigung Ihres Betriebssystems (iOS/Android) erteilen. Sie können die Berechtigung jederzeit in den Geräteeinstellungen widerrufen. Die App ist auch ohne Standortfreigabe nutzbar – in diesem Fall wird nur die Position Ihrer Draisine anhand der GNSS-Tracker-Daten angezeigt.\n\n3.2 Keine Hintergrund-Standorterfassung\n\nDie App erfasst Ihren Standort ausschließlich, während sie im Vordergrund aktiv ist. Es findet keine Standorterfassung im Hintergrund statt.',

    privacySection4Title: '4. Empfang von Draisinen-Positionsdaten',
    privacySection4Content:
      'Die App empfängt über eine WebSocket-Verbindung die Positionsdaten aller Draisinen auf der Strecke vom Backend-Server. Diese Daten stammen von den an den Draisinen montierten GNSS-Trackern (Hardware) und werden nicht durch die App oder Ihr Gerät erzeugt.\n\nBeim Aufbau der WebSocket-Verbindung wird technisch bedingt Ihre IP-Adresse an den Backend-Server übertragen. Die App sendet im laufenden Betrieb lediglich ein technisches Heartbeat-Signal („Ping") zur Aufrechterhaltung der Verbindung. Es werden keine personenbezogenen Daten an den Server gesendet.\n\nServer-Standort: Der Backend-Server wird von der Christian-Albrechts-Universität zu Kiel (CAU) in Deutschland betrieben.\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO. Die Verbindung ist für die Kernfunktion der App (Anzeige der Draisinen-Positionen) erforderlich. Die IP-Adresse wird nur im Rahmen der technisch notwendigen Verbindung verarbeitet.',

    privacySection5Title: '5. Lokale Datenspeicherung',
    privacySection5Content:
      'Die App speichert Zusammenfassungen Ihrer Fahrten lokal auf Ihrem Gerät (mittels AsyncStorage). Gespeichert werden ausschließlich:\n\n• Fahrt-ID (intern generiert),\n• Start- und Endzeit der Fahrt,\n• Draisinen-Nummer und -Name,\n• zurückgelegte Gesamtdistanz.\n\nEs werden keine GPS-Koordinaten, keine Bewegungsprofile und keine personenbezogenen Daten gespeichert. Diese Daten verbleiben ausschließlich auf Ihrem Gerät und werden nicht an Dritte übermittelt. Sie können diese Daten jederzeit löschen, indem Sie die App-Daten in Ihren Geräteeinstellungen löschen oder die App deinstallieren.\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO (Bereitstellung der Fahrthistorie-Funktion). Die Daten werden nur lokal auf Ihrem Gerät gespeichert.',

    privacySection6Title: '6. Kartendarstellung (MapLibre)',
    privacySection6Content:
      'Für die Kartendarstellung verwendet die App MapLibre, eine quelloffene Kartenbibliothek. Die Kartenkacheln (Tiles) werden von einem externen Server geladen. Dabei wird technisch bedingt Ihre IP-Adresse an den Tile-Server übertragen.\n\n[HINWEIS: Hier muss der konkrete Tile-Server-Anbieter ergänzt werden, z. B. OpenStreetMap Foundation, Maptiler, oder ein selbst gehosteter Server. Je nach Anbieter können unterschiedliche Datenschutzhinweise gelten.]\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO. Die Kartenanzeige ist eine Kernfunktion der App.',

    privacySection7Title: '7. Eingebettete YouTube-Videos',
    privacySection7Content:
      'Die App enthält eingebettete YouTube-Videos (z. B. Anleitungen zur Nutzung der Draisinen und zur Sicherung von Bahnübergängen). Die Einbettung erfolgt über den erweiterten Datenschutzmodus von YouTube.\n\nBeim Abspielen eines Videos wird eine Verbindung zu Servern von Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) hergestellt. Dabei werden folgende Daten an Google übertragen:\n\n• Ihre IP-Adresse,\n• das aufgerufene Video,\n• technische Informationen zu Ihrem Gerät und Browser.\n\nSofern Sie in Ihrem Google-Konto eingeloggt sind, kann Google den Videoabruf Ihrem Profil zuordnen. Google kann die Daten auch in die USA übertragen. Die Übertragung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der EU-Kommission gem. Art. 45 DSGVO).\n\nWeitere Informationen finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy\n\nRechtsgrundlage: Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO. Die Videos werden erst geladen, wenn Sie diese aktiv abspielen.',

    privacySection8Title: '8. Feedback-Formular',
    privacySection8Content:
      'Die App bietet ein anonymes Feedback-Formular, über das Sie eine Sternebewertung und optional einen Freitext-Kommentar abgeben können. Die Bewertung wird ohne jeglichen Personenbezug übermittelt – es werden keine IP-Adresse, Geräte-ID, Draisinen-Nummer oder sonstige identifizierenden Merkmale mitgesendet.\n\nRechtsgrundlage: Da keine personenbezogenen Daten verarbeitet werden, ist die DSGVO auf die reine Feedback-Übermittlung nicht anwendbar. Sollten Sie im Freitext personenbezogene Daten angeben, erfolgt die Verarbeitung auf Grundlage Ihrer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.',

    privacySection9Title: '9. Keine weiteren Datenverarbeitungen',
    privacySection9Content:
      'Die App verwendet:\n\n• kein Nutzer-Tracking oder Analytics (z. B. Firebase, Google Analytics),\n• keine Werbung oder Werbe-IDs,\n• keine Social-Media-Plugins,\n• keine Nutzerkonten oder Registrierung,\n• keine Cookies oder vergleichbare Tracking-Technologien,\n• keine Weitergabe von Daten an Dritte (außer den oben genannten technischen Verbindungen).',

    privacySection10Title: '10. Ihre Rechte',
    privacySection10Content:
      'Sie haben nach der DSGVO folgende Rechte:\n\n• Auskunftsrecht (Art. 15 DSGVO): Sie können Auskunft über die von uns verarbeiteten personenbezogenen Daten verlangen.\n• Recht auf Berichtigung (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.\n• Recht auf Löschung (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, sofern die Voraussetzungen vorliegen.\n• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n• Widerspruchsrecht (Art. 21 DSGVO): Sie können der Verarbeitung auf Grundlage berechtigter Interessen widersprechen.\n• Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO): Erteilte Einwilligungen (z. B. Standortfreigabe) können Sie jederzeit mit Wirkung für die Zukunft widerrufen.\n\nZur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte verantwortliche Stelle.',

    privacySection11Title: '11. Beschwerderecht bei einer Aufsichtsbehörde',
    privacySection11Content:
      'Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzulegen.\n\nDie zuständige Aufsichtsbehörde ist:\n\nUnabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)\nHolstenstraße 98, 24103 Kiel\nTelefon: +49 431 988-1200\nE-Mail: mail@datenschutzzentrum.de\nhttps://www.datenschutzzentrum.de',

    privacySection12Title: '12. Änderungen dieser Datenschutzerklärung',
    privacySection12Content:
      'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslage oder bei Änderungen der App anzupassen. Die aktuelle Fassung ist stets in der App abrufbar.',

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

    // Language Selection
    languageLabel: 'Sprache',
    languageValue: 'Deutsch',

    // Trip Controls
    tripControlsScanDraisine: 'Draisine scannen',
    tripControlsSelectDraisine: 'Draisine auswählen',
    tripControlsEnterNumber: 'Nummer eingeben',

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
    a11yOpenDrawer: 'Fahrtdetails öffnen',
  },
};
export { translations };

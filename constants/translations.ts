const translations = {
  en: {
    // Dialog
    alertOk: 'OK',
    alertYes: 'Yes',
    alertNo: 'No',
    alertLater: 'Later',
    buttonContinue: 'Continue',

    navigationMap: 'Map',
    navigationInfo: 'Info',
    landingPageWelcome: 'Welcome!',
    landingPageDescription:
      'With this App you can enjoy improved safety and see a lot of useful information on your trips.',
    landingPagePermissionExplanation:
      'In order to be able to use the full functionality, we recommend activating the location permissions for the app.',
    landingPageButtonWithLocation: "Let's go",
    landingPagePrivacyPolicyPrefix: 'I accept the ',
    landingPagePrivacyPolicyLink: 'privacy policy',
    landingPagePrivacyPolicySuffix: '.',

    homeSnackbarStartTitle: 'Start trip',
    homeSnackbarWarningTitle: 'Warning',
    homeSnackbarWarningCrossingMessage: 'Level crossing in %{distance} m',
    homeSnackbarWarningVehicleMessage: 'Railbike in %{distance} m',
    homeSnackbarWarningVehicleHeadingTowardsUserMessage: 'Oncoming railbike in %{distance} m',
    homeSnackbarInfoTitle: 'Info',
    homeSnackbarInfoOffRouteMessage: 'You are far from the track. The trip is paused.',
    homeDialogOffRouteStartTitle: 'Far from track',
    homeDialogOffRouteStartMessage:
      'You are far from the track. Do you still want to start the trip?',
    homeDialogEndTripTitle: 'End Trip',
    homeDialogEndTripMessage: 'Do you really want to end the current trip?',
    homeDialogBackgroundPermissionTripTitle: 'Location Permission',
    homeDialogBackgroundPermissionMessage:
      'For best app experience, it is recommended to enable background location access. In order to access the location, the app must remain open in the background.',

    menuButtonLabel: 'More',
    tripPause: 'Pause trip',
    tripResume: 'Resume trip',

    // Draisine Info Screen
    infoDraisineDescription:
      "Railbikes are muscle-powered rail vehicles that were originally used primarily for track maintenance and line inspections. It's nothing more than a bicycle designed for rails. Two people sit on the outside and pedal just like on a regular bicycle. One or two people can sit on the center bench and enjoy the ride. You also have plenty of storage space on the vehicles—especially under the bench. The brake is located at the front as a foot pedal; there is no coaster brake.",
    infoDraisineEquipment: 'Setup',
    infoDraisineRules: 'Rules',
    infoDraisineTurning: 'Turning',

    // Bottom Sheet
    bottomSheetVehicleId: 'Railbike Selection',
    bottomSheetChangeVehicleId:
      'If you change your railbike during the trip, you can select the new railbike number here.',
    bottomSheetSelectVehicle: 'Which railbike do you want to use?',
    bottomSheetNoVehicles:
      'No railbikes available. Please wait for railbikes to appear on the map.',
    bottomSheetReload: 'Reload',

    // Trip Header
    headerDistance: 'Distance traveled',
    headerNextVehicle: 'Next railbike',
    headerSpeed: 'Speed',
    headerNextCrossing: 'Next level crossing',

    // Trip Drawer
    drawerNoActiveTrip: 'No active trip.\nStart a trip to see details here.',
    drawerUnknownVehicle: 'Unknown railbike',
    drawerTripStats: 'Trip Statistics',
    drawerSpeed: 'Speed',
    drawerDistance: 'Distance traveled',
    drawerElapsedTime: 'Elapsed time',
    drawerUpcoming: 'Upcoming',
    drawerNextDraisine: 'Next railbike',
    drawerNextCrossing: 'Next level crossing',
    drawerNextTurningPoint: 'Next turning point',
    drawerSecondTurningPoint: 'Following turning point',
    drawerRidingTips: 'Riding Tips',
    drawerChangeVehicle: 'Change railbike',

    // Info Menu
    infoTitleDraisineInfo: 'About the Railbike',
    infoTitleTripHistory: 'Past Trips',
    infoTitleGoodToKnow: 'Good to Know',
    infoTitleContacts: 'Distribution points / Service contacts',
    infoTitleRailwayProjects: 'Other projects along the railway',
    infoTitleRailwayHistory: 'History of the Railway',
    infoTitleImprint: 'Imprint',
    infoTitlePrivacyPolicy: 'Privacy Policy',

    // POI Labels
    poiGeneric: 'Info',
    poiLevelCrossing: 'Level crossing',
    poiLesserLevelCrossing: 'Crossing',
    poiPicnic: 'Stop/Picnic area',
    poiTrackEnd: 'End of track',
    poiTurningPoint: 'Turning point',
    poiHalt: 'Stop',
    poiTouristInfo: 'Tourist Info',
    poiBridge: 'Bridge',
    poiRoadCrossing: 'Road crossing',

    levelCrossingHint: 'Please stop and secure! 🦺',

    // Contacts Screen
    contactTouristInfoMalente: 'Tourist Info Malente',
    contactTouristInfoMalenteSubtitle: 'Booking & handout of railbikes',
    contactTouristInfoLuetjenburg: 'Tourist Info Lütjenburg',
    contactTouristInfoHint:
      'If you encounter any problems or have any questions during your trip, please contact your issuing office.',

    // Good to Know Screen (FAQ)
    faqDepartureTimes: 'What are the return and exchange policies?',
    faqDepartureTimesAnswer:
      'There is always a designated direction of travel on the railway line to prevent oncoming traffic. We must avoid this at all costs, as otherwise you could suddenly find yourselves facing each other on an open stretch of track without being able to take the handcar off the tracks at a turning point. Since oncoming traffic can also lead to dangerous situations, the designated directions of travel and the associated schedule must be strictly adhered to!',
    departureMalente: 'Departure Bad Malente-Gremsmühlen',
    departureLuetjenburg: 'Departure Lütjenburg',
    departureBookedTour: 'Booked tour',
    departureDayTour: 'Day tour',
    departure3hTour: '3-hour tour',
    departureDeparture: 'Departure',
    departureTurn: 'Turn (wherever you are)',
    departureArrivalLuetjenburg: 'Arrival in Lütjenburg',
    departureReturnStartLuetjenburg: 'Start return in Lütjenburg',
    departureReturn: 'Return',
    faqPrice: 'What does a railbike tour cost?',
    faqPriceAnswer:
      '3-hour tour: €50 per railbike\nFamily price (with children under 16): €40\nostseecard holders receive €2 discount.\n\nGroup tours with up to 100 people are possible.\nA day trip from Malente to Lütjenburg and back is also available daily. On this trip, you’ll travel from Malente to Lütjenburg in the morning and return in the afternoon. Cost: double the price of the 3-hour tour.',
    faqHowItWorks: 'How does a railbike work?',
    faqHowItWorksAnswer:
      'The trolley is powered by pedaling, similar to a bicycle. Important: Trolleys have a long braking distance – drive with foresight! Traffic always flows in one direction to avoid oncoming traffic on the track. Be sure to adhere to the departure, turning, and return times! You can turn the railbike at all turning points. Up to 4 people can ride on each railbike – 2 people pedal, 2 people can relax. At least one adult per railbike is required.',
    faqRules: 'What should I pay attention to during the ride?',
    faqRulesAnswer:
      '• A railbike never has right of way! Road and pedestrian traffic always has priority at all railroad crossings and road and path intersections. Therefore, please stop before every railroad crossing and only cross the road when there is no oncoming traffic. When crossing, one person wearing a high-visibility vest secures the crossing. • At least one adult must ride on each handcar. • Taking animals onto the railbike is not recommended, among other things due to the noise. • Due to the vegetation along the route, we recommend wearing long, sturdy clothing and sturdy shoes.',
    faqVouchers: 'Are there vouchers for railbike rides?',
    faqVouchersAnswer:
      'Yes, vouchers are available and valid for 3 years. Ask at the Tourist Info Malente or Luetjenburg or contact us by email at info@schiene-m-l.de.',

    //Railway Projects Screen
    railwayProjectsIntro:
      "The tracks you're riding on are used for other purposes besides the Holsteinische Schweiz Nature Park Trolley. Several projects are underway simultaneously on the Malente-Lütjenburg railway line. They are all supported and driven by the Schienenverkehr Malente-Lütjenburg e.V. association, which was founded in 2020 to save and revitalize the railway line.",
    railwayProjectsReaktTitle: 'REAKT Research Initiative',
    railwayProjectsReaktContent:
      'The Malente-Lütjenburg railway line is also being used for the REAKT research initiative. This initiative is exploring innovative rail vehicles and route concepts for rural railway lines. For example, it aims to investigate how on-demand two-way traffic can be implemented on single-track lines using autonomous vehicles. In addition, innovative concepts for railroad crossings, signal boxes, and control and safety technology based on digital technologies and modern sensor systems are being tested. REAKT comprises a large network of universities, industry partners, municipalities, and associations. Since 2025, the innovation community has been supported by the Federal Ministry of Research, Technology, and Space (BMFTR) as one of twenty innovation communities selected from nearly 500 applications. The Christian-Albrechts-University of Kiel (CAU) serves as the lead institution. The Malente-Lütjenburg railway line serves as a real-world laboratory for joint projects between partners from academia and industry. Test vehicles allow for optimal research into the rail transport of the future. For more information, visit https://www.reaktsh.de/',
    railwayProjectsHehsTitle: 'Special Train "Hein Lüttenborg"',
    railwayProjectsHehsContent:
      "On certain days, the Holsteinische Schweiz Historical Railway Association (HEHS) operates a railbus on the route. This means that on some days, you can ride a real train on the very same track where you'll be cycling on a rail bike. You can find the operating days, schedules, and prices at https://hehs-eisenbahn.de/",
    // Railway History Screen
    railwayHistoryContent:
      "The Malente-Lütjenburg railway line has a long and eventful history. Known affectionately as “Hein Lüttenborg,” it has gained national recognition and is considered one of the most scenic railway lines in northern Germany. It was opened in four construction phases between 1890 and 1892. For the line's opening, the intermediate stops Holsteinische Schweiz, Bruhnskoppel, Benz, and Kletkamp were put into service. The line quickly became of great importance for passenger and agricultural freight transport. It also played a key role in the development of tourism in Holsteinische Schweiz and Hohwacht Bay. It led to a veritable boom and was a major milestone in the area's settlement development. In 1954, operations were converted to railbuses. From then on, steam-hauled trains were no longer in service; instead, the famous little red railbuses took over. To allow even more people to access the railway directly, the small on-demand stops Malente Nord, Malkwitz, Flehm, Blekendorf, and Friederikenthal were opened. In the 1960s, a Bundeswehr barracks was opened in Lütjenburg, which, together with the Bundeswehr's important military training area in Todendorf near Lütjenburg, gave the railway line new relevance. The rural branch line was completely upgraded to handle military heavy-haul trains and expanded to accommodate trains with a total weight of up to 1,400 tons. This is otherwise uncommon for branch lines, and the line therefore continues to benefit from its excellent condition to this day. Due to increasing car traffic and ever-thinning schedules, the railway became uneconomical. Despite major protests in the region, DB discontinued passenger service in 1976. However, the line continued to be used for freight and military traffic until 1996. In addition, starting in the 1980s, it became a popular destination for excursion, special, and steam trains. Until the year 2000, numerous steam trains ran on the line every summer, which led to “Hein Lüttenborg” once again becoming an important tourist attraction. In 2000, DB finally discontinued this service as well, and the line was shut down. In 2004, the connecting switch to the rest ofthe network was removed at Malente Station. In 2008, a large part ofthe once-huge railway facilities (13 tracks!) in Lütjenburg, includingthe station building, was demolished. The line's fate seemed sealed; it had become overgrown with vegetation and was barely recognizable as a railway track. That is, until 2020, when a group of citizens came together to formthe Schienenverkehr Malente-Lütjenburg e.V. association.\nIn 2022, the line was savedand taken over bya holding company established bythe associationto implementthe association's goals througha phased reactivation. It has been in use asa handcarand research track since 2022. Since then, life has returnedtothe railwayline—andthe great storyof Hein Lüttenborg continues.",
    // Imprint Screen
    imprintOperator: 'Operator',
    imprintAppDevelopment: 'App Development',
    imprintDisclaimer: 'Disclaimer',
    imprintDisclaimerText:
      'The contents of this app were created with the utmost care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content.',

    // Privacy Policy Screen
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicySubtitle: 'Railbike On-Board Computer App\nLast updated: March 27, 2026',

    privacySection1Title: '1. Data Controller',
    privacySection1Content:
      'The data controller within the meaning of the General Data Protection Regulation (GDPR) is:\n\nHLB GmbH\nBahnhofstraße 3\n23714 Malente\nEmail: kontakt@hl-bahnstreckenverwaltung.de',

    privacySection2Title: '2. Overview of Data Processing',
    privacySection2Content:
      'This app serves as a digital on-board computer for the railbike rental service on the Malente–Lütjenburg railway line. It has been deliberately designed to be privacy-friendly: there is no user registration, no login, no tracking, and no analytics tools. The app processes as little personal data as possible.\n\nIn the following, we inform you about what data is processed when using the app, for what purpose, and on what legal basis.',

    privacySection3Title: '3. Location Data (GPS)',
    privacySection3Content:
      "3.1 Local Use of Your Location Data\n\nIf you grant the app permission to access your mobile device's location, your GPS data is processed exclusively locally on your device. The location data is used to:\n\n• Display your own position on the route map,\n• Project your position onto the route (so-called snapping),\n• Calculate trip information such as speed and distance traveled.\n\nYour GPS data is never transmitted to a server. It does not leave your device and is not stored. When you close the app, the location data is discarded.\n\nLegal basis: Your consent pursuant to Art. 6(1)(a) GDPR, which you grant via the location permission of your operating system (iOS/Android). You can revoke the permission at any time in the device settings. The app can also be used without location permission – in this case, only the position of your railbike based on GNSS tracker data will be displayed.\n\n3.2 No Background Location Collection\n\nThe app only collects your location while it is active in the foreground. No location collection takes place in the background.",

    privacySection4Title: '4. Reception of Railbike Position Data',
    privacySection4Content:
      'The app receives position data of all railbikes on the route from the backend server via a WebSocket connection. This data comes from the GNSS trackers (hardware) mounted on the railbikes and is not generated by the app or your device.\n\nWhen establishing the WebSocket connection, your IP address is technically transmitted to the backend server. During operation, the app only sends a technical heartbeat signal ("ping") to maintain the connection. No personal data is sent to the server.\n\nServer location: The backend server is operated by Christian-Albrechts-Universität zu Kiel (CAU) in Germany.\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR. The connection is required for the core function of the app (display of railbike positions). The IP address is only processed within the scope of the technically necessary connection.',

    privacySection5Title: '5. Local Data Storage',
    privacySection5Content:
      'The app stores summaries of your trips locally on your device (using AsyncStorage). Only the following is stored:\n\n• Trip ID (internally generated),\n• Start and end time of the trip,\n• Draisine number and name,\n• Total distance traveled.\n\nNo GPS coordinates, no movement profiles, and no personal data are stored. This data remains exclusively on your device and is not transmitted to third parties. You can delete this data at any time by clearing the app data in your device settings or uninstalling the app.\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR (provision of trip history function). The data is only stored locally on your device.',

    privacySection6Title: '6. Map Display (MapLibre)',
    privacySection6Content:
      'The app uses MapLibre, an open-source map library, for map display. The map tiles are loaded from OpenFreeMap (openfreemap.org), a free tile server based on OpenStreetMap data. When loading the map, your IP address is technically transmitted to the OpenFreeMap server.\n\nOpenFreeMap is an open-source project that provides map tiles without requiring registration or API keys. The underlying map data comes from OpenStreetMap contributors.\n\nLegal basis: Legitimate interest pursuant to Art. 6(1)(f) GDPR. The map display is a core function of the app.',

    privacySection7Title: '7. Embedded YouTube Videos',
    privacySection7Content:
      "The app contains embedded YouTube videos (e.g., instructions for using the railbikes and securing level crossings). The embedding is done via YouTube's enhanced privacy mode.\n\nWhen playing a video, a connection is established to servers of Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). The following data is transmitted to Google:\n\n• Your IP address,\n• The video accessed,\n• Technical information about your device and browser.\n\nIf you are logged into your Google account, Google may associate the video access with your profile. Google may also transfer the data to the USA. The transfer to the USA is based on the EU-US Data Privacy Framework (adequacy decision of the EU Commission pursuant to Art. 45 GDPR).\n\nMore information can be found in Google's privacy policy: https://policies.google.com/privacy\n\nLegal basis: Consent pursuant to Art. 6(1)(a) GDPR. The videos are only loaded when you actively play them.",

    privacySection8Title: '8. Feedback Form',
    privacySection8Content:
      'The app offers an anonymous feedback form where you can submit a star rating and optionally a free-text comment. The rating is transmitted without any personal reference – no IP address, device ID, railbike number, or other identifying characteristics are sent.\n\nLegal basis: Since no personal data is processed, the GDPR is not applicable to the mere feedback submission. If you provide personal data in the free text, processing is based on your consent pursuant to Art. 6(1)(a) GDPR.',

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
    tripHistoryDeleteMessage: 'Do you want to remove this trip from your history?',
    tripHistoryDeleteCancel: 'Cancel',
    tripHistoryDeleteConfirm: 'Delete',
    tripHistoryEmpty: 'No trips recorded yet.',
    tripHistoryEmptySubtext: 'Start a trip on the map to see it here.',
    tripHistoryHours: 'hrs',
    tripHistoryMinutes: 'min',

    // Language Selection
    languageLabel: 'Language',
    languageValue: 'English',

    // Funding
    fundedBy: 'Funded by:',

    // Trip Controls
    tripControlsSelectDraisine: 'Select railbike',

    // Feedback
    feedbackTripSummary: 'Your Trip',
    feedbackTitle: 'How did you like the trip?',
    feedbackPlaceholder: 'Space for comments, feedback and criticism...',
    feedbackSubmit: 'Submit rating',
    feedbackSkip: 'Later',

    // Loading
    loadingVehicles: 'Rolling railbikes onto the track...',

    // Accessibility
    a11yGoBack: 'Go back',
    a11yLocationTrackingActive: 'Location tracking active',
    a11yShowMyLocation: 'Show my location',
    a11yCenterOnVehicle: 'Center on railbike',
    a11yStartTrip: 'Start trip',
    a11yStopTrip: 'Stop trip',
    a11yChangeVehicle: 'Change railbike',
    a11yChangeVehicleHint: 'Opens railbike selection',
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
    alertLater: 'Später',
    buttonContinue: 'Weiter',

    navigationMap: 'Karte',
    navigationInfo: 'Info',

    landingPageWelcome: 'Willkommen!',
    landingPageDescription:
      'Mit dieser App bist du auf der Schiene sicher unterwegs und bekommst viele nützliche Informationen angezeigt.',
    landingPagePermissionExplanation:
      'Um den vollen Funktionsumfang nutzen zu können, empfehlen wir dir den Zugriff auf deine Standortdaten zu genehmigen.',
    landingPageButtonWithLocation: "Los geht's",
    landingPagePrivacyPolicyPrefix: 'Ich stimme der ',
    landingPagePrivacyPolicyLink: 'Datenschutzerklärung',
    landingPagePrivacyPolicySuffix: ' zu.',

    homeSnackbarStartTitle: 'Fahrt starten',
    homeSnackbarWarningTitle: 'Warnung',
    homeSnackbarWarningCrossingMessage: 'Bahnübergang in %{distance} m',
    homeSnackbarWarningVehicleMessage: 'Nächste Draisine in %{distance} m',
    homeSnackbarWarningVehicleHeadingTowardsUserMessage:
      'Entgegenkommende Draisine in %{distance} m',
    homeSnackbarInfoTitle: 'Hinweis',
    homeSnackbarInfoOffRouteMessage:
      'Du befindest dich abseits der Strecke. Der Trip wird pausiert.',
    homeDialogOffRouteStartTitle: 'Weit von der Strecke',
    homeDialogOffRouteStartMessage:
      'Du befindest dich weit von der Strecke entfernt. Möchtest du den Trip trotzdem starten?',
    homeDialogEndTripTitle: 'Fahrt beenden',
    homeDialogEndTripMessage: 'Möchtest du die aktuelle Fahrt wirklich beenden?',
    homeDialogBackgroundPermissionTripTitle: 'Standortberechtigungen',
    homeDialogBackgroundPermissionMessage:
      'Um die App optimal nutzen zu können, wird die Berechtigung für den Standortzugriff im Hintergrund benötigt. Die App muss dafür weiterhin im Hintergrund geöffnet bleiben.',

    menuButtonLabel: 'Mehr',
    tripPause: 'Fahrt pausieren',
    tripResume: 'Fahrt fortsetzen',

    // Draisine Info Screen
    infoDraisineDescription:
      'Draisinen sind mit Muskelkraft angetriebene Schienenfahrzeuge, die ursprünglich insbesondere für Bahnmeisterarbeiten und Streckenwartung eingesetzt wurden. Bei uns fahrt Ihr mit einer sog. Fahrraddraisine (engl.: „Railbike“). Das ist nichts anderes als ein Fahrrad für Schienen. Zwei Personen sitzen außen und treten wie bei einem gewöhnlichen Fahrrad in die Pedale. 1-2 Personen können auf der Mittelbank Platz nehmen und die Fahrt genießen. Zudem habt Ihr eine ganze Menge Stauraum auf den Fahrzeugen – insbesondere unter der Bank. Die Bremse befindet sich vorn als Fußpedal, Ihr habt keinen Rücktritt.',
    infoDraisineEquipment: 'Aufbau',
    infoDraisineRules: 'Regeln',
    infoDraisineTurning: 'Drehen',

    // Bottom Sheet
    bottomSheetVehicleId: 'Draisinenauswahl',
    bottomSheetChangeVehicleId:
      'Wenn du während des Ausfluges deine Draisine wechselst, kannst du hier die neue Fahrzeugnummer wählen.',
    bottomSheetStartTripMessage:
      'Gib die Fahrzeugnummer ein um fortzufahren. Die Nummer kann in der Regel auf der Sitzbank gefunden werden.',
    bottomSheetSelectVehicle: 'Mit welcher Draisine bist du unterwegs?',
    bottomSheetNoVehicles:
      'Keine Draisinen verfügbar. Bitte warte, bis Fahrzeuge auf der Karte erscheinen.',
    bottomSheetReload: 'Neu laden',

    // Trip Header
    headerDistance: 'Zurückgelegte Distanz',
    headerNextVehicle: 'Nächstes Draisine',
    headerSpeed: 'Geschwindigkeit',
    headerNextCrossing: 'Nächster Bahnübergang',

    // Trip Drawer
    drawerNoActiveTrip: 'Keine aktive Fahrt.\nStarte eine Fahrt, um Details hier zu sehen.',
    drawerUnknownVehicle: 'Unbekanntes Fahrzeug',
    drawerTripStats: 'Fahrtstatistik',
    drawerSpeed: 'Geschwindigkeit',
    drawerDistance: 'Zurückgelegte Distanz',
    drawerElapsedTime: 'Verstrichene Zeit',
    drawerUpcoming: 'Voraus',
    drawerNextDraisine: 'Nächste Draisine',
    drawerNextCrossing: 'Nächster Bahnübergang',
    drawerNextTurningPoint: 'Nächster Wendepunkt',
    drawerSecondTurningPoint: 'Übernächster Wendepunkt',
    drawerRidingTips: 'Fahr-Tipps',
    drawerChangeVehicle: 'Draisine wechseln',

    // Info Menu
    infoTitleDraisineInfo: 'Zur Draisine',
    infoTitleTripHistory: 'Vergangene Fahrten',
    infoTitleGoodToKnow: 'Gut zu wissen',
    infoTitleContacts: 'Ausgabestellen / Servicekontakte',
    infoTitleRailwayProjects: 'Weitere Projekte auf der Bahnstrecke',
    infoTitleRailwayHistory: 'Geschichte der Bahnstrecke',
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
    poiTouristInfo: 'Tourist Info',
    poiBridge: 'Brücke',
    poiRoadCrossing: 'Straßenüberführung',

    levelCrossingHint: 'Bitte anhalten und sichern! 🦺',

    // Contacts Screen
    contactTouristInfoMalente: 'Tourist Info Malente',
    contactTouristInfoSubtitle: 'Buchung & Ausgabe der Draisinen',
    contactTouristInfoLuetjenburg: 'Tourist Info Lütjenburg',
    contactTouristInfoHint:
      'Bei Problemen oder Fragen während der Fahrt wendet Euch an eure Ausgabestelle.',

    // Good to Know Screen (FAQ)
    faqDepartureTimes: 'Welche Wende- und Rückgabezeiten muss ich beachten?',
    faqDepartureTimesAnswer:
      'Auf der Bahnstrecke gibt es immer eine feste vorgegebene Fahrtrichtung, damit es nicht zu Gegenverkehr kommt. Dies wollen wir unbedingt vermeiden, da es sonst dazu kommen würde, dass Ihr Euch auf offener Strecke plötzlich gegenübersteht, ohne an einer Wendestelle die Draisine aus dem Gleis nehmen zu können. Da es bei Gegenverkehr zudem auch zu gefährlichen Situationen kommen kann, sind die vorgegebenen Fahrtrichtungen und der damit verbundene Fahrplan unbedingt zwingend einzuhalten!',
    departureMalente: 'Abfahrt Bad Malente-Gremsmühlen',
    departureLuetjenburg: 'Abfahrt Lütjenburg',
    departureBookedTour: 'Gebuchte Tour',
    departureDayTour: 'Tagestour',
    departure3hTour: '3-Std.-Tour',
    departureDeparture: 'Abfahrt',
    departureTurn: 'Wende (egal, wo Ihr dann seid)',
    departureArrivalLuetjenburg: 'Ankunft in Lütjenburg',
    departureReturnStartLuetjenburg: 'Beginn Rückfahrt in Lütjenburg',
    departureReturn: 'Rückkehr',
    faqHowItWorks: 'Wie funktioniert eine Draisine?',
    faqHowItWorksAnswer:
      'Die Draisine wird durch Treten angetrieben, ähnlich wie ein Fahrrad. Wichtig: Draisinen haben einen langen Bremsweg – fahre vorausschauend!\n\nDer Verkehr fließt immer in eine Fahrtrichtung, damit es nicht zu Gegenverkehr auf der Strecke kommt. Haltet Euch unbedingt an die Abfahrt-, Wende- und Rückgabezeiten! An allen Wendepunkten könnt Ihr die Draisine drehen.\n\nAuf jeder Draisine können bis zu 4 Personen mitfahren – 2 Personen treten, 2 Personen können sich entspannen. Mindestens ein Erwachsener pro Draisine ist erforderlich.',
    faqRules: 'Was muss ich bei der Fahrt beachten?',
    faqRulesAnswer:
      '• Eine Draisine hat nie Vorfahrt! An allen Bahnübergängen sowie Straßen- und Wegkreuzungen hat der Straßen- und Fußgängerverkehr grundsätzlich Vorrang. Bitte haltet daher vor jedem Bahnübergang an und überquert die Straße erst, wenn sich kein kreuzender Verkehr nähert. Beim Überqueren sichert eine Person mit Warnweste den Übergang ab.\n• An allen Bahnübergängen anhalten – Straßenverkehr hat Vorfahrt\n• Pro Draisine muss mindestens ein Erwachsener mitfahren. \n•Das Mitnehmen von Tieren auf der Draisine wird u.a. aufgrund der Lautstärke nicht empfohlen. \n• Wir empfehlen aufgrund der Vegetation an der Strecke das Tragen von langer und robuster Kleidung sowie festem Schuhwerk.',
    faqVouchers: 'Gibt es Gutscheine für Draisinenfahrten?',
    faqVouchersAnswer:
      'Ja, für die Draisinenfahrten können auch Gutscheine erworben werden. Der Wert des Gutscheins kann selbst bestimmt werden, er ist ab Kauf 3 Jahre lang gültig.\n\nDie Gutscheine gibt es vor Ort bei der Tourist Information in Malente oder auf Bestellung zzgl. einer kleinen Versandpauschale per Post auf Rechnung.\n\nBei Interesse und weiteren Fragen meldet euch gern bei der Malenter oder Lütjenburger Tourist Information oder wendet Euch per Mail an info@schiene-m-l.de.',
    faqPrice: 'Was kostet eine Draisinenfahrt?',
    faqPriceAnswer:
      '3-Stunden-Tour: 50€ pro Draisine\nFamilienpreis (mit Kindern unter 16): 40€\nostseecard-Inhaber erhalten 2€ Rabatt.\n\nGruppentouren mit bis zu 100 Personen sind möglich.\nTäglich ist zudem eine Tagestour von Malente nach Lütjenburg und zurück möglich. Hierbei fahrt Ihr vormittags von Malente nach Lütjenburg und nachmittags wieder zurück. Kosten: Doppelter Preis der 3-Std.-Tour.',

    // Railway Projects Screen
    railwayProjectsIntro:
      'Die Schienen, auf denen Ihr fahrt, werden neben der Naturpark-Draisine Holsteinische Schweiz auch noch anderweitig genutzt. Auf der Bahnstrecke Malente-Lütjenburg laufen mehrere Projekte gleichzeitig. Sie alle werden unterstützt und vorangetrieben durch den Verein Schienenverkehr Malente-Lütjenburg e.V., welcher sich 2020 gründete, um die Bahnstrecke zu retten und wiederzubeleben.',
    railwayProjectsReaktTitle: 'Forschungsinitiative REAKT',
    railwayProjectsReaktContent:
      'Die Bahnstrecke Malente-Lütjenburg wird auch noch genutzt für die Forschungsinitiative REAKT. Diese erforscht neuartige Schienenfahrzeuge und Streckenkonzepte für ländliche Bahnstrecken. So soll z. B. untersucht werden, wie auf eingleisigen Strecken mit autonomen Fahrzeugen On-Demand-Begegnungsverkehr realisiert werden kann. Daneben werden neuartige Konzepte für Bahnübergänge, Stellwerke und die Leit- und Sicherungstechnik erprobt, die auf digitalen Technologien und moderner Sensorik basieren. REAKT umfasst ein großes Netzwerk aus Hochschulen, Industriepartnern, Kommunen und Verbänden. Seit 2025 wird die Innovationscommunity durch das Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR) unterstützt, als eine von zwanzig Innovationscommunities unter knapp 500 Bewerbungen. Die Federführung liegt bei der Christian-Albrechts-Universität zu Kiel (CAU). Die Bahnstrecke Malente-Lütjenburg dient als Reallabor für gemeinsame Projekte der Partner aus Wissenschaft und Wirtschaft. Mit Versuchsfahrzeugen kann hier optimal am Schienenverkehr der Zukunft geforscht werden. Weitere Infos bekommt Ihr hier unter https://www.reaktsh.de/',
    railwayProjectsHehsTitle: 'Sonderzug „Hein Lüttenborg"',
    railwayProjectsHehsContent:
      'An einigen Tagen fährt der Verein Historische Eisenbahn Holsteinische Schweiz e.V. (HEHS) mit einem Schienenbus auf der Bahnstrecke. Ihr könnt somit auf der Strecke, auf der Ihr selbst per Fahrraddraisine radelt, an einigen Tagen auch wieder mit einem richtigen Zug fahren. Die Fahrtage, Fahrzeiten und Preise erfahrt Ihr unter https://hehs-eisenbahn.de/',
    // Railway History Screen
    railwayHistoryContent:
      'Die Bahnstrecke Malente-Lütjenburg blickt auf eine lange und bewegte Geschichte zurück. Unter dem liebevollen Spitznamen „Hein Lüttenborg“ hat sie überregionale Bekanntheit und gilt als eine der landschaftlich schönsten Bahnstrecken in Norddeutschland. Eröffnet wurde sie in vier Bauabschnitten zwischen 1890 und 1892. Zur Eröffnung der Strecke wurden die Unterwegshaltestellen Holsteinische Schweiz, Bruhnskoppel, Benz und Kletkamp in Betrieb genommen. Die Strecke erfuhr schnell eine große Bedeutung im Personen- und landwirtschaftlichen Güterverkehr. Zudem spielte sie eine wichtige Rolle in der touristischen Erschließung der Holsteinischen Schweiz und der Hohwachter Bucht. Sie führte zu einem regelrechten Aufschwung und an war ein wichtiger Meilenstein in der Siedlungsentwicklung. 1954 wurde der Betrieb auf Schienenbusse umgestellt. Ab dann fuhren keine dampflokbespannten Züge mehr, sondern die berühmten kleinen roten Triebwagen. Damit noch mehr Menschen die Bahn direkt erreichen konnten, wurden die kleinen Bedarfshaltepunkte Malente Nord, Malkwitz, Flehm, Blekendorf und Friederikenthal eröffnet. In den 1960er-Jahren wurde in Lütjenburg eine Bundeswehrkaserne eröffnet, welche mit dem wichtigen Truppenübungsplatz der Bundeswehr in Todendorf bei Lütjenburg für neue Relevanz der Bahnstrecke führte. Die ländliche Nebenbahn wurde für den Verkehr von militärischen Schwerlastzügen von Grund auf ertüchtigt und für eine Tragfähigkeit von Zügen bis 1.400 Tonnen Gesamtgewicht ausgebaut. Dies ist für Nebenbahnstrecken sonst unüblich, die Strecke profitiert daher bis heute von ihrem sehr guten Ausbauzustand. Durch den zunehmenden Autoverkehr und immer weiter ausgedünnte Fahrpläne wurde die Bahn unwirtschaftlicher. Trotz großer Proteste in der Region stellt die DB den Personenverkehr 1976 ein. Für den Güter- und Militärverkehr wurde die Strecke bis ins Jahr 1996 aber weiter genutzt. Zudem wurde sie ab den 1980er-Jahren beliebtes Ziel von Ausflugs-, Sonder- und Dampfzügen. Bis ins Jahr 2000 waren jeden Sommer zahlreiche Dampfzüge auf der Strecke unterwegs, was dazu führte, dass „Hein Lüttenborg“ erneut eine wichtige Touristenattraktion wurde. 2000 stellt die DB dann auch diesen Betrieb endgültig ein und die Strecke wurde stillgelegt. 2004 wurde im Bahnhof Malente die Anbindungsweiche zum restlichen Netz rausgerissen. 2008 wurde in Lütjenburg ein Großteil der einst riesigen Bahnanlagen (13 Gleise!) samt dem Bahnhofsgebäude abgerissen. Das Ende der Strecke schien besiegelt, sie wurde von der Vegetation überwuchert und war kaum mehr als Gleis zu erkennen. Bis sich 2020 zahlreiche Bürgerinnen und Bürger zusammentaten und den Verein Schienenverkehr Malente-Lütjenburg e.V. gründeten. 2022 wurde die Strecke gerettet und durch eine aus dem Verein heraus gegründete Trägergesellschaft übernommen, um die Ziele des Vereins mit einer stufenartigen Reaktivierung umzusetzen. Die Nutzung als Draisinen- und Forschungsstrecke läuft seit 2022. Seitdem ist wieder Leben auf der Bahnstrecke eingekehrt - und die große Geschichte von Hein Lüttenborg wird fortgesetzt.',
    // Imprint Screen
    imprintOperator: 'Betreiber',
    imprintDisclaimer: 'Haftungsausschluss',
    imprintDisclaimerText:
      'Die Inhalte dieser App wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',

    // Privacy Policy Screen
    privacyPolicyTitle: 'Datenschutzerklärung',
    privacyPolicySubtitle: 'Draisinen-Bordcomputer App\nStand: 27. März 2026',

    privacySection1Title: '1. Verantwortlicher',
    privacySection1Content:
      'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:\n\nHLB GmbH\nBahnhofstraße 3\n23714 Malente\nE-Mail: kontakt@hl-bahnstreckenverwaltung.de',

    privacySection2Title: '2. Übersicht der Datenverarbeitung',
    privacySection2Content:
      'Diese App dient als digitaler Bordcomputer für den Draisinenverleih auf der Bahnstrecke Malente–Lütjenburg. Sie wurde bewusst datenschutzfreundlich gestaltet: Es gibt keine Nutzerregistrierung, kein Login, kein Tracking und keine Analyse-Tools. Die App verarbeitet so wenig personenbezogene Daten wie möglich.\n\nIm Folgenden informieren wir dich darüber, welche Daten bei der Nutzung der App verarbeitet werden, zu welchem Zweck und auf welcher Rechtsgrundlage.',

    privacySection3Title: '3. Standortdaten (GPS)',
    privacySection3Content:
      '3.1 Lokale Nutzung deiner Standortdaten\n\nWenn du der App die Berechtigung erteilst, auf den Standort deines Mobilgeräts zuzugreifen, werden deine GPS-Daten ausschließlich lokal auf deinem Gerät verarbeitet. Die Standortdaten werden verwendet, um:\n\n• deine eigene Position auf der Streckenkarte anzuzeigen,\n• deine Position auf den Streckenverlauf zu projizieren (sog. Snapping),\n• Fahrtinformationen wie Geschwindigkeit und zurückgelegte Distanz zu berechnen.\n\nDeine GPS-Daten werden zu keinem Zeitpunkt an einen Server übertragen. Sie verlassen dein Gerät nicht und werden nicht gespeichert. Wenn du die App schließt, werden die Standortdaten verworfen.\n\nRechtsgrundlage: Deine Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO, die du über die Standortberechtigung deines Betriebssystems (iOS/Android) erteilst. Du kannst die Berechtigung jederzeit in den Geräteeinstellungen widerrufen. Die App ist auch ohne Standortfreigabe nutzbar – in diesem Fall wird nur die Position deiner Draisine anhand der GNSS-Tracker-Daten angezeigt.\n\n3.2 Keine Hintergrund-Standorterfassung\n\nDie App erfasst deinen Standort ausschließlich, während sie im Vordergrund aktiv ist. Es findet keine Standorterfassung im Hintergrund statt.',

    privacySection4Title: '4. Empfang von Draisinen-Positionsdaten',
    privacySection4Content:
      'Die App empfängt über eine WebSocket-Verbindung die Positionsdaten aller Draisinen auf der Strecke vom Backend-Server. Diese Daten stammen von den an den Draisinen montierten GNSS-Trackern (Hardware) und werden nicht durch die App oder dein Gerät erzeugt.\n\nBeim Aufbau der WebSocket-Verbindung wird technisch bedingt deine IP-Adresse an den Backend-Server übertragen. Die App sendet im laufenden Betrieb lediglich ein technisches Heartbeat-Signal („Ping") zur Aufrechterhaltung der Verbindung. Es werden keine personenbezogenen Daten an den Server gesendet.\n\nServer-Standort: Der Backend-Server wird von der Christian-Albrechts-Universität zu Kiel (CAU) in Deutschland betrieben.\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO. Die Verbindung ist für die Kernfunktion der App (Anzeige der Draisinen-Positionen) erforderlich. Die IP-Adresse wird nur im Rahmen der technisch notwendigen Verbindung verarbeitet.',

    privacySection5Title: '5. Lokale Datenspeicherung',
    privacySection5Content:
      'Die App speichert Zusammenfassungen deiner Fahrten lokal auf deinem Gerät (mittels AsyncStorage). Gespeichert werden ausschließlich:\n\n• Fahrt-ID (intern generiert),\n• Start- und Endzeit der Fahrt,\n• Draisinen-Nummer und -Name,\n• zurückgelegte Gesamtdistanz.\n\nEs werden keine GPS-Koordinaten, keine Bewegungsprofile und keine personenbezogenen Daten gespeichert. Diese Daten verbleiben ausschließlich auf deinem Gerät und werden nicht an Dritte übermittelt. Du kannst diese Daten jederzeit löschen, indem du die App-Daten in deinen Geräteeinstellungen löschst oder die App deinstallierst.\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO (Bereitstellung der Fahrthistorie-Funktion). Die Daten werden nur lokal auf deinem Gerät gespeichert.',

    privacySection6Title: '6. Kartendarstellung (MapLibre)',
    privacySection6Content:
      'Für die Kartendarstellung verwendet die App MapLibre, eine quelloffene Kartenbibliothek. Die Kartenkacheln (Tiles) werden von OpenFreeMap (openfreemap.org) geladen, einem freien Tile-Server auf Basis von OpenStreetMap-Daten. Beim Laden der Karte wird technisch bedingt deine IP-Adresse an den OpenFreeMap-Server übertragen.\n\nOpenFreeMap ist ein Open-Source-Projekt, das Kartenkacheln ohne Registrierung oder API-Schlüssel bereitstellt. Die zugrunde liegenden Kartendaten stammen von OpenStreetMap-Mitwirkenden.\n\nRechtsgrundlage: Berechtigtes Interesse gem. Art. 6 Abs. 1 lit. f DSGVO. Die Kartenanzeige ist eine Kernfunktion der App.',

    privacySection7Title: '7. Eingebettete YouTube-Videos',
    privacySection7Content:
      'Die App enthält eingebettete YouTube-Videos (z. B. Anleitungen zur Nutzung der Draisinen und zur Sicherung von Bahnübergängen). Die Einbettung erfolgt über den erweiterten Datenschutzmodus von YouTube.\n\nBeim Abspielen eines Videos wird eine Verbindung zu Servern von Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) hergestellt. Dabei werden folgende Daten an Google übertragen:\n\n• deine IP-Adresse,\n• das aufgerufene Video,\n• technische Informationen zu deinem Gerät und Browser.\n\nSofern du in deinem Google-Konto eingeloggt bist, kann Google den Videoabruf deinem Profil zuordnen. Google kann die Daten auch in die USA übertragen. Die Übertragung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der EU-Kommission gem. Art. 45 DSGVO).\n\nWeitere Informationen findest du in der Datenschutzerklärung von Google: https://policies.google.com/privacy\n\nRechtsgrundlage: Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO. Die Videos werden erst geladen, wenn du diese aktiv abspielst.',

    privacySection8Title: '8. Feedback-Formular',
    privacySection8Content:
      'Die App bietet ein anonymes Feedback-Formular, über das du eine Sternebewertung und optional einen Freitext-Kommentar abgeben kannst. Die Bewertung wird ohne jeglichen Personenbezug übermittelt – es werden keine IP-Adresse, Geräte-ID, Draisinen-Nummer oder sonstige identifizierenden Merkmale mitgesendet.\n\nRechtsgrundlage: Da keine personenbezogenen Daten verarbeitet werden, ist die DSGVO auf die reine Feedback-Übermittlung nicht anwendbar. Solltest du im Freitext personenbezogene Daten angeben, erfolgt die Verarbeitung auf Grundlage deiner Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.',

    privacySection9Title: '9. Keine weiteren Datenverarbeitungen',
    privacySection9Content:
      'Die App verwendet:\n\n• kein Nutzer-Tracking oder Analytics (z. B. Firebase, Google Analytics),\n• keine Werbung oder Werbe-IDs,\n• keine Social-Media-Plugins,\n• keine Nutzerkonten oder Registrierung,\n• keine Cookies oder vergleichbare Tracking-Technologien,\n• keine Weitergabe von Daten an Dritte (außer den oben genannten technischen Verbindungen).',

    privacySection10Title: '10. Deine Rechte',
    privacySection10Content:
      'Du hast nach der DSGVO folgende Rechte:\n\n• Auskunftsrecht (Art. 15 DSGVO): Du kannst Auskunft über die von uns verarbeiteten personenbezogenen Daten verlangen.\n• Recht auf Berichtigung (Art. 16 DSGVO): Du kannst die Berichtigung unrichtiger Daten verlangen.\n• Recht auf Löschung (Art. 17 DSGVO): Du kannst die Löschung deiner Daten verlangen, sofern die Voraussetzungen vorliegen.\n• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n• Widerspruchsrecht (Art. 21 DSGVO): Du kannst der Verarbeitung auf Grundlage berechtigter Interessen widersprechen.\n• Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO): Erteilte Einwilligungen (z. B. Standortfreigabe) kannst du jederzeit mit Wirkung für die Zukunft widerrufen.\n\nZur Ausübung deiner Rechte wende dich bitte an die oben genannte verantwortliche Stelle.',

    privacySection11Title: '11. Beschwerderecht bei einer Aufsichtsbehörde',
    privacySection11Content:
      'Wenn du der Ansicht bist, dass die Verarbeitung deiner personenbezogenen Daten gegen die DSGVO verstößt, hast du das Recht, Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzulegen.\n\nDie zuständige Aufsichtsbehörde ist:\n\nUnabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)\nHolstenstraße 98, 24103 Kiel\nTelefon: +49 431 988-1200\nE-Mail: mail@datenschutzzentrum.de\nhttps://www.datenschutzzentrum.de',

    privacySection12Title: '12. Änderungen dieser Datenschutzerklärung',
    privacySection12Content:
      'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslage oder bei Änderungen der App anzupassen. Die aktuelle Fassung ist stets in der App abrufbar.',

    // Trip History Screen
    tripHistoryTitle: 'Vergangene Fahrten',
    tripHistoryDeleteTitle: 'Fahrt löschen',
    tripHistoryDeleteMessage: 'Möchtest du diese Fahrt aus der Historie löschen?',
    tripHistoryDeleteCancel: 'Abbrechen',
    tripHistoryDeleteConfirm: 'Löschen',
    tripHistoryEmpty: 'Noch keine Fahrten aufgezeichnet.',
    tripHistoryEmptySubtext: 'Starte eine Fahrt auf der Karte, um sie hier zu sehen.',
    tripHistoryHours: 'Std',
    tripHistoryMinutes: 'Min',

    // Language Selection
    languageLabel: 'Sprache',
    languageValue: 'Deutsch',

    // Funding
    fundedBy: 'Gefördert von:',

    // Trip Controls
    tripControlsSelectDraisine: 'Draisine auswählen',

    // Feedback
    feedbackTripSummary: 'Deine Fahrt',
    feedbackTitle: 'Wie hat dir die Tour gefallen?',
    feedbackPlaceholder: 'Platz für Berichte, Lob und Kritik...',
    feedbackSubmit: 'Bewertung abschicken',
    feedbackSkip: 'Später',

    // Loading
    loadingVehicles: 'Draisinen trudeln auf der Strecke ein...',

    // Accessibility
    a11yGoBack: 'Zurück',
    a11yLocationTrackingActive: 'Standort wird verfolgt',
    a11yShowMyLocation: 'Meinen Standort anzeigen',
    a11yCenterOnVehicle: 'Auf Fahrzeug zentrieren',
    a11yStartTrip: 'Fahrt starten',
    a11yStopTrip: 'Fahrt beenden',
    a11yChangeVehicle: 'Draisine wechseln',
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

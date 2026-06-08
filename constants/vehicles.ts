export const SIMULATION_VEHICLE_ID = -1;
export const LOCAL_VEHICLE_ID = -2;
// IDs of vehicles to fully exclude from all app interactions
// (id 16 is the 99 motor railbike — not shown on map, not selectable,
//  and not considered for warnings or any other trip logic)
export const EXCLUDED_VEHICLE_IDS = [16];

// Demo (Simulation) und Lokal (GPS ohne Trip) in der Fahrzeugauswahl anzeigen.
// Default: false — durch EXPO_PUBLIC_ENABLE_DEMO_MODE=true in .env aktivierbar.
export const DEMO_MODE_ENABLED = process.env.EXPO_PUBLIC_ENABLE_DEMO_MODE === 'true';

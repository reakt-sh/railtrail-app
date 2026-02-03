// Predefined simulation positions along the track
// percentage: 0 - 100 (position along track as percentage)
// speed: km/h (typical handcar/draisine speed)

export interface SimulationPoint {
  percentage: number;
  speed: number;
}

export const SIMULATION_POSITIONS: SimulationPoint[] = [
  // Start - stationary
  { percentage: 0, speed: 0 },
  { percentage: 0, speed: 0 },
  { percentage: 0, speed: 0 },
  // Accelerating slowly
  { percentage: 0.05, speed: 2 },
  { percentage: 0.15, speed: 4 },
  { percentage: 0.3, speed: 6 },
  { percentage: 0.5, speed: 8 },
  { percentage: 0.75, speed: 10 },
  { percentage: 1.05, speed: 12 },
  { percentage: 1.4, speed: 14 },
  { percentage: 1.8, speed: 16 },
  { percentage: 2.25, speed: 18 },
  // Cruising speed
  { percentage: 2.75, speed: 20 },
  { percentage: 3.3, speed: 20 },
  { percentage: 3.85, speed: 20 },
  { percentage: 4.4, speed: 20 },
  { percentage: 5.0, speed: 21 },
  { percentage: 5.6, speed: 21 },
  { percentage: 6.2, speed: 20 },
  { percentage: 6.8, speed: 20 },
  { percentage: 7.4, speed: 20 },
  { percentage: 8.0, speed: 19 },
  { percentage: 8.55, speed: 19 },
  { percentage: 9.1, speed: 20 },
  { percentage: 9.7, speed: 20 },
  { percentage: 10.3, speed: 21 },
  { percentage: 10.9, speed: 21 },
  { percentage: 11.5, speed: 20 },
  { percentage: 12.1, speed: 20 },
  { percentage: 12.7, speed: 20 },
  { percentage: 13.3, speed: 19 },
  { percentage: 13.85, speed: 19 },
  { percentage: 14.4, speed: 20 },
  { percentage: 15.0, speed: 20 },
  // Approaching crossing - slowing down
  { percentage: 15.5, speed: 18 },
  { percentage: 15.95, speed: 16 },
  { percentage: 16.35, speed: 14 },
  { percentage: 16.7, speed: 12 },
  { percentage: 17.0, speed: 10 },
  { percentage: 17.25, speed: 8 },
  { percentage: 17.45, speed: 5 },
  // Brief stop at crossing
  { percentage: 17.55, speed: 0 },
  { percentage: 17.55, speed: 0 },
  { percentage: 17.55, speed: 0 },
  // Accelerating again
  { percentage: 17.65, speed: 3 },
  { percentage: 17.8, speed: 6 },
  { percentage: 18.0, speed: 9 },
  { percentage: 18.25, speed: 12 },
  { percentage: 18.55, speed: 14 },
  { percentage: 18.9, speed: 16 },
  { percentage: 19.3, speed: 18 },
  { percentage: 19.75, speed: 20 },
  // Cruising again
  { percentage: 20.25, speed: 20 },
  { percentage: 20.8, speed: 21 },
  { percentage: 21.4, speed: 21 },
  { percentage: 22.0, speed: 20 },
  { percentage: 22.6, speed: 20 },
  { percentage: 23.2, speed: 20 },
  { percentage: 23.8, speed: 19 },
  { percentage: 24.35, speed: 19 },
  { percentage: 24.9, speed: 20 },
  { percentage: 25.5, speed: 20 },
  { percentage: 26.1, speed: 20 },
  { percentage: 26.7, speed: 20 },
  { percentage: 27.3, speed: 19 },
  { percentage: 27.85, speed: 19 },
  { percentage: 28.4, speed: 20 },
  { percentage: 29.0, speed: 20 },
  // Final approach - slowing down
  { percentage: 29.5, speed: 18 },
  { percentage: 29.95, speed: 16 },
  { percentage: 30.35, speed: 14 },
  { percentage: 30.7, speed: 12 },
  { percentage: 31.0, speed: 10 },
  { percentage: 31.25, speed: 8 },
  { percentage: 31.45, speed: 5 },
  { percentage: 31.6, speed: 3 },
  // End - stationary
  { percentage: 31.7, speed: 0 },
  { percentage: 31.7, speed: 0 },
];

// Interval between position updates in ms
// Matches MIN_LOCATION_UPDATE_TIME_INTERVAL from consts.ts
export const SIMULATION_INTERVAL_MS = 1000;

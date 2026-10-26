// The simulation retains fractional hours; the HUD advances only on the hour.
export function formatGameHour(clock){return `${Math.floor(((clock%24)+24)%24)}:00`;}

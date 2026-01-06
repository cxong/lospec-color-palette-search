export const COLOR_COUNT_PENALTY = 200;

export function hexToRgb(hex: string): number[] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
}

export function rgbToHex(rgb: number[]): string {
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
}

export function euclideanDistance(color1: number[], color2: number[]): number {
  const dr = color1[0] - color2[0];
  const dg = color1[1] - color2[1];
  const db = color1[2] - color2[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function findClosestColor(queryColor: number[], paletteColors: number[][]): number {
  let minDistance = Infinity;

  for (const paletteColor of paletteColors) {
    const distance = euclideanDistance(queryColor, paletteColor);
    if (distance < minDistance) {
      minDistance = distance;
    }
  }

  return minDistance;
}

export function calculateRSS(queryColors: number[][], paletteColors: number[][]): number {
  let rss = 0;

  for (const queryColor of queryColors) {
    const closestDistance = findClosestColor(queryColor, paletteColors);
    rss += closestDistance * closestDistance;
  }

  return rss;
}

export function calculateColorPenalty(
  paletteColorCount: number,
  queryColorCount: number
): number {
  const difference = Math.max(0, paletteColorCount - queryColorCount);
  return difference * COLOR_COUNT_PENALTY;
}

export function calculateTotalDistance(
  queryColors: number[][],
  paletteColors: number[][],
  paletteColorCount: number
): { totalDistance: number; rss: number; colorPenalty: number } {
  const rss = calculateRSS(queryColors, paletteColors);
  const colorPenalty = calculateColorPenalty(paletteColorCount, queryColors.length);
  const totalDistance = rss + colorPenalty;

  return { totalDistance, rss, colorPenalty };
}

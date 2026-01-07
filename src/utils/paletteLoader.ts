import { PaletteData, NormalizedPalette } from '../types/palette';
import { hexToRgb } from './colorDistance';

export async function loadPalettes(jsonPath: string): Promise<NormalizedPalette[]> {
  const response = await fetch(jsonPath);
  const data: Record<string, PaletteData> = await response.json();

  const palettes: NormalizedPalette[] = [];

  for (const [, paletteData] of Object.entries(data)) {
    const colorArray = paletteData.colors || paletteData.colorsArray || [];
    const rgbColors = colorArray.map(hex => hexToRgb(hex));
    const hexColors = colorArray.map(hex => hex.startsWith('#') ? hex : `#${hex}`);

    palettes.push({
      id: paletteData._id,
      title: paletteData.title,
      slug: paletteData.slug,
      colors: rgbColors,
      hexColors,
      numberOfColors: paletteData.numberOfColors,
      url: `https://lospec.com/palette-list/${paletteData.slug}`,
      author: paletteData.author,
      description: paletteData.description,
      tags: paletteData.tags,
    });
  }

  return palettes;
}

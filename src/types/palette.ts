export interface PaletteData {
  _id: string;
  title: string;
  slug: string;
  colors?: string[];
  colorsArray?: string[];
  numberOfColors: number;
}

export interface NormalizedPalette {
  id: string;
  title: string;
  slug: string;
  colors: number[][];
  numberOfColors: number;
  url: string;
}

export interface SearchResult {
  palette: NormalizedPalette;
  totalDistance: number;
  rss: number;
  colorPenalty: number;
  rank: number;
}

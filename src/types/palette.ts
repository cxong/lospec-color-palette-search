export interface PaletteData {
  _id: string;
  title: string;
  slug: string;
  colors?: string[];
  colorsArray?: string[];
  numberOfColors: number;
  author?: string;
  description?: string;
  tags?: string[];
}

export interface NormalizedPalette {
  id: string;
  title: string;
  slug: string;
  colors: number[][];
  hexColors: string[];
  numberOfColors: number;
  url: string;
  author?: string;
  description?: string;
  tags?: string[];
}

export interface SearchResult {
  palette: NormalizedPalette;
  totalDistance: number;
  rss: number;
  colorPenalty: number;
  rank: number;
}

export interface ExactMatch {
  paletteIndex: number;
  colorIndex: number;
}

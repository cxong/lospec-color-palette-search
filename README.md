# Lospec Palette Search

A client-side web application for searching color palettes by similarity using color distance calculations.

## Features

- **Color-Based Search**: Add multiple colors to find similar palettes
- **Smart Distance Calculation**: Uses RSS (Residual Sum of Squares) with color count penalty
- **Fast Client-Side Processing**: No server required, works entirely in the browser
- **Interactive Results**: Click any result to open the palette on Lospec
- **Visual Preview**: See palette colors directly in the results

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Palette Data

Place your Lospec palette JSON file in the `public` folder as `palettes.json`.

The app expects a JSON structure like this:

```json
{
  "1": {
    "_id": "1",
    "title": "Palette Name",
    "slug": "palette-slug",
    "colorsArray": ["f2f0e5", "e8e5da", "..."],
    "numberOfColors": 16
  },
  ...
}
```

**Note**: The app includes a sample `palettes.json` with 5 example palettes for testing.

### 3. Run the Development Server

```bash
npm run dev
```

## How It Works

### Distance Calculation

The app ranks palettes using a total distance score:

```
Total Distance = RSS + Color Count Penalty
```

**RSS (Residual Sum of Squares)**:
- For each query color, find the closest palette color using Euclidean distance in RGB space
- Sum the squared distances: `RSS = Σ(distance²)`

**Color Count Penalty**:
- Penalizes palettes with more colors than the query
- Formula: `max(0, palette_colors - query_colors) × PENALTY`
- Default penalty: `200` per extra color

### Tuning the Search

You can adjust the color count penalty in `src/utils/colorDistance.ts`:

```typescript
export const COLOR_COUNT_PENALTY = 200; // Adjust this value
```

- Higher values: Prefer palettes with fewer colors
- Lower values: More tolerant of larger palettes

## Usage

1. Click the color picker to select a color
2. Click "Add Color" to add it to your query
3. Repeat to add multiple colors
4. Results automatically update with the top 50 matches
5. Click any result row to view the palette on Lospec

## Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Performance**: Optimized for ~4,000+ palettes
- **Color Space**: RGB Euclidean distance
- **Result Limit**: Top 50 palettes

## Project Structure

```
src/
├── components/
│   ├── ColorPicker.tsx      # Color selection UI
│   ├── PalettePreview.tsx   # Visual palette swatches
│   ├── ResultsTable.tsx     # Search results display
│   └── SearchEngine.tsx     # Search logic
├── types/
│   └── palette.ts           # TypeScript interfaces
├── utils/
│   ├── colorDistance.ts     # Distance calculations
│   └── paletteLoader.ts     # JSON loading
└── App.tsx                  # Main application
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy to any static hosting service.

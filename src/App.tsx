import { useState, useEffect, useMemo } from 'react';
import { Palette } from 'lucide-react';
import { NormalizedPalette } from './types/palette';
import { loadPalettes } from './utils/paletteLoader';
import { ColorPicker } from './components/ColorPicker';
import { ResultsTable } from './components/ResultsTable';
import { PaletteDetails } from './components/PaletteDetails';
import { SearchEngine } from './components/SearchEngine';
import { COLOR_COUNT_PENALTY, calculateTotalDistance } from './utils/colorDistance';

function App() {
  const [palettes, setPalettes] = useState<NormalizedPalette[]>([]);
  const [queryColors, setQueryColors] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<NormalizedPalette | null>(null);

  useEffect(() => {
    loadPalettes(`${import.meta.env.BASE_URL}palettes.json`)
      .then(data => {
        setPalettes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to load palettes: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const recentPalettes = useMemo(() => {
    if (!selectedPalette) return [];
    const filtered = palettes.filter(p => p.id !== selectedPalette.id).slice(0, 3);
    return filtered;
  }, [selectedPalette, palettes]);

  const similarPalettes = useMemo(() => {
    if (!selectedPalette || queryColors.length === 0) return [];

    const scored = palettes
      .filter(p => p.id !== selectedPalette.id)
      .map(palette => {
        const { totalDistance, rss, colorPenalty } = calculateTotalDistance(
          selectedPalette.colors,
          palette.colors,
          palette.numberOfColors
        );
        return { palette, totalDistance, rss, colorPenalty, rank: 0 };
      })
      .sort((a, b) => a.totalDistance - b.totalDistance)
      .slice(0, 12)
      .map((result, idx) => ({ ...result, rank: idx + 1 }));

    return scored;
  }, [selectedPalette, palettes]);

  if (loading) {
    return (
      <div className="lospec-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e5e3e6] mx-auto mb-4"></div>
          <p className="lospec-text">Loading palettes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lospec-bg min-h-screen flex items-center justify-center">
        <div className="lospec-bg-secondary rounded-lg shadow-lg p-8 max-w-md border border-[#7a7380]">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Palettes</h2>
          <p className="lospec-text mb-4">{error}</p>
          <p className="text-sm lospec-text-secondary">
            Please ensure <code className="lospec-bg px-2 py-1 rounded">palettes.json</code> is
            placed in the <code className="lospec-bg px-2 py-1 rounded">public</code> folder.
          </p>
        </div>
      </div>
    );
  }

  if (selectedPalette) {
    return (
      <PaletteDetails
        palette={selectedPalette}
        similarPalettes={similarPalettes}
        onBack={() => setSelectedPalette(null)}
        onPaletteSelect={setSelectedPalette}
      />
    );
  }

  return (
    <div className="lospec-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette size={32} className="lospec-primary" />
            <h1 className="text-3xl font-bold lospec-primary">Lospec Palette Search</h1>
          </div>
          <p className="lospec-text">
            Search for color palettes by similarity. Loaded {palettes.length.toLocaleString()}{' '}
            palettes.
          </p>
          <p className="text-sm lospec-text-secondary mt-1">
            Color count penalty: <span className="font-mono">{COLOR_COUNT_PENALTY}</span> per extra
            color
          </p>
        </header>

        <div className="space-y-6">
          <ColorPicker
            queryColors={queryColors}
            onQueryColorsChange={setQueryColors}
            recentPalettes={recentPalettes}
          />

          <SearchEngine palettes={palettes} queryColors={queryColors}>
            {(results) => (
              <div>
                {results.length > 0 && (
                  <div className="mb-3">
                    <h2 className="text-xl font-semibold lospec-primary">
                      Top {results.length} Results
                    </h2>
                  </div>
                )}
                <ResultsTable
                  results={results}
                  queryColors={queryColors}
                  onRowClick={setSelectedPalette}
                  onColorClick={(color) => {
                    if (!queryColors.some(c => c[0] === color[0] && c[1] === color[1] && c[2] === color[2])) {
                      setQueryColors([...queryColors, color]);
                    }
                  }}
                />
              </div>
            )}
          </SearchEngine>
        </div>
      </div>
    </div>
  );
}

export default App;

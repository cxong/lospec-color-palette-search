import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { NormalizedPalette } from './types/palette';
import { loadPalettes } from './utils/paletteLoader';
import { ColorPicker } from './components/ColorPicker';
import { ResultsTable } from './components/ResultsTable';
import { SearchEngine } from './components/SearchEngine';
import { COLOR_COUNT_PENALTY } from './utils/colorDistance';

function App() {
  const [palettes, setPalettes] = useState<NormalizedPalette[]>([]);
  const [queryColors, setQueryColors] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading palettes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md border border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Palettes</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Please ensure <code className="bg-gray-100 px-2 py-1 rounded">palettes.json</code> is
            placed in the <code className="bg-gray-100 px-2 py-1 rounded">public</code> folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Lospec Palette Search</h1>
          </div>
          <p className="text-gray-600">
            Search for color palettes by similarity. Loaded {palettes.length.toLocaleString()}{' '}
            palettes.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Color count penalty: <span className="font-mono">{COLOR_COUNT_PENALTY}</span> per extra
            color
          </p>
        </header>

        <div className="space-y-6">
          <ColorPicker queryColors={queryColors} onQueryColorsChange={setQueryColors} />

          <SearchEngine palettes={palettes} queryColors={queryColors}>
            {(results) => (
              <div>
                {results.length > 0 && (
                  <div className="mb-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Top {results.length} Results
                    </h2>
                  </div>
                )}
                <ResultsTable results={results} />
              </div>
            )}
          </SearchEngine>
        </div>
      </div>
    </div>
  );
}

export default App;

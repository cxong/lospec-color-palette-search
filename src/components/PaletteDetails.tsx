import { ArrowLeft, ExternalLink } from 'lucide-react';
import { NormalizedPalette, SearchResult } from '../types/palette';
import { PalettePreview } from './PalettePreview';

interface PaletteDetailsProps {
  palette: NormalizedPalette;
  similarPalettes: SearchResult[];
  onBack: () => void;
  onPaletteSelect: (palette: NormalizedPalette) => void;
}

export function PaletteDetails({
  palette,
  similarPalettes,
  onBack,
  onPaletteSelect,
}: PaletteDetailsProps) {
  return (
    <div className="lospec-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 lospec-primary hover:lospec-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Results</span>
        </button>

        <div className="lospec-bg-secondary rounded-lg shadow-lg p-8 border border-[#7a7380] mb-8">
          <div className="flex gap-8">
            <div>
              <PalettePreview
                colors={palette.colors}
                size="large"
                interactive={false}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold lospec-primary mb-2">{palette.title}</h1>

              {palette.author && (
                <p className="lospec-text-secondary mb-4">
                  <span className="font-medium lospec-primary">Author:</span> {palette.author}
                </p>
              )}

              {palette.description && (
                <p className="lospec-text mb-4">{palette.description}</p>
              )}

              <p className="lospec-text-secondary mb-6">
                <span className="font-medium lospec-primary">{palette.numberOfColors}</span> colors
              </p>

              {palette.tags && palette.tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-medium lospec-primary mb-2">Tags:</div>
                  <div className="flex flex-wrap gap-2">
                    {palette.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs lospec-bg px-3 py-1 rounded border border-[#7a7380]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={palette.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 lospec-button px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                View on Lospec
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {similarPalettes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold lospec-primary mb-6">
              Similar Palettes ({similarPalettes.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarPalettes.map((result) => (
                <div
                  key={result.palette.id}
                  onClick={() => onPaletteSelect(result.palette)}
                  className="lospec-bg-secondary rounded-lg p-4 border border-[#7a7380] hover:border-[#e5e3e6] transition-colors cursor-pointer group"
                >
                  <PalettePreview
                    colors={result.palette.colors}
                    size="small"
                    interactive={false}
                  />

                  <h3 className="lospec-primary font-semibold mt-3 mb-2 group-hover:text-white transition-colors">
                    {result.palette.title}
                  </h3>

                  <div className="text-xs lospec-text-secondary space-y-1">
                    <div>Colors: {result.palette.numberOfColors}</div>
                    <div>Distance: {result.totalDistance.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

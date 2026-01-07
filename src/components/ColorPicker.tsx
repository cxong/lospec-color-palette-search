import { useState } from 'react';
import { X } from 'lucide-react';
import { hexToRgb, rgbToHex } from '../utils/colorDistance';
import { PalettePreview } from './PalettePreview';

interface ColorPickerProps {
  queryColors: number[][];
  onQueryColorsChange: (colors: number[][]) => void;
  recentPalettes?: { colors: number[][] }[];
}

export function ColorPicker({
  queryColors,
  onQueryColorsChange,
  recentPalettes = [],
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState('#e5e3e6');

  const addColor = (rgb: number[]) => {
    if (!queryColors.some(c => c[0] === rgb[0] && c[1] === rgb[1] && c[2] === rgb[2])) {
      onQueryColorsChange([...queryColors, rgb]);
    }
  };

  const addColorFromPicker = () => {
    addColor(hexToRgb(currentColor));
  };

  const removeColor = (index: number) => {
    onQueryColorsChange(queryColors.filter((_, i) => i !== index));
  };

  return (
    <div className="lospec-bg-secondary rounded-lg shadow-lg p-6 border border-[#5a536a]">
      <h2 className="text-xl font-semibold mb-4 lospec-primary">Search Colors</h2>

      <div className="flex gap-3 items-center mb-4">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="h-10 w-20 rounded cursor-pointer border border-[#7a7380]"
        />
        <button
          onClick={addColorFromPicker}
          className="lospec-button px-4 py-2 rounded"
        >
          Add Color
        </button>
        <span className="text-sm lospec-text-secondary font-mono">{currentColor.toUpperCase()}</span>
      </div>

      {queryColors.length > 0 ? (
        <div className="mb-6">
          <div className="text-sm font-medium lospec-primary mb-2">
            Query Colors ({queryColors.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {queryColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-1 lospec-bg rounded-lg pr-1 border border-[#7a7380]"
              >
                <div
                  className="w-12 h-10 rounded-l-lg border-r border-[#7a7380]"
                  style={{ backgroundColor: rgbToHex(color) }}
                />
                <span className="text-xs font-mono px-2 lospec-text-secondary">
                  {rgbToHex(color).toUpperCase()}
                </span>
                <button
                  onClick={() => removeColor(index)}
                  className="p-1 hover:bg-[#7a7380] rounded transition-colors"
                  title="Remove color"
                >
                  <X size={16} className="lospec-text-secondary" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm lospec-text-secondary italic mb-4">
          Add colors to search for similar palettes, or click colors in recent palettes
        </div>
      )}

      {recentPalettes.length > 0 && (
        <div className="border-t border-[#7a7380] pt-4">
          <div className="text-sm font-medium lospec-primary mb-3">Recent Palettes:</div>
          <div className="space-y-2">
            {recentPalettes.slice(0, 3).length > 0 && (
              <div className="text-xs lospec-text-secondary mb-2">
                Click colors to add to search:
              </div>
            )}
            {recentPalettes.slice(0, 3).map((palette, idx) => (
              <div key={idx} className="mb-3">
                <PalettePreview
                  colors={palette.colors}
                  onColorClick={(color) => addColor(color)}
                  size="small"
                  interactive={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { X } from 'lucide-react';
import { hexToRgb, rgbToHex } from '../utils/colorDistance';

interface ColorPickerProps {
  queryColors: number[][];
  onQueryColorsChange: (colors: number[][]) => void;
}

export function ColorPicker({ queryColors, onQueryColorsChange }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState('#3b82f6');

  const addColor = () => {
    const rgb = hexToRgb(currentColor);
    if (!queryColors.some(c => c[0] === rgb[0] && c[1] === rgb[1] && c[2] === rgb[2])) {
      onQueryColorsChange([...queryColors, rgb]);
    }
  };

  const removeColor = (index: number) => {
    onQueryColorsChange(queryColors.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Colors</h2>

      <div className="flex gap-3 items-center mb-4">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="h-10 w-20 rounded cursor-pointer border border-gray-300"
        />
        <button
          onClick={addColor}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
        >
          Add Color
        </button>
        <span className="text-sm text-gray-500">{currentColor.toUpperCase()}</span>
      </div>

      {queryColors.length > 0 ? (
        <div>
          <div className="text-sm font-medium text-gray-600 mb-2">
            Query Colors ({queryColors.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {queryColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-100 rounded-lg pr-1 border border-gray-300"
              >
                <div
                  className="w-12 h-10 rounded-l-lg border-r border-gray-300"
                  style={{ backgroundColor: rgbToHex(color) }}
                />
                <span className="text-xs font-mono px-2 text-gray-700">
                  {rgbToHex(color).toUpperCase()}
                </span>
                <button
                  onClick={() => removeColor(index)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Remove color"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500 italic">
          Add colors to search for similar palettes
        </div>
      )}
    </div>
  );
}

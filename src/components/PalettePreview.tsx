import { Check } from 'lucide-react';
import { rgbToHex } from '../utils/colorDistance';

interface PalettePreviewProps {
  colors: number[][];
  queryColors?: number[][];
  onColorClick?: (color: number[]) => void;
  exactMatches?: Map<number, number>;
  size?: 'small' | 'large';
  interactive?: boolean;
}

export function PalettePreview({
  colors,
  queryColors = [],
  onColorClick,
  exactMatches,
  size = 'small',
  interactive = false,
}: PalettePreviewProps) {
  const height = size === 'small' ? 40 : 60;
  const maxWidth = size === 'small' ? 200 : 300;

  const getContrastColor = (rgb: number[]) => {
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  return (
    <div
      className="inline-flex flex-wrap overflow-hidden border border-gray-500 rounded"
      style={{
        width: maxWidth,
        height: height,
      }}
    >
      {colors.map((color, index) => {
        const hasExactMatch = exactMatches?.has(index);
        const isQueryColor = queryColors.some(
          qc => qc[0] === color[0] && qc[1] === color[1] && qc[2] === color[2]
        );

        return (
          <div
            key={index}
            className="flex-1 relative flex items-center justify-center group"
            style={{
              backgroundColor: rgbToHex(color),
              minWidth: `${100 / colors.length}%`,
              cursor: interactive && onColorClick ? 'pointer' : 'default',
            }}
            onClick={(e) => {
              if (interactive && onColorClick) {
                e.stopPropagation();
                if (isQueryColor && queryColors.length > 0) {
                  onColorClick(null);
                } else {
                  onColorClick(color);
                }
              }
            }}
            title={rgbToHex(color)}
          >
            {hasExactMatch && (
              <div
                className="absolute inset-2 border-2 border-dashed rounded flex items-center justify-center"
                style={{ borderColor: getContrastColor(color) }}
              >
                <Check
                  size={size === 'small' ? 14 : 20}
                  style={{ color: getContrastColor(color) }}
                  strokeWidth={3}
                />
              </div>
            )}
            {interactive && (
              <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

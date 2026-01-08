import { rgbToHex } from '../utils/colorDistance';

interface PalettePreviewProps {
  colors: number[][];
  onColorClick?: (color: number[]) => void;
  exactMatches?: Map<number, number>;
  size?: 'small' | 'large';
  interactive?: boolean;
}

export function PalettePreview({
  colors,
  onColorClick,
  exactMatches,
  size = 'small',
  interactive = false,
}: PalettePreviewProps) {
  const height = size === 'small' ? 40 : 60;
  const maxWidth = size === 'small' ? 200 : 300;

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
        return (
          <div
            key={index}
            className={`flex-1 ${
              interactive && onColorClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            } ${
              hasExactMatch ? 'ring-2 ring-offset-1 ring-[#e5e3e6]' : ''
            }`}
            style={{
              backgroundColor: rgbToHex(color),
              minWidth: `${100 / colors.length}%`,
            }}
            onClick={(e) => {
              if (interactive && onColorClick) {
                e.stopPropagation();
                onColorClick(color);
              }
            }}
            title={rgbToHex(color)}
          />
        );
      })}
    </div>
  );
}

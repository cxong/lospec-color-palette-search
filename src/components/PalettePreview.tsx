import { rgbToHex } from '../utils/colorDistance';

interface PalettePreviewProps {
  colors: number[][];
  size?: 'small' | 'large';
}

export function PalettePreview({ colors, size = 'small' }: PalettePreviewProps) {
  const height = size === 'small' ? 40 : 60;
  const maxWidth = size === 'small' ? 200 : 300;

  return (
    <div
      className="inline-flex flex-wrap overflow-hidden border border-gray-300 rounded"
      style={{
        width: maxWidth,
        height: height,
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{
            backgroundColor: rgbToHex(color),
            minWidth: `${100 / colors.length}%`,
          }}
          title={rgbToHex(color)}
        />
      ))}
    </div>
  );
}

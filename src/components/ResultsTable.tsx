import { ExternalLink } from 'lucide-react';
import { SearchResult, NormalizedPalette } from '../types/palette';
import { PalettePreview } from './PalettePreview';

interface ResultsTableProps {
  results: SearchResult[];
  queryColors?: number[][];
  onRowClick?: (palette: NormalizedPalette) => void;
  onColorClick?: (color: number[]) => void;
}

export function ResultsTable({ results, queryColors = [], onRowClick, onColorClick }: ResultsTableProps) {
  const getExactMatches = (paletteColors: number[][]) => {
    const exactMatches = new Map<number, number>();
    paletteColors.forEach((color, index) => {
      if (queryColors.some(qc => qc[0] === color[0] && qc[1] === color[1] && qc[2] === color[2])) {
        exactMatches.set(index, index);
      }
    });
    return exactMatches;
  };
  if (results.length === 0) {
    return (
      <div className="lospec-bg-secondary rounded-lg shadow-lg p-8 text-center border border-[#7a7380]">
        <p className="lospec-text-secondary">No results to display. Add query colors to search.</p>
      </div>
    );
  }

  return (
    <div className="lospec-bg-secondary rounded-lg shadow-lg border border-[#7a7380] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[#7a7380]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold lospec-primary uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold lospec-primary uppercase tracking-wider">
                Palette Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold lospec-primary uppercase tracking-wider">
                Preview
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold lospec-primary uppercase tracking-wider">
                Colors
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold lospec-primary uppercase tracking-wider">
                Total Distance
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold lospec-primary uppercase tracking-wider">
                RSS
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold lospec-primary uppercase tracking-wider">
                Penalty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#7a7380]">
            {results.map((result) => (
              <tr
                key={result.palette.id}
                onClick={() => onRowClick?.(result.palette)}
                className="hover:bg-[#7a7380] hover:bg-opacity-30 cursor-pointer transition-colors"
              >
                <td className="px-4 py-4 text-sm lospec-primary font-medium">
                  #{result.rank}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium lospec-primary">
                      {result.palette.title}
                    </span>
                    <ExternalLink size={14} className="lospec-text-secondary opacity-60" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <PalettePreview
                    colors={result.palette.colors}
                    queryColors={queryColors}
                    size="small"
                    exactMatches={getExactMatches(result.palette.colors)}
                    onColorClick={onColorClick}
                    interactive={!!onColorClick}
                  />
                </td>
                <td className="px-4 py-4 text-sm lospec-text-secondary text-right">
                  {result.palette.numberOfColors}
                </td>
                <td className="px-4 py-4 text-sm lospec-primary font-medium text-right">
                  {result.totalDistance.toFixed(1)}
                </td>
                <td className="px-4 py-4 text-sm lospec-text-secondary text-right">
                  {result.rss.toFixed(1)}
                </td>
                <td className="px-4 py-4 text-sm lospec-text-secondary text-right">
                  {result.colorPenalty.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

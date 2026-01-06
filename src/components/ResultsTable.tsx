import { ExternalLink } from 'lucide-react';
import { SearchResult } from '../types/palette';
import { PalettePreview } from './PalettePreview';

interface ResultsTableProps {
  results: SearchResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const openPalette = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <p className="text-gray-500">No results to display. Add query colors to search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Palette Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Colors
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total Distance
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                RSS
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Penalty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result) => (
              <tr
                key={result.palette.id}
                onClick={() => openPalette(result.palette.url)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                  #{result.rank}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {result.palette.title}
                    </span>
                    <ExternalLink size={14} className="text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <PalettePreview colors={result.palette.colors} size="small" />
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 text-right">
                  {result.palette.numberOfColors}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 font-medium text-right">
                  {result.totalDistance.toFixed(1)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 text-right">
                  {result.rss.toFixed(1)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 text-right">
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

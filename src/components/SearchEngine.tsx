import { useMemo } from 'react';
import { NormalizedPalette, SearchResult } from '../types/palette';
import { calculateTotalDistance } from '../utils/colorDistance';

const MAX_RESULTS = 50;

interface SearchEngineProps {
  palettes: NormalizedPalette[];
  queryColors: number[][];
  children: (results: SearchResult[]) => React.ReactNode;
}

export function SearchEngine({ palettes, queryColors, children }: SearchEngineProps) {
  const results = useMemo(() => {
    if (queryColors.length === 0) {
      return [];
    }

    const scoredPalettes = palettes.map(palette => {
      const { totalDistance, rss, colorPenalty } = calculateTotalDistance(
        queryColors,
        palette.colors,
        palette.numberOfColors
      );

      return {
        palette,
        totalDistance,
        rss,
        colorPenalty,
        rank: 0,
      };
    });

    scoredPalettes.sort((a, b) => a.totalDistance - b.totalDistance);

    const topResults = scoredPalettes.slice(0, MAX_RESULTS);

    topResults.forEach((result, index) => {
      result.rank = index + 1;
    });

    return topResults;
  }, [palettes, queryColors]);

  return <>{children(results)}</>;
}

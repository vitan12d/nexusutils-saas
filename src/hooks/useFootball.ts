import { useState, useEffect } from 'react';
import { Match, LeagueStandings } from '../types';

// Client-side auto-refresh interval: 60 seconds
const REFRESH_INTERVAL_MS = 60000;

export function useMatches(selectedDate: string) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isUsingMocks, setIsUsingMocks] = useState<boolean>(false);

  const fetchMatches = async (silently = false) => {
    if (!silently) {
      setIsLoading(true);
    }
    setError(null);
    try {
      // Fetch both daily fixtures and live matches to build a complete feed
      const fixturesResponse = await fetch(`/api/football/fixtures?date=${selectedDate}`);
      if (!fixturesResponse.ok) {
        throw new Error('فشل تحميل جدول مباريات اليوم');
      }
      const result = await fixturesResponse.json();
      
      setMatches(result.data || []);
      setIsUsingMocks(result.source === 'fallback_mock_data');
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error("[useMatches Hook] Error loading matches:", err);
      setError(err?.message || "حدث خطأ غير متوقع أثناء تحديث النتائج");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on date changes
    fetchMatches(false);

    // Set up polling intervals to fetch fresh API cache data automatically every 60s
    const timer = setInterval(() => {
      fetchMatches(true);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [selectedDate]);

  return {
    matches,
    isLoading,
    error,
    lastUpdated,
    isUsingMocks,
    refetch: () => fetchMatches(false),
  };
}

export function useStandings(leagueId: string) {
  const [standings, setStandings] = useState<LeagueStandings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMocks, setIsUsingMocks] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchStandings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/football/standings?league=${leagueId}`);
        if (!response.ok) {
          throw new Error('فشل جلب جدول ترتيب الدوري');
        }
        const result = await response.json();
        if (isMounted) {
          setStandings(result.data);
          setIsUsingMocks(result.source === 'fallback_mock_data');
        }
      } catch (err: any) {
        console.error("[useStandings Hook] Error loading standings:", err);
        if (isMounted) {
          setError(err?.message || "تعذر تحديث جدول الترتيب بالكامل");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStandings();
    return () => {
      isMounted = false;
    };
  }, [leagueId]);

  return {
    standings,
    isLoading,
    error,
    isUsingMocks
  };
}

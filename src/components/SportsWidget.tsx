/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Activity, Clock, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Fixture {
  fixture: { id: number; status: { elapsed: number; short: string } };
  teams: { home: { name: string; logo: string }; away: { name: string; logo: string } };
  goals: { home: number | null; away: number | null };
}

export default function SportsWidget() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveFixtures = async () => {
      const apiKey = (import.meta as any).env.VITE_FOOTBALL_API_KEY;
      if (!apiKey) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?league=39&season=2025', {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFixtures(data.response || []);
        }
      } catch (err) {
        console.error("Failed to fetch live fixtures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveFixtures();
  }, []);

  if (loading) {
    return (
        <div className="w-full py-12 bg-white border border-gray-200 rounded-xl shadow-xs text-center text-gray-500 font-semibold text-xs" id="msn-sports-widget">
            {isEn ? "Loading live data..." : "جاري تحميل البيانات الحية..."}
        </div>
    );
  }

  if (fixtures.length === 0) {
    return (
      <div className="w-full py-12 bg-white border border-gray-200 rounded-xl shadow-xs text-center text-gray-500 font-semibold text-xs" id="msn-sports-widget">
        {isEn ? "No live matches right now." : "لا توجد مباريات حية حالياً."}
      </div>
    );
  }

  return (
    <div className="w-full py-6 bg-white border border-gray-200 rounded-xl shadow-xs animate-fade-in" id="msn-sports-widget">
      <div className="px-4 md:px-6">
        <div className={`flex items-center gap-2 border-b border-gray-100 pb-4 mb-4 ${isEn ? 'flex-row-reverse' : ''}`}>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div className={isEn ? 'text-left' : 'text-right'}>
            <h3 className="text-base font-black text-gray-950">{isEn ? "Live Matches" : "المباريات الحية"}</h3>
          </div>
        </div>

        <div className="space-y-4">
          {fixtures.map((fixture) => (
            <div key={fixture.fixture.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className="w-5 h-5" />
                    {fixture.teams.home.name}
                  </div>
                  <span>{fixture.goals.home ?? 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className="w-5 h-5" />
                    {fixture.teams.away.name}
                  </div>
                  <span>{fixture.goals.away ?? 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[10px] font-bold">
                <Clock className="w-3 h-3" />
                {fixture.fixture.status.elapsed}'
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useWeather } from "../../providers/WeatherContext";

import { CurrentConditions } from "../CurrentConditions";
import { SegmentSelector } from "../SegmentSelector";
import { AlertsPanel } from "../AlertsPanel";
import { WeatherMap } from "../WeatherMap";
import { ForecastChart } from "../ForecastChart";
import { WeekForecast } from "../WeekForecast";

export function DashboardPage() {
  const {
    current,
    forecast,
    history24h,
    loading,
    segment,
    segments,
    language
  } = useWeather();

  if (loading || !current) {
    return (
      <div className="p-6 text-gray-600 animate-pulse">
        Loading weather data…
      </div>
    );
  }

  const active = segments.find((s) => s.id === segment) ?? segments[0];
  const [latitude, longitude] = active.coords.split(",").map(Number);

  return (
    <div className="p-6 space-y-10">

      {/* Location Selector */}
      <SegmentSelector />

      {/* ---------------- TOP ROW ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT SIDE: Alerts + AI summary */}
        <div className="lg:col-span-3 space-y-6">
          <AlertsPanel language={language} selectedSegment={active} />

          {/* AI SUMMARY — DO NOT MOVE */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[200px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Project Summary</h2>
            <p className="text-gray-600">
              AI-generated sector-specific weather advice will appear here.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Current Conditions */}
        <div className="lg:col-span-1">
          <CurrentConditions />
        </div>
      </div>

      {/* ---------------- FORECAST (wider) ---------------- */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-noned grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN: stacked charts */}
          <div className="lg:col-span-2 space-y-6">
            <ForecastChart language={language} />
            <WeekForecast language={language} />
          </div>

          {/* RIGHT COLUMN: empty */}
          <div className="lg:col-span-1" />
        </div>
      </div>

      {/* ---------------- MAP ---------------- */}
      <WeatherMap language={language} segment={active} />
    </div>
  );
}

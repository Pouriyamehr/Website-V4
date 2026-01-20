"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getWeather } from "../lib/weather";

// -------------------------------
// SEGMENTS (your 3 locations)
// -------------------------------
const SEGMENTS = [
  {
    id: "segment-1",
    name: "Delft (HQ)",
    location: "Netherlands",
    coords: "52.0116,4.3571",
  },
  {
    id: "segment-2",
    name: "Aruba",
    location: "Caribbean",
    coords: "12.5211,-69.9683",
  },
  {
    id: "segment-3",
    name: "Melbourne",
    location: "Australia",
    coords: "-37.8136,144.9631",
  },
];

// -------------------------------
// TYPES
// -------------------------------
interface WeatherContextType {
  current: any | null;
  forecast: any[] | null;
  history24h: any[] | null;
  loading: boolean;

  // Location
  segment: string;
  setSegment: (id: string) => void;
  segments: typeof SEGMENTS;

  // Language
  language: "en" | "nl";
  setLanguage: (lang: "en" | "nl") => void;
}

// -------------------------------
// CONTEXT
// -------------------------------
const WeatherContext = createContext<WeatherContextType | null>(null);

// -------------------------------
// PROVIDER
// -------------------------------
export function WeatherProvider({ children }: { children: React.ReactNode }) {
  // UI language (from your App)
  const [language, setLanguage] = useState<"en" | "nl">("en");

  // Which location is selected
  const [segment, setSegment] = useState("segment-1");

  // Weather data
  const [current, setCurrent] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[] | null>(null);
  const [history24h, setHistory24h] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine active coordinates
  const active = SEGMENTS.find((s) => s.id === segment) ?? SEGMENTS[0];
  const [lat, lon] = active.coords.split(",").map(Number);

  // Fetch weather every 5 minutes
  useEffect(() => {
    async function load() {
      try {
        const data = await getWeather(lat, lon);

        setCurrent(data.current);
        setForecast(data.forecast);
        setHistory24h(data.history24h);
      } catch (err) {
        console.error("Weather load failed:", err);
      }
      setLoading(false);
    }

    load(); // initial call

    const timer = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [lat, lon]);

  return (
    <WeatherContext.Provider
      value={{
        current,
        forecast,
        history24h,
        loading,

        // location selection
        segment,
        setSegment,
        segments: SEGMENTS,

        // language
        language,
        setLanguage,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

// -------------------------------
// HOOK
// -------------------------------
export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside <WeatherProvider>");
  return ctx;
}

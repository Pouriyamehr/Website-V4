"use client";

import { useWeather } from "../providers/WeatherContext";
import { Card } from "./ui/card";
import { Thermometer, Wind, Compass, Droplets, CloudRain } from "lucide-react";
import { UVIndexIndicator } from "./UVIndexIndicator";

const translations = {
  en: {
    title: "Current Conditions",
    temperature: "Temperature",
    feelsLike: "Feels like",
    windSpeed: "Wind Speed",
    gusts: "Gusts up to",
    windDirection: "Wind Direction",
    humidity: "Humidity",
    rainIntensity: "Rain Intensity",
    summary: "Conditions Summary",
  },
  nl: {
    title: "Huidige Omstandigheden",
    temperature: "Temperatuur",
    feelsLike: "Voelt als",
    windSpeed: "Windsnelheid",
    gusts: "Windstoten tot",
    windDirection: "Windrichting",
    humidity: "Luchtvochtigheid",
    rainIntensity: "Regenintensiteit",
    summary: "Omstandigheden Samenvatting",
  },
};

export function CurrentConditions() {
  const { current, loading, language, segment, segments } = useWeather();

  if (loading || !current) {
    return <div className="p-4 animate-pulse text-gray-600">Loading...</div>;
  }

  const t = translations[language];

  // ---- NEW: get lat/lon from selected segment ----
  const active = segments.find((s) => s.id === segment)!;
  const [latitude, longitude] = active.coords.split(",").map(Number);

  const metrics = [
    {
      label: t.temperature,
      value: current.temperature,
      unit: "°C",
      icon: <Thermometer className="w-5 h-5 text-blue-600" />,
      detail: `${t.feelsLike} ${current.feelsLike}°C`,
    },
    {
      label: t.windSpeed,
      value: current.windSpeed,
      unit: "m/s",
      icon: <Wind className="w-5 h-5 text-blue-600" />,
      detail: `${t.gusts} ${current.gusts} m/s`,
    },
    {
      label: t.windDirection,
      value: current.windDirection,
      unit: `${current.windDegrees}°`,
      icon: <Compass className="w-5 h-5 text-blue-600" />,
    },
    {
      label: t.humidity,
      value: current.humidity,
      unit: "%",
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
    },
    {
      label: t.rainIntensity,
      value: current.rainIntensity,
      unit: "mm/h",
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      detail: current.rainDescription,
    },
  ];

  return (
    <Card className="p-6 h-full">
      <h2 className="text-gray-900 mb-4">{t.title}</h2>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300"
          >
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                {metric.icon}
              </div>
              <div>
                <div className="text-sm text-gray-900 mb-1">{metric.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl text-gray-900">{metric.value}</span>
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                </div>
                {metric.detail && (
                  <div className="text-xs text-gray-600 mt-1">
                    {metric.detail}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- UPDATED UV ---- */}
      <div className="mt-6">
        <UVIndexIndicator
          language={language}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </Card>
  );
}

import { Card } from "./ui/card";
import { Cloud, CloudRain, Sun, CloudDrizzle } from "lucide-react";

type Language = "en" | "nl";

interface WeekForecastProps {
  language: Language;
}

export function WeekForecast({ language }: WeekForecastProps) {
  const translations = {
    en: {
      title: "7-Day Forecast",
      subtitle: "Temperature and precipitation outlook",
      high: "High",
      low: "Low",
      rain: "Rain",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      daysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    nl: {
      title: "7-Daagse Voorspelling",
      subtitle: "Temperatuur en neerslagverwachting",
      high: "Max",
      low: "Min",
      rain: "Regen",
      days: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
      daysShort: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    },
  };

  const t = translations[language];

  const weekData = [
    { day: 0, tempHigh: 13, tempLow: 8, rain: 2.5, condition: "rain" },
    { day: 1, tempHigh: 14, tempLow: 9, rain: 1.2, condition: "drizzle" },
    { day: 2, tempHigh: 15, tempLow: 10, rain: 0.3, condition: "cloudy" },
    { day: 3, tempHigh: 16, tempLow: 11, rain: 0.0, condition: "sunny" },
    { day: 4, tempHigh: 17, tempLow: 12, rain: 0.0, condition: "sunny" },
    { day: 5, tempHigh: 15, tempLow: 11, rain: 0.8, condition: "drizzle" },
    { day: 6, tempHigh: 14, tempLow: 10, rain: 1.5, condition: "rain" },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "drizzle":
        return <CloudDrizzle className="w-8 h-8 text-blue-400" />;
      case "rain":
        return <CloudRain className="w-8 h-8 text-blue-600" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekData.map((day, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all hover:shadow-md"
          >
            {/* Day name */}
            <div className="text-center mb-3">
              <div className="text-sm text-gray-900 hidden sm:block">{t.days[day.day]}</div>
              <div className="text-sm text-gray-900 sm:hidden">{t.daysShort[day.day]}</div>
            </div>

            {/* Weather icon */}
            <div className="flex justify-center mb-3">
              {getWeatherIcon(day.condition)}
            </div>

            {/* Temperature */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2">
                <div className="text-gray-900">
                  {day.tempHigh}°
                </div>
                <div className="text-gray-500">
                  {day.tempLow}°
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {t.high} / {t.low}
              </div>
            </div>

            {/* Rain */}
            {day.rain > 0 && (
              <div className="text-center pt-3 border-t border-gray-200">
                <div className="text-blue-600">
                  {day.rain} mm
                </div>
                <div className="text-xs text-gray-600 mt-1">{t.rain}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

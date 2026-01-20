import { Card } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Language = "en" | "nl";

interface ForecastChartProps {
  language: Language;
}

export function ForecastChart({ language }: ForecastChartProps) {
  const translations = {
    en: {
      title: "4-Hour Forecast",
      windSpeed: "Wind Speed (m/s)",
      rainIntensity: "Rain Intensity (mm/h)",
      windTrend: "Wind Speed Trend",
      rain: "Rain Intensiteit",
      peakWind: "Peak Wind",
      peakRain: "Peak Rain",
      improvement: "Improvement",
      expectedAt: "Expected at",
      conditionsImproving: "Conditions improving",
      after: "After",
    },
    nl: {
      title: "4-Uurs Voorspelling",
      windSpeed: "Windsnelheid (m/s)",
      rainIntensity: "Regenintensiteit (mm/u)",
      windTrend: "Windsnelheidstrend",
      rain: "Regenintensiteit",
      peakWind: "Piek Wind",
      peakRain: "Piek Regen",
      improvement: "Verbetering",
      expectedAt: "Verwacht om",
      conditionsImproving: "Omstandigheden verbeteren",
      after: "Na",
    },
  };

  const t = translations[language];

  // Mock 4-hour forecast data (15-minute intervals)
  const forecastData = [
    { time: "14:00", wind: 12.3, rain: 0.8 },
    { time: "14:15", wind: 12.8, rain: 1.2 },
    { time: "14:30", wind: 13.5, rain: 1.5 },
    { time: "14:45", wind: 14.2, rain: 1.8 },
    { time: "15:00", wind: 15.1, rain: 2.1 },
    { time: "15:15", wind: 15.8, rain: 2.3 },
    { time: "15:30", wind: 16.2, rain: 1.9 },
    { time: "15:45", wind: 15.5, rain: 1.4 },
    { time: "16:00", wind: 14.8, rain: 1.0 },
    { time: "16:15", wind: 14.2, rain: 0.7 },
    { time: "16:30", wind: 13.6, rain: 0.5 },
    { time: "16:45", wind: 13.1, rain: 0.3 },
    { time: "17:00", wind: 12.5, rain: 0.2 },
    { time: "17:15", wind: 11.9, rain: 0.1 },
    { time: "17:30", wind: 11.3, rain: 0.0 },
    { time: "17:45", wind: 10.8, rain: 0.0 },
    { time: "18:00", wind: 10.2, rain: 0.0 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded" />
            <span className="text-gray-900">{t.windSpeed}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded" />
            <span className="text-gray-900">{t.rainIntensity}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wind Speed Line Chart */}
        <div>
          <h3 className="text-sm text-gray-900 mb-3">{t.windTrend}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forecastData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
                label={{ value: 'm/s', angle: -90, position: 'insideLeft', style: { fontSize: '13px', fill: '#374151', fontWeight: '500' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="wind" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Rain Intensity Bar Chart */}
        <div>
          <h3 className="text-sm text-gray-900 mb-3">{t.rain}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={forecastData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
                label={{ value: 'mm/h', angle: -90, position: 'insideLeft', style: { fontSize: '13px', fill: '#374151', fontWeight: '500' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="rain" fill="#4b5563" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key forecast insights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-sm text-gray-900 mb-1">{t.peakWind}</div>
            <div className="text-xl text-gray-900">16.2 m/s</div>
            <div className="text-sm text-gray-600 mt-1">{t.expectedAt} 15:30</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-sm text-gray-900 mb-1">{t.peakRain}</div>
            <div className="text-xl text-gray-900">2.3 mm/h</div>
            <div className="text-sm text-gray-600 mt-1">{t.expectedAt} 15:15</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-gray-900 mb-1">{t.improvement}</div>
            <div className="text-xl text-gray-900">{t.after} 15:45</div>
            <div className="text-sm text-gray-600 mt-1">{t.conditionsImproving}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
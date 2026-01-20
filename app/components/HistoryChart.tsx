import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Language = "en" | "nl";

interface HistoryChartProps {
  language: Language;
}

export function HistoryChart({ language }: HistoryChartProps) {
  const translations = {
    en: {
      title: "24-Hour History",
      temperature: "Temperature (°C)",
      windSpeed: "Wind Speed (m/s)",
      tempHistory: "Temperature History",
      windHistory: "Wind Speed History",
      lastDay: "Last 24 Hours",
    },
    nl: {
      title: "24-Uurs Geschiedenis",
      temperature: "Temperatuur (°C)",
      windSpeed: "Windsnelheid (m/s)",
      tempHistory: "Temperatuurgeschiedenis",
      windHistory: "Windsnelheidsgeschiedenis",
      lastDay: "Laatste 24 Uur",
    },
  };

  const t = translations[language];

  // Mock 24-hour history data (2-hour intervals)
  const historyData = [
    { time: "14:00", temp: 12.4, wind: 12.3 },
    { time: "16:00", temp: 13.1, wind: 13.8 },
    { time: "18:00", temp: 12.8, wind: 14.5 },
    { time: "20:00", temp: 11.5, wind: 12.1 },
    { time: "22:00", temp: 10.2, wind: 10.5 },
    { time: "00:00", temp: 9.1, wind: 9.2 },
    { time: "02:00", temp: 8.5, wind: 8.8 },
    { time: "04:00", temp: 8.0, wind: 8.3 },
    { time: "06:00", temp: 7.8, wind: 8.0 },
    { time: "08:00", temp: 9.2, wind: 9.5 },
    { time: "10:00", temp: 10.8, wind: 11.2 },
    { time: "12:00", temp: 11.9, wind: 12.0 },
    { time: "14:00", temp: 12.4, wind: 12.3 },
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-sm text-gray-600">{t.lastDay}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature History */}
        <div>
          <h3 className="text-sm text-gray-900 mb-3">{t.tempHistory}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={historyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#374151"
                style={{ fontSize: '13px', fontWeight: '500' }}
                label={{ value: '°C', angle: -90, position: 'insideLeft', style: { fontSize: '13px', fill: '#374151', fontWeight: '500' } }}
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
                dataKey="temp" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Wind Speed History */}
        <div>
          <h3 className="text-sm text-gray-900 mb-3">{t.windHistory}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={historyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
      </div>
    </Card>
  );
}

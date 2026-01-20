"use client";

import { Alert, AlertDescription } from "./ui/alert";
import { AlertTriangle, Info, Wind, CloudRain } from "lucide-react";
import { Badge } from "./ui/badge";

type Language = "en" | "nl";

interface Segment {
  id: string;
  name: string;
  location: string;
  coords: string;
}

export interface WeatherAlert {
  id: string;
  severity: "warning" | "info";
  type: string;
  message: string;
  icon: React.ReactNode;
  timestamp: string;
}

interface AlertsPanelProps {
  language: Language;
  selectedSegment: Segment;
  alerts?: WeatherAlert[]; // NOW DYNAMIC
}

const translations = {
  en: {
    title: "Active Alerts",
    noAlerts:
      "No active weather alerts at this time. Conditions are within normal operating parameters.",
    highWind: "High Wind Warning",
    highWindMsg:
      "High wind expected in the next 45 minutes. Crane operation may not be safe.",
    rainAdvisory: "Rain Advisory",
    rainAdvisoryMsg:
      "Moderate rain expected between 15:00-15:30. Consider covering exposed materials.",
    next45: "Next 45 min",
    time: "15:00-15:30",
  },
  nl: {
    title: "Actieve Waarschuwingen",
    noAlerts:
      "Geen actieve weerwaarschuwingen op dit moment. Omstandigheden zijn binnen normale bedrijfsparameters.",
    highWind: "Hoge Wind Waarschuwing",
    highWindMsg:
      "Hoge wind verwacht in de komende 45 minuten. Kraanbediening is mogelijk niet veilig.",
    rainAdvisory: "Regen Advies",
    rainAdvisoryMsg:
      "Matige regen verwacht tussen 15:00-15:30. Overweeg het afdekken van blootgestelde materialen.",
    next45: "Komende 45 min",
    time: "15:00-15:30",
  },
};

export function AlertsPanel({
  language,
  selectedSegment,
  alerts,
}: AlertsPanelProps) {
  const t = translations[language];

  // FALLBACK: If no alerts passed in, use mock data
  const mockAlerts: WeatherAlert[] = [
    {
      id: "1",
      severity: "warning",
      type: t.highWind,
      message: t.highWindMsg,
      icon: <Wind className="w-5 h-5" />,
      timestamp: t.next45,
    },
    {
      id: "2",
      severity: "info",
      type: t.rainAdvisory,
      message: t.rainAdvisoryMsg,
      icon: <CloudRain className="w-5 h-5" />,
      timestamp: t.time,
    },
  ];

  const finalAlerts = alerts ?? mockAlerts; // <-- dynamic override

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-gray-900" />
        <h2 className="text-gray-900">{t.title}</h2>
        <Badge variant="secondary" className="ml-2 text-sm">
          {finalAlerts.length}
        </Badge>
      </div>

      {finalAlerts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {finalAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`
                border-2
                ${
                  alert.severity === "warning"
                    ? "border-amber-400 bg-amber-50"
                    : "border-blue-400 bg-blue-50"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                  rounded-lg p-2
                  ${
                    alert.severity === "warning"
                      ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                      : "bg-blue-100 text-blue-700 border-2 border-blue-300"
                  }
                `}
                >
                  {alert.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div
                      className={`${
                        alert.severity === "warning"
                          ? "text-amber-900"
                          : "text-blue-900"
                      }`}
                    >
                      {alert.type}
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        text-xs border-2
                        ${
                          alert.severity === "warning"
                            ? "border-amber-500 text-amber-800 bg-amber-100"
                            : "border-blue-500 text-blue-800 bg-blue-100"
                        }
                      `}
                    >
                      {alert.timestamp}
                    </Badge>
                  </div>

                  <AlertDescription
                    className={`text-sm ${
                      alert.severity === "warning"
                        ? "text-amber-900"
                        : "text-blue-900"
                    }`}
                  >
                    {alert.message}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      ) : (
        <Alert className="border-2 border-gray-300 bg-white">
          <Info className="w-5 h-5 text-gray-600" />
          <AlertDescription className="text-gray-900">
            {t.noAlerts}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

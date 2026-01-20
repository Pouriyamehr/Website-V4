import { Card } from "../ui/card";
import { Radio, Wind, Thermometer, Droplets, Activity, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";

type Language = "en" | "nl";

interface SensorDataPageProps {
  language: Language;
}

export function SensorDataPage({ language }: SensorDataPageProps) {
  const translations = {
    en: {
      title: "Sensor Data Overview",
      subtitle: "Real-time monitoring of all weather sensors",
      sensorId: "Sensor ID",
      type: "Type",
      location: "Location",
      status: "Status",
      lastReading: "Last Reading",
      battery: "Battery",
      signal: "Signal",
      active: "Active",
      offline: "Offline",
      maintenance: "Maintenance",
      dataQuality: "Data Quality",
      excellent: "Excellent",
      good: "Good",
    },
    nl: {
      title: "Sensorgegevensoverzicht",
      subtitle: "Real-time monitoring van alle weersensoren",
      sensorId: "Sensor-ID",
      type: "Type",
      location: "Locatie",
      status: "Status",
      lastReading: "Laatste Meting",
      battery: "Batterij",
      signal: "Signaal",
      active: "Actief",
      offline: "Offline",
      maintenance: "Onderhoud",
      dataQuality: "Datakwaliteit",
      excellent: "Uitstekend",
      good: "Goed",
    },
  };

  const t = translations[language];

  const sensors = [
    {
      id: "WS-001",
      type: language === "en" ? "Wind Sensor" : "Windsensor",
      icon: <Wind className="w-5 h-5" />,
      location: "Site Alpha - Tower North",
      status: "active" as const,
      lastReading: "14:23:15",
      currentValue: "12.3 m/s",
      battery: 94,
      signal: 98,
      quality: "excellent" as const,
    },
    {
      id: "TS-002",
      type: language === "en" ? "Temperature Sensor" : "Temperatuursensor",
      icon: <Thermometer className="w-5 h-5" />,
      location: "Site Alpha - Ground Level",
      status: "active" as const,
      lastReading: "14:23:10",
      currentValue: "12.4 °C",
      battery: 87,
      signal: 95,
      quality: "excellent" as const,
    },
    {
      id: "HS-003",
      type: language === "en" ? "Humidity Sensor" : "Vochtigheidssensor",
      icon: <Droplets className="w-5 h-5" />,
      location: "Site Alpha - Central",
      status: "active" as const,
      lastReading: "14:23:12",
      currentValue: "76 %",
      battery: 91,
      signal: 92,
      quality: "excellent" as const,
    },
    {
      id: "WS-004",
      type: language === "en" ? "Wind Sensor" : "Windsensor",
      icon: <Wind className="w-5 h-5" />,
      location: "Site Beta - Main Area",
      status: "active" as const,
      lastReading: "14:23:18",
      currentValue: "8.7 m/s",
      battery: 78,
      signal: 88,
      quality: "good" as const,
    },
    {
      id: "RS-005",
      type: language === "en" ? "Rain Sensor" : "Regensensor",
      icon: <Radio className="w-5 h-5" />,
      location: "Site Beta - Tower East",
      status: "maintenance" as const,
      lastReading: "12:45:33",
      currentValue: "0.0 mm/h",
      battery: 45,
      signal: 67,
      quality: "good" as const,
    },
    {
      id: "TS-006",
      type: language === "en" ? "Temperature Sensor" : "Temperatuursensor",
      icon: <Thermometer className="w-5 h-5" />,
      location: "Site Gamma - South",
      status: "offline" as const,
      lastReading: "11:22:05",
      currentValue: "—",
      battery: 12,
      signal: 0,
      quality: "good" as const,
    },
  ];

  const getStatusBadge = (status: "active" | "offline" | "maintenance") => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.active}
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            <Activity className="w-3 h-3 mr-1" />
            {t.maintenance}
          </Badge>
        );
      case "offline":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t.offline}
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-900 mb-1">{t.active}</div>
              <div className="text-2xl text-gray-900 mt-1">4 / 6</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-300">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-900 mb-1">{t.offline}</div>
              <div className="text-2xl text-gray-900 mt-1">1</div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-900 mb-1">{t.maintenance}</div>
              <div className="text-2xl text-gray-900 mt-1">1</div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-amber-300">
              <Activity className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-900 mb-1">{t.dataQuality}</div>
              <div className="text-lg text-gray-900 mt-1">{t.excellent}</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-300">
              <Activity className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Sensors Table */}
      <Card className="p-6 border-2 border-gray-200">
        <h3 className="text-gray-900 mb-4">All Sensors</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.sensorId}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.type}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.location}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.status}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.lastReading}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">Value</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.battery}</th>
                <th className="text-left py-3 px-4 text-sm text-gray-900">{t.signal}</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{sensor.id}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="text-blue-600">{sensor.icon}</div>
                      <span className="text-gray-900">{sensor.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{sensor.location}</div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(sensor.status)}</td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{sensor.lastReading}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{sensor.currentValue}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        <div
                          className={`h-full ${
                            sensor.battery > 70
                              ? "bg-green-500"
                              : sensor.battery > 30
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${sensor.battery}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 min-w-[3ch]">{sensor.battery}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        <div
                          className={`h-full ${
                            sensor.signal > 80
                              ? "bg-green-500"
                              : sensor.signal > 50
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${sensor.signal}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 min-w-[3ch]">{sensor.signal}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
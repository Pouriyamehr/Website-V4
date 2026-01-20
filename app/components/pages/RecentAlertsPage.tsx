import { Card } from "../ui/card";
import { Bell, Wind, CloudRain, Thermometer, AlertTriangle, Settings, CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";

type Language = "en" | "nl";

interface RecentAlertsPageProps {
  language: Language;
}

type AlertSeverity = "warning" | "info";

interface AlertItem {
  id: string;
  type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  location: string;
  timestamp: string;
  date: "today" | "yesterday" | "thisWeek";
  status: "resolved" | "active";
  icon: React.ReactNode;
}

export function RecentAlertsPage({ language }: RecentAlertsPageProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    highWind: true,
    heavyRain: true,
    extremeTemp: true,
    lowVisibility: false,
    lightning: true,
    uvIndex: false,
  });

  const translations = {
    en: {
      title: "Recent Alerts",
      subtitle: "View and manage weather alerts and notification preferences",
      notificationSettings: "Notification Settings",
      notificationDesc: "Choose which types of alerts you want to receive notifications for",
      alertHistory: "Alert History",
      today: "Today",
      yesterday: "Yesterday",
      thisWeek: "This Week",
      warning: "Warning",
      info: "Info",
      resolved: "Resolved",
      active: "Active",
      alertTypes: {
        highWind: "High Wind Warnings",
        heavyRain: "Heavy Rain Alerts",
        extremeTemp: "Extreme Temperature",
        lowVisibility: "Low Visibility",
        lightning: "Lightning Warnings",
        uvIndex: "High UV Index",
      },
      alertDescriptions: {
        highWind: "Get notified when wind speeds exceed safe operation thresholds",
        heavyRain: "Alerts for heavy rainfall that may affect operations",
        extremeTemp: "Warnings for extreme heat or cold conditions",
        lowVisibility: "Notifications when visibility drops below safe levels",
        lightning: "Critical alerts for lightning activity in the area",
        uvIndex: "Alerts when UV index reaches dangerous levels",
      },
      noAlerts: "No alerts",
      allClear: "All systems operating normally",
    },
    nl: {
      title: "Recente Waarschuwingen",
      subtitle: "Bekijk en beheer weerwaarschuwingen en meldingsvoorkeuren",
      notificationSettings: "Meldingsinstellingen",
      notificationDesc: "Kies voor welke soorten waarschuwingen u meldingen wilt ontvangen",
      alertHistory: "Waarschuwingsgeschiedenis",
      today: "Vandaag",
      yesterday: "Gisteren",
      thisWeek: "Deze Week",
      warning: "Waarschuwing",
      info: "Info",
      resolved: "Opgelost",
      active: "Actief",
      alertTypes: {
        highWind: "Hoge Wind Waarschuwingen",
        heavyRain: "Zware Regen Waarschuwingen",
        extremeTemp: "Extreme Temperatuur",
        lowVisibility: "Laag Zicht",
        lightning: "Bliksem Waarschuwingen",
        uvIndex: "Hoge UV-Index",
      },
      alertDescriptions: {
        highWind: "Ontvang meldingen wanneer windsnelheden veilige bedrijfsdrempels overschrijden",
        heavyRain: "Waarschuwingen voor zware regenval die operaties kan beïnvloeden",
        extremeTemp: "Waarschuwingen voor extreme hitte of koude omstandigheden",
        lowVisibility: "Meldingen wanneer zichtbaarheid onder veilige niveaus daalt",
        lightning: "Kritieke waarschuwingen voor bliksemactiviteit in het gebied",
        uvIndex: "Waarschuwingen wanneer UV-index gevaarlijke niveaus bereikt",
      },
      noAlerts: "Geen waarschuwingen",
      allClear: "Alle systemen werken normaal",
    },
  };

  const t = translations[language];

  const alertHistory: AlertItem[] = [
    {
      id: "1",
      type: "highWind",
      severity: "warning" as const,
      title: language === "en" ? "High Wind Warning" : "Hoge Wind Waarschuwing",
      message: language === "en" 
        ? "Wind speeds reached 16.2 m/s. Crane operation suspended."
        : "Windsnelheden bereikten 16,2 m/s. Kraanbediening opgeschort.",
      location: "Site Alpha - Delft",
      timestamp: "14:45",
      date: "today" as const,
      status: "resolved" as const,
      icon: <Wind className="w-5 h-5" />,
    },
    {
      id: "2",
      type: "heavyRain",
      severity: "info" as const,
      title: language === "en" ? "Rain Advisory" : "Regen Advies",
      message: language === "en"
        ? "Moderate rain expected. Consider covering exposed materials."
        : "Matige regen verwacht. Overweeg het afdekken van blootgestelde materialen.",
      location: "Site Alpha - Delft",
      timestamp: "13:20",
      date: "today" as const,
      status: "active" as const,
      icon: <CloudRain className="w-5 h-5" />,
    },
    {
      id: "3",
      type: "highWind",
      severity: "warning" as const,
      title: language === "en" ? "High Wind Warning" : "Hoge Wind Waarschuwing",
      message: language === "en"
        ? "Sustained winds over 15 m/s detected. Outdoor work restricted."
        : "Aanhoudende wind boven 15 m/s gedetecteerd. Buitenwerk beperkt.",
      location: "Site Beta - Rotterdam",
      timestamp: "09:15",
      date: "yesterday" as const,
      status: "resolved" as const,
      icon: <Wind className="w-5 h-5" />,
    },
    {
      id: "4",
      type: "extremeTemp",
      severity: "info" as const,
      title: language === "en" ? "Temperature Advisory" : "Temperatuur Advies",
      message: language === "en"
        ? "High temperatures expected. Ensure workers stay hydrated."
        : "Hoge temperaturen verwacht. Zorg ervoor dat werknemers gehydrateerd blijven.",
      location: "Site Delta - Melbourne",
      timestamp: "16:40",
      date: "yesterday" as const,
      status: "resolved" as const,
      icon: <Thermometer className="w-5 h-5" />,
    },
    {
      id: "5",
      type: "lightning",
      severity: "warning" as const,
      title: language === "en" ? "Lightning Warning" : "Bliksem Waarschuwing",
      message: language === "en"
        ? "Lightning detected within 10km. All outdoor personnel evacuated."
        : "Bliksem gedetecteerd binnen 10 km. Al het buitenpersoneel geëvacueerd.",
      location: "Site Gamma - Den Haag",
      timestamp: "11:30",
      date: "thisWeek" as const,
      status: "resolved" as const,
      icon: <AlertTriangle className="w-5 h-5" />,
    },
  ];

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const groupedAlerts = {
    today: alertHistory.filter(a => a.date === "today"),
    yesterday: alertHistory.filter(a => a.date === "yesterday"),
    thisWeek: alertHistory.filter(a => a.date === "thisWeek"),
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert History - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t.alertHistory}</h3>

            {/* Today's Alerts */}
            {groupedAlerts.today.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm text-gray-600 mb-3">{t.today}</h4>
                <div className="space-y-3">
                  {groupedAlerts.today.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-2 ${
                        alert.severity === "warning"
                          ? "bg-red-50 border-red-300"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-lg p-2 ${
                            alert.severity === "warning"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {alert.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className={`${
                              alert.severity === "warning" ? "text-red-900" : "text-blue-900"
                            }`}>
                              {alert.title}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={alert.status === "active" ? "default" : "outline"}
                                className={
                                  alert.status === "active"
                                    ? alert.severity === "warning"
                                      ? "bg-red-100 text-red-800 border-red-300"
                                      : "bg-green-100 text-green-800 border-green-300"
                                    : "bg-gray-100 text-gray-600 border-gray-300"
                                }
                              >
                                {alert.status === "active" ? t.active : t.resolved}
                              </Badge>
                              <span className="text-xs text-gray-500">{alert.timestamp}</span>
                            </div>
                          </div>
                          <p className={`text-sm mb-2 ${
                            alert.severity === "warning" ? "text-red-800" : "text-blue-800"
                          }`}>
                            {alert.message}
                          </p>
                          <div className="text-xs text-gray-600">{alert.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday's Alerts */}
            {groupedAlerts.yesterday.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm text-gray-600 mb-3">{t.yesterday}</h4>
                <div className="space-y-3">
                  {groupedAlerts.yesterday.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-lg border bg-gray-50 border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg p-2 bg-gray-200 text-gray-600">
                          {alert.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-gray-900">{alert.title}</div>
                            <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                          <div className="text-xs text-gray-600">{alert.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Week's Alerts */}
            {groupedAlerts.thisWeek.length > 0 && (
              <div>
                <h4 className="text-sm text-gray-600 mb-3">{t.thisWeek}</h4>
                <div className="space-y-3">
                  {groupedAlerts.thisWeek.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-lg border bg-gray-50 border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg p-2 bg-gray-200 text-gray-600">
                          {alert.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-gray-900">{alert.title}</div>
                            <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                          <div className="text-xs text-gray-600">{alert.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Notification Settings - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900">{t.notificationSettings}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">{t.notificationDesc}</p>

            <div className="space-y-4">
              {Object.entries(t.alertTypes).map(([key, label]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor={key} className="text-gray-900 cursor-pointer">
                      {label}
                    </Label>
                    <Switch
                      id={key}
                      checked={notificationSettings[key as keyof typeof notificationSettings]}
                      onCheckedChange={() => toggleNotification(key as keyof typeof notificationSettings)}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {t.alertDescriptions[key as keyof typeof t.alertDescriptions]}
                  </p>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-blue-900 mb-1">
                    {Object.values(notificationSettings).filter(Boolean).length} {language === "en" ? "active" : "actief"}
                  </div>
                  <div className="text-xs text-blue-700">
                    {language === "en" 
                      ? "You will receive notifications for the enabled alert types"
                      : "U ontvangt meldingen voor de ingeschakelde waarschuwingstypen"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
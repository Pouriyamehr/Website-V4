import { Card } from "../ui/card";
import { Info, Cloud, Shield, Zap, Database, MapPin } from "lucide-react";

type Language = "en" | "nl";

interface InfoPageProps {
  language: Language;
}

export function InfoPage({ language }: InfoPageProps) {
  const translations = {
    en: {
      title: "Information",
      subtitle: "About Tropometrics Weather Monitoring System",
      aboutTitle: "About Tropometrics",
      aboutText: "Tropometrics provides professional hyperlocal weather monitoring solutions for field operations, construction sites, and industrial facilities. Our advanced sensor network delivers real-time, accurate weather data to help you make informed operational decisions.",
      featuresTitle: "Key Features",
      features: [
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "Hyperlocal Monitoring",
          description: "Precise weather measurements for specific project locations with meter-level accuracy.",
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Real-time Data",
          description: "Live weather updates every 15 seconds, ensuring you always have the latest conditions.",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Safety Alerts",
          description: "Automated warnings for dangerous conditions affecting crane operations, welding, and other activities.",
        },
        {
          icon: <Database className="w-6 h-6" />,
          title: "Historical Data",
          description: "Access comprehensive weather archives for compliance reporting and trend analysis.",
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          title: "Multi-site Support",
          description: "Monitor multiple project locations from a single dashboard with easy switching.",
        },
      ],
      systemTitle: "System Specifications",
      specs: [
        { label: "Update Frequency", value: "15 seconds" },
        { label: "Data Retention", value: "5 years" },
        { label: "Sensor Types", value: "Wind, Temperature, Humidity, Rain, Pressure" },
        { label: "API Access", value: "REST API with real-time webhooks" },
        { label: "Uptime SLA", value: "99.9%" },
      ],
    },
    nl: {
      title: "Informatie",
      subtitle: "Over het Tropometrics Weerbewakingssysteem",
      aboutTitle: "Over Tropometrics",
      aboutText: "Tropometrics biedt professionele hyperlokale weerbewakingsoplossingen voor veldoperaties, bouwplaatsen en industriële faciliteiten. Ons geavanceerde sensornetwerk levert realtime, nauwkeurige weergegevens om u te helpen geïnformeerde operationele beslissingen te nemen.",
      featuresTitle: "Belangrijkste Kenmerken",
      features: [
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "Hyperlokale Monitoring",
          description: "Nauwkeurige weermetingen voor specifieke projectlocaties met meternauwkeurigheid.",
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Realtime Gegevens",
          description: "Live weerupdates elke 15 seconden, zodat u altijd de nieuwste omstandigheden heeft.",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Veiligheidswaarschuwingen",
          description: "Geautomatiseerde waarschuwingen voor gevaarlijke omstandigheden die van invloed zijn op kraanoperaties, lassen en andere activiteiten.",
        },
        {
          icon: <Database className="w-6 h-6" />,
          title: "Historische Gegevens",
          description: "Toegang tot uitgebreide weerarchieven voor nalevingsrapportage en trendanalyse.",
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          title: "Ondersteuning voor Meerdere Locaties",
          description: "Monitor meerdere projectlocaties vanaf één dashboard met eenvoudige omschakeling.",
        },
      ],
      systemTitle: "Systeemspecificaties",
      specs: [
        { label: "Updatefrequentie", value: "15 seconden" },
        { label: "Gegevensbewaring", value: "5 jaar" },
        { label: "Sensortypes", value: "Wind, Temperatuur, Vochtigheid, Regen, Druk" },
        { label: "API-toegang", value: "REST API met realtime webhooks" },
        { label: "Uptime SLA", value: "99,9%" },
      ],
    },
  };

  const t = translations[language];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* About Section */}
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">{t.aboutTitle}</h3>
            <p className="text-gray-700 leading-relaxed">{t.aboutText}</p>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="mb-6">
        <h3 className="text-gray-900 mb-4">{t.featuresTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.features.map((feature, index) => (
            <Card key={index} className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* System Specifications */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">{t.systemTitle}</h3>
        <div className="space-y-3">
          {t.specs.map((spec, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="text-gray-600">{spec.label}</span>
              <span className="text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

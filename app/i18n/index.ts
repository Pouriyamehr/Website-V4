export type SupportedLanguage = "en" | "nl";

// You can extend this later (dashboard, alerts, weather, etc.)
export interface RootTranslations {
  header: {
    company: string;
    tagline: string;
    lastUpdated: string;
  };
  sidebar: {
    dashboard: string;
    sensors: string;
    alerts: string;
    info: string;
    support: string;
  };
  sectors: {
    title: string;
    craneOperation: string;
    roofing: string;
    logistics: string;
    offshoreWind: string;
    roadConstruction: string;
    generalConstruction: string;
    highRiseMaintenance: string;
    agriculture: string;
  };
}

export const translations: Record<SupportedLanguage, RootTranslations> = {
  en: {
    header: {
      company: "Tropometrics",
      tagline: "Professional Weather Monitoring",
      lastUpdated: "Last updated",
    },
    sidebar: {
      dashboard: "Dashboard",
      sensors: "Sensor Data",
      alerts: "Recent Alerts",
      info: "Information",
      support: "Support",
    },
    sectors: {
      title: "Work Sectors",
      craneOperation: "Crane Operation",
      roofing: "Roofing",
      logistics: "Logistics",
      offshoreWind: "Offshore Wind",
      roadConstruction: "Road Construction",
      generalConstruction: "General Construction",
      highRiseMaintenance: "High-Rise Maintenance",
      agriculture: "Agriculture",
    },
  },
  nl: {
    header: {
      company: "Tropometrics",
      tagline: "Professionele Weerbewaking",
      lastUpdated: "Laatst bijgewerkt",
    },
    sidebar: {
      dashboard: "Dashboard",
      sensors: "Sensorgegevens",
      alerts: "Recente waarschuwingen",
      info: "Informatie",
      support: "Ondersteuning",
    },
    sectors: {
      title: "Werkssectoren",
      craneOperation: "Kraanbediening",
      roofing: "Dakwerken",
      logistics: "Logistiek",
      offshoreWind: "Offshore wind",
      roadConstruction: "Wegwerkzaamheden",
      generalConstruction: "Algemene bouw",
      highRiseMaintenance: "Hoogbouwonderhoud",
      agriculture: "Landbouw",
    },
  },
};

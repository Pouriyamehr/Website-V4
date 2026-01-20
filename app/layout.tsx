import "./styles/globals.css";
import type { ReactNode } from "react";

import { LanguageProvider } from "./providers/LanguageContext";
import { WeatherProvider } from "./providers/WeatherContext";

export const metadata = {
  title: "Tropometrics Dashboard",
  description: "Weather-aware operations dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {/* Global weather data refreshed every 5 minutes */}
          <WeatherProvider latitude={52.37} longitude={4.89}>
            {children}
          </WeatherProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


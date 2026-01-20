"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardPage } from "./components/pages/DashboardPage";
import { SensorDataPage } from "./components/pages/SensorDataPage";
import { InfoPage } from "./components/pages/InfoPage";
import { SupportPage } from "./components/pages/SupportPage";
import { RecentAlertsPage } from "./components/pages/RecentAlertsPage";
import { Menu, Globe } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { useLanguage } from "./providers/LanguageContext";
import type { SupportedLanguage } from "./i18n";

type Page = "dashboard" | "sensors" | "alerts" | "info" | "support";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState("segment-1");

  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            language={language}
            selectedSegment={selectedSegment}
            onSegmentChange={setSelectedSegment}
          />
        );
      case "sensors":
        return <SensorDataPage language={language} />;
      case "alerts":
        return <RecentAlertsPage language={language} />;
      case "info":
        return <InfoPage language={language} />;
      case "support":
        return <SupportPage language={language} />;
      default:
        return (
          <DashboardPage
            language={language}
            selectedSegment={selectedSegment}
            onSegmentChange={setSelectedSegment}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {/* still passing language prop for now */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        language={language}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-gray-900">{t.header.company}</h1>
                    <div className="h-6 w-px bg-gray-300" />
                    <span className="text-gray-600">{t.header.tagline}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  {/* You can later make this dynamic */}
                  <div className="text-gray-900">10 Nov 2025</div>
                  <div className="text-sm text-gray-600">
                    {t.header.lastUpdated}: 14:23
                  </div>
                </div>

                {/* Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{language.toUpperCase()}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                      <span className={language === "en" ? "" : "text-gray-600"}>
                        English
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("nl")}>
                      <span className={language === "nl" ? "" : "text-gray-600"}>
                        Nederlands
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}

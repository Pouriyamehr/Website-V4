import { LayoutDashboard, Radio, Info, HelpCircle, X, Bell } from "lucide-react";
import { Button } from "./ui/button";

type Page = "dashboard" | "sensors" | "alerts" | "info" | "support";
type Language = "en" | "nl";

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
  language: Language;
}

export function Sidebar({ currentPage, onPageChange, isOpen, onToggle, language }: SidebarProps) {
  const translations = {
    en: {
      navigation: "Navigation",
      dashboard: "Dashboard",
      sensorData: "Sensor Data",
      recentAlerts: "Recent Alerts",
      information: "Information",
      support: "Support",
    },
    nl: {
      navigation: "Navigatie",
      dashboard: "Dashboard",
      sensorData: "Sensorgegevens",
      recentAlerts: "Recente Waarschuwingen",
      information: "Informatie",
      support: "Ondersteuning",
    },
  };

  const t = translations[language];

  const menuItems = [
    {
      id: "dashboard" as Page,
      label: t.dashboard,
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "sensors" as Page,
      label: t.sensorData,
      icon: <Radio className="w-5 h-5" />,
    },
    {
      id: "alerts" as Page,
      label: t.recentAlerts,
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "info" as Page,
      label: t.information,
      icon: <Info className="w-5 h-5" />,
    },
    {
      id: "support" as Page,
      label: t.support,
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
        `}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white">T</span>
              </div>
              <div>
                <div className="text-gray-900">Tropometrics</div>
                <div className="text-xs text-gray-500">Weather Pro</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="text-xs text-gray-500 mb-2 px-3">{t.navigation}</div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-150
                  ${
                    currentPage === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-900">System Online</span>
            </div>
            <div className="text-xs text-gray-500">All sensors active</div>
          </div>
        </div>
      </aside>
    </>
  );
}
import { Card } from "./ui/card";
import { MapPin, Wind, CloudRain, Radio } from "lucide-react";

type Language = "en" | "nl";

interface Segment {
  id: string;
  name: string;
  location: string;
  coords: string;
}

interface WeatherMapProps {
  language: Language;
  segment: Segment;
}

export function WeatherMap({ language, segment }: WeatherMapProps) {
  const translations = {
    en: {
      title: "Project Location",
    },
    nl: {
      title: "Projectlocatie",
    },
  };

  const t = translations[language];

  return (
    <Card className="p-6 h-full">
      <h2 className="text-gray-900 mb-4">{t.title}</h2>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg overflow-hidden" style={{ height: '420px' }}>
        {/* Simplified map background with grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map features - roads/areas */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Simplified road network */}
          <path d="M 0 200 Q 200 180 400 200 T 800 200" stroke="#cbd5e1" strokeWidth="3" fill="none" />
          <path d="M 300 0 L 320 500" stroke="#cbd5e1" strokeWidth="3" fill="none" />
          
          {/* Area markers */}
          <rect x="150" y="120" width="80" height="60" fill="#e2e8f0" opacity="0.6" />
          <rect x="450" y="280" width="100" height="70" fill="#e2e8f0" opacity="0.6" />
        </svg>

        {/* Weather Station Icons */}
        <div className="absolute top-12 right-16 bg-white rounded-full p-2 shadow-md">
          <Radio className="w-5 h-5 text-blue-600" />
        </div>
        <div className="absolute bottom-20 left-16 bg-white rounded-full p-2 shadow-md">
          <Radio className="w-5 h-5 text-blue-600" />
        </div>

        {/* Wind indicator */}
        <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
          <div className="bg-white/90 rounded-full p-3 shadow-lg mb-1">
            <Wind className="w-6 h-6 text-blue-600" style={{ transform: 'rotate(135deg)' }} />
          </div>
          <span className="text-xs bg-white/90 px-2 py-1 rounded">12.3 m/s</span>
        </div>

        {/* Rain indicator */}
        <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
          <div className="bg-white/90 rounded-full p-3 shadow-lg mb-1">
            <CloudRain className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs bg-white/90 px-2 py-1 rounded">Light</span>
        </div>

        {/* Main Project Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping" style={{ width: '60px', height: '60px', top: '-10px', left: '-10px' }} />
            
            {/* Main marker */}
            <div className="relative bg-blue-600 rounded-full p-4 shadow-xl">
              <MapPin className="w-8 h-8 text-white" fill="white" />
            </div>
            
            {/* Location label */}
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-600">
                <div className="text-gray-900">{segment.name}</div>
                <div className="text-xs text-gray-600">{segment.coords}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md w-16 h-16">
          <div className="relative w-full h-full">
            {/* Compass rose background circle */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
            
            {/* Cardinal directions */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-gray-900">N</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400">S</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-gray-400">W</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-400">E</div>
            
            {/* North arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2 L16 12 L12 10 L8 12 Z" fill="#2563eb" />
                <path d="M12 22 L8 12 L12 14 L16 12 Z" fill="#94a3b8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scale */}
        <div className="absolute bottom-4 left-4 bg-white rounded px-3 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="h-0.5 bg-gray-900" style={{ width: '60px' }} />
            <span className="text-xs text-gray-600">500m</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
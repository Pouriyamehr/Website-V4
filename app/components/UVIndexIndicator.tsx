"use client";

import { useState, useEffect } from "react";
import { Sun, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

type Language = "en" | "nl";

interface UVIndexIndicatorProps {
  language: Language;
  latitude: number;
  longitude: number;
}

export function UVIndexIndicator({
  language,
  latitude,
  longitude,
}: UVIndexIndicatorProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [uvIndex, setUvIndex] = useState<number | null>(null);

  // ---------------------------
  // 1. Translations
  // ---------------------------
  const TRANSLATIONS = {
    en: {
      title: "UV Index",
      clickForInfo: "Click for safety information",
      dialogTitle: "UV Index Information",
      currentLevel: "Current Level",
      levels: {
        low: "Low",
        moderate: "Moderate",
        high: "High",
        veryHigh: "Very High",
        extreme: "Extreme",
      },
      advice: {
        low: "No protection required.",
        moderate: "Take precautions.",
        high: "Protection required.",
        veryHigh: "Extra protection needed.",
        extreme: "Avoid direct sunlight.",
      },
    },
    nl: {
      title: "UV-Index",
      clickForInfo: "Klik voor veiligheidsinformatie",
      dialogTitle: "UV-Index Informatie",
      currentLevel: "Huidig Niveau",
      levels: {
        low: "Laag",
        moderate: "Matig",
        high: "Hoog",
        veryHigh: "Zeer Hoog",
        extreme: "Extreem",
      },
      advice: {
        low: "Geen bescherming nodig.",
        moderate: "Neem voorzorgsmaatregelen.",
        high: "Bescherming vereist.",
        veryHigh: "Extra bescherming nodig.",
        extreme: "Vermijd direct zonlicht.",
      },
    },
  }[language];

  // ---------------------------
  // 2. Level helpers
  // ---------------------------
  const getUVLevel = (index: number) => {
    if (index <= 2) return "low";
    if (index <= 5) return "moderate";
    if (index <= 7) return "high";
    if (index <= 10) return "veryHigh";
    return "extreme";
  };

  const getUVColor = (index: number) => {
    if (index <= 2)
      return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", ring: "bg-green-500" };
    if (index <= 5)
      return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", ring: "bg-yellow-500" };
    if (index <= 7)
      return { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", ring: "bg-orange-500" };
    if (index <= 10)
      return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", ring: "bg-red-500" };
    return { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", ring: "bg-purple-500" };
  };

  const level = uvIndex !== null ? getUVLevel(uvIndex) : "low";
  const color = uvIndex !== null ? getUVColor(uvIndex) : getUVColor(0);

  // ---------------------------
  // 3. Fetch real UV index
  // ---------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=uv_index`
        );
        const data = await res.json();

        const uv = data?.current?.uv_index ?? 0;
        setUvIndex(Math.round(uv));
      } catch (err) {
        console.error("Failed to fetch UV:", err);
        setUvIndex(0);
      }
    }

    load();
  }, [latitude, longitude]);

  // ---------------------------
  // 4. Loading UI
  // ---------------------------
  if (uvIndex === null) {
    return (
      <div className="p-4 border-2 rounded-lg bg-gray-100 animate-pulse text-gray-600">
        Loading UV Index...
      </div>
    );
  }

  // ---------------------------
  // 5. UI component
  // ---------------------------
  return (
    <>
      <div
        className={`p-4 cursor-pointer rounded-lg border-2 ${color.bg} ${color.border}`}
        onClick={() => setShowDialog(true)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sun className={`w-5 h-5 ${color.text}`} />
            <span className={color.text}>{TRANSLATIONS.title}</span>
          </div>
          <Info className={`w-4 h-4 ${color.text}`} />
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-3xl ${color.text}`}>{uvIndex}</div>
            <Badge className={`mt-2 ${color.bg} ${color.text} ${color.border}`}>
              {TRANSLATIONS.levels[level]}
            </Badge>
          </div>

          {/* UV scale */}
          <div className="flex gap-1">
            {[...Array(11)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-8 rounded ${i < uvIndex ? color.ring : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div className={`text-xs ${color.text} mt-3`}>
          {TRANSLATIONS.clickForInfo}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{TRANSLATIONS.dialogTitle}</DialogTitle>
            <DialogDescription>
              {TRANSLATIONS.currentLevel}: UV Index {uvIndex} – {TRANSLATIONS.levels[level]}
            </DialogDescription>
          </DialogHeader>

          <div className="p-4">
            <p className="text-gray-900 text-md">
              {TRANSLATIONS.advice[level]}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { MapPin, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useWeather } from "../providers/WeatherContext";

export function SegmentSelector() {
  const { segment, setSegment, segments, language } = useWeather();

  const t = {
    en: { selectSegment: "Select Segment" },
    nl: { selectSegment: "Selecteer Segment" },
  }[language];

  const current = segments.find((s) => s.id === segment) ?? segments[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 min-w-[280px] justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{current.name}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[280px]">
        {segments.map((s) => (
          <DropdownMenuItem
            key={s.id}
            onClick={() => setSegment(s.id)}
            className={segment === s.id ? "bg-blue-50" : ""}
          >
            <div className="flex flex-col gap-1 py-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-900">{s.name}</span>
              </div>

              <div className="text-xs text-gray-600 ml-6">{s.location}</div>
              <div className="text-xs text-gray-500 ml-6">{s.coords}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

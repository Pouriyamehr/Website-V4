"use client";

import { createContext, useContext, useState } from "react";

// -------------------------------
// Allowed Segments
// -------------------------------
const SEGMENTS = {
  delft: {
    id: "delft",
    name: "Delft (HQ)",
    latitude: 52.0116,
    longitude: 4.3571,
  },
  aruba: {
    id: "aruba",
    name: "Aruba",
    latitude: 12.5211,
    longitude: -69.9683,
  },
  melbourne: {
    id: "melbourne",
    name: "Melbourne",
    latitude: -37.8136,
    longitude: 144.9631,
  },
};

// -------------------------------
// Types
// -------------------------------
interface SegmentContextType {
  segment: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  setSegment: (id: keyof typeof SEGMENTS) => void;
}

const SegmentContext = createContext<SegmentContextType | null>(null);

// -------------------------------
// Provider
// -------------------------------
export function SegmentProvider({ children }: { children: React.ReactNode }) {
  const [segmentId, setSegmentId] = useState<keyof typeof SEGMENTS>("delft");

  const segment = SEGMENTS[segmentId];

  return (
    <SegmentContext.Provider
      value={{
        segment: {
          id: segment.id,
          name: segment.name,
          latitude: segment.latitude,
          longitude: segment.longitude,
        },
        setSegment: setSegmentId,
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
}

// -------------------------------
// Hook
// -------------------------------
export function useSegment() {
  const ctx = useContext(SegmentContext);
  if (!ctx) throw new Error("useSegment must be used inside <SegmentProvider>");
  return ctx;
}

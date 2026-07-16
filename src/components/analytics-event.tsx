"use client";

import { useEffect } from "react";
import { type CastingEvent, trackCastingEvent } from "@/lib/analytics";

export function AnalyticsEvent({ name, data }: { name: CastingEvent; data?: Record<string, string | number | boolean | null> }) {
  useEffect(() => {
    trackCastingEvent(name, data);
  }, [data, name]);

  return null;
}

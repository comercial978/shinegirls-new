"use client";

import Link from "next/link";
import { type CastingEvent, trackCastingEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: CastingEvent;
  eventData?: Record<string, string | number | boolean | null>;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export function TrackedLink({ href, eventName, eventData, className, children, ariaLabel, onClick }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        trackCastingEvent(eventName, eventData);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

"use client";

import { useEffect } from "react";

export function TrackPageView({ slug }: { slug: string }) {
  useEffect(() => {
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(
        "/api/track",
        JSON.stringify({ event: "view", slug }),
      );
    }
  }, [slug]);

  return null;
}

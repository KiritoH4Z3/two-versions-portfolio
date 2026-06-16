"use client";
import { useEffect, useState } from "react";

/**
 * False during SSR and the first client render, true after mount.
 * Use to gate Math.random()-based content (petals, dust) so the
 * server and client first render match (no hydration mismatch).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

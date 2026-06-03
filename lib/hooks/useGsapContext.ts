"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Runs GSAP animations scoped to a container ref via gsap.context(), so every
 * tween/ScrollTrigger created inside is automatically reverted on unmount.
 *
 * The callback receives the scoped `gsap` instance and a `reduced` flag so each
 * section can provide a calmer fallback when reduced motion is requested.
 */
export function useGsapContext<T extends HTMLElement = HTMLElement>(
  setup: (ctx: { gsap: typeof gsap; reduced: boolean; self: T }) => void,
  deps: React.DependencyList = []
) {
  const scope = useRef<T>(null);

  useEffect(() => {
    const self = scope.current;
    if (!self) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => setup({ gsap, reduced, self }), self);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

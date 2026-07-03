import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 5;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const hoverRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  const trailRefs = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }).map(() => ({ x: 0, y: 0 }))
  );
  const trailElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);

  const updateTransform = () => {
    const spot = spotlightRef.current;
    if (spot) {
      spot.style.background = `radial-gradient(600px circle at ${posRef.current.x}px ${posRef.current.y}px, color-mix(in oklab, var(--primary) 14%, transparent), transparent 45%)`;
    }
    const cursor = cursorRef.current;
    if (cursor) {
      const scale = hoverRef.current ? 1.5 : 1;
      cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%) scale(${scale})`;
    }
    trailElsRef.current.forEach((el, i) => {
      if (!el) return;
      const t = trailRefs.current[i];
      const size = 1 - i * 0.14;
      const opacity = 1 - i * 0.18;
      el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${Math.max(0.2, size)})`;
      el.style.opacity = String(Math.max(0, opacity));
    });
  };

  const setHover = (next: boolean) => {
    if (hoverRef.current === next) return;
    hoverRef.current = next;
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.dataset.hover = next ? "true" : "false";
    }
    updateTransform();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    setEnabled(true);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          // update trail positions with staggered smoothing
          const target = posRef.current;
          trailRefs.current.forEach((t, i) => {
            const factor = 0.25 - i * 0.03; // earlier trails follow faster
            t.x = lerp(t.x, target.x, factor);
            t.y = lerp(t.y, target.y, factor);
          });
          updateTransform();
          rafRef.current = 0;
        });
      }
    };

    const selector = 'button, a[href], [data-cursor], input, textarea, select, [role="button"]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(selector)) {
        setHover(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(selector) as HTMLElement | null;
      if (!el) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !el.contains(related)) {
        setHover(false);
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] hidden md:block cursor-spotlight"
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailElsRef.current[i] = el; }}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[95] hidden md:block cursor-trail"
        />
      ))}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:flex items-center justify-center"
        style={{ transition: "transform 0.15s ease-out" }}
      >
        <div className="cursor-ring" />
        <div className="cursor-dot" />
      </div>
    </>
  );
}


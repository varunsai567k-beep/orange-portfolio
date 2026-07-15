import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  start?: boolean;
  format?: (n: number) => string;
};

export function CountUp({ end, duration = 1600, suffix = "", prefix = "", start = true, format }: Props) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);

  const rounded = Math.round(value);
  const display = format ? format(rounded) : rounded.toString();
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

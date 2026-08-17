import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function FeatureCarousel({ items }: { items: FeatureItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const d = Math.abs((c as HTMLElement).offsetLeft - track.scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const next = (active + 1) % items.length;
      const child = track.children[next] as HTMLElement | undefined;
      if (child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(id);
  }, [active, paused, items.length]);

  const pauseThenResume = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  };

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={pauseThenResume}
      onTouchStart={pauseThenResume}
      onWheel={pauseThenResume}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((f) => (
          <div
            key={f.title}
            className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]"
          >
            <div className="glow-card h-full rounded-2xl border border-border bg-card p-6">
              <f.icon className="h-7 w-7" strokeWidth={1.6} />
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((f, i) => (
          <button
            key={f.title}
            type="button"
            aria-label={`Go to ${f.title}`}
            onClick={() => {
              pauseThenResume();
              scrollToIndex(i);
            }}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-foreground" : "w-2 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

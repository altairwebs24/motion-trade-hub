export function QuoteMarquee({ quotes }: { quotes: string[] }) {
  const list = quotes.length ? quotes : ["Stay in motion."];
  const loop = [...list, ...list];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {loop.map((quote, i) => (
          <span
            key={`${quote}-${i}`}
            className="script-accent text-3xl text-foreground/80 sm:text-4xl"
          >
            {quote}
            <span className="ml-12 text-foreground/25">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

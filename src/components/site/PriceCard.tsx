import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function PriceCard({
  icon: Icon,
  title,
  price,
  tag,
  perks,
  href,
  cta = "Get access on WhatsApp",
  featured = false,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  price: string;
  tag?: string;
  perks: string[];
  href: string;
  cta?: string;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={`glow-card relative flex flex-col rounded-2xl border p-6 ${
        featured
          ? "border-foreground/60 bg-foreground text-background"
          : "border-border bg-card"
      }`}
    >
      {tag && (
        <span
          className={`absolute -top-3 right-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${
            featured ? "bg-background text-foreground" : "bg-foreground text-background"
          }`}
        >
          {tag}
        </span>
      )}
      <Icon className="h-7 w-7" strokeWidth={1.6} />
      <h3 className="display-title mt-5 text-2xl">{title}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-sm opacity-70">R</span>
        <span className="display-title text-5xl">{price}</span>
      </div>
      <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
            <span className={featured ? "opacity-80" : "text-muted-foreground"}>{perk}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
          featured
            ? "bg-background text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {cta}
      </a>
    </motion.div>
  );
}

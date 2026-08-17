import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BellRing,
  CandlestickChart,
  Crown,
  Gauge,
  LineChart,
  Radar,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { FeatureCarousel } from "@/components/site/FeatureCarousel";
import { QuoteMarquee } from "@/components/site/QuoteMarquee";
import { LeadForm } from "@/components/site/LeadForm";
import { useSiteContent } from "@/hooks/useSiteContent";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Motion Empire — Trade Smarter. Scan Faster. Stay Ahead." },
      {
        name: "description",
        content:
          "Motion Empire is your home for chart scanning tools and VIP trading signals. Download the Android scanner or run it as a web app on iOS.",
      },
      { property: "og:title", content: "Motion Empire — Trade Smarter. Scan Faster." },
      {
        property: "og:description",
        content: "Chart scanner access from R150 and VIP signals for a R100 once-off payment.",
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { icon: Radar, title: "Fast scanning", text: "Sweep multiple charts and surface setups in seconds." },
  { icon: CandlestickChart, title: "Clear structure", text: "Spot key levels, momentum shifts and trend context." },
  { icon: BellRing, title: "Signal ready", text: "Pair the scanner with VIP signals across the market." },
  { icon: Gauge, title: "Built for speed", text: "Lightweight Android app — no clutter, no lag." },
  { icon: Smartphone, title: "iOS friendly", text: "Add the web app to your home screen and go." },
  { icon: ShieldCheck, title: "Risk first", text: "Tools to plan entries, stops and position sizing." },
];

function Index() {
  const { content } = useSiteContent();
  const wa = content["whatsapp"] ?? "";
  const quotes = [content["quote_1"], content["quote_2"], content["quote_3"], content["quote_4"]].filter(
    Boolean,
  ) as string[];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="grain relative overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 text-center sm:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" /> Motion Empire
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="display-title mx-auto mt-7 max-w-4xl text-6xl sm:text-8xl"
          >
            Trade smarter.
            <br />
            <span className="script-accent block text-7xl normal-case tracking-normal sm:text-9xl">
              Scan faster.
            </span>
            Stay ahead.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mt-7 max-w-xl text-base text-muted-foreground"
          >
            Your home for chart scanning tools and trading signals designed to help you identify
            potential market opportunities faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/scanner"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Download the scanner
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              View pricing
            </Link>
          </motion.div>

          <div className="mt-16 flex items-center justify-center gap-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2"><Activity className="h-4 w-4" /> Scan</span>
            <span className="flex items-center gap-2"><LineChart className="h-4 w-4" /> Analyse</span>
            <span className="flex items-center gap-2"><CandlestickChart className="h-4 w-4" /> Trade</span>
          </div>
        </div>
      </section>

      <QuoteMarquee quotes={quotes} />

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="script-accent text-4xl text-foreground/70">Built for the chart</p>
          <h2 className="display-title mt-2 text-4xl sm:text-5xl">What the scanner does</h2>
        </Reveal>
        <Reveal className="mt-12">
          <FeatureCarousel items={FEATURES} />
        </Reveal>
      </section>

      {/* PRICING PREVIEW */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <h2 className="display-title text-4xl sm:text-5xl">Chart scanner access</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pick your window. Pay once on WhatsApp and get set up the same day.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "1 Month", price: content["price_1m"] },
              { label: "3 Months", price: content["price_3m"] },
              { label: "1 Year", price: content["price_1y"] },
              { label: "Lifetime", price: content["price_lifetime"] },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 0.05}>
                <div className="glow-card rounded-2xl border border-border bg-background p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.label}</p>
                  <p className="display-title mt-3 text-5xl">R{p.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              See all plans <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* VIP */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="glow-card relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center">
            <Crown className="mx-auto h-10 w-10" strokeWidth={1.5} />
            <p className="script-accent mt-4 text-4xl text-foreground/70">Join the inner circle</p>
            <h2 className="display-title mt-1 text-4xl sm:text-5xl">VIP Signals Group</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
              A R{content["price_vip"]} once-off payment gets you into the Motion Empire VIP Signals
              Group with trading signals across the market.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(wa, "Hi Motion Empire, I want to join the VIP Signals Group (R100 once-off).")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Join for R{content["price_vip"]}
              </a>
              <Link
                to="/vip"
                className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Learn more
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LEAD FORM */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-24 md:grid-cols-2">
          <Reveal>
            <h2 className="display-title text-4xl">Request access</h2>
            <p className="script-accent mt-2 text-3xl text-foreground/70">We reply fast.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Leave your details and the plan you're after — or skip the form and message us
              straight on WhatsApp.
            </p>
            <a
              href={waLink(wa, "Hi Motion Empire, I'd like access to the chart scanner.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              WhatsApp {content["whatsapp"]}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

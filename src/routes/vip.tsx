import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Crown, LineChart, MessageCircle, Target, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { QuoteMarquee } from "@/components/site/QuoteMarquee";
import { useSiteContent } from "@/hooks/useSiteContent";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/vip")({
  head: () => ({
    meta: [
      { title: "VIP Signals Group — Motion Empire" },
      {
        name: "description",
        content:
          "Join the Motion Empire VIP Signals Group for a R100 once-off payment and receive trading signals across the market.",
      },
      { property: "og:title", content: "Motion Empire VIP Signals Group" },
      { property: "og:description", content: "R100 once-off. Signals across the market." },
    ],
  }),
  component: VipPage,
});

const INCLUDES = [
  { icon: BellRing, title: "Signals across the market", text: "Setups shared as they line up." },
  { icon: Target, title: "Entries, stops, targets", text: "Clear levels so you can plan the trade." },
  { icon: LineChart, title: "Chart context", text: "The reasoning behind each idea, not just a ticker." },
  { icon: Users, title: "A trading circle", text: "Stay sharp around traders doing the same work." },
];

function VipPage() {
  const { content } = useSiteContent();
  const wa = content["whatsapp"] ?? "";
  const quotes = [content["quote_4"], content["quote_1"], content["quote_3"]].filter(Boolean) as string[];

  return (
    <SiteLayout>
      <section className="grain mx-auto max-w-4xl px-5 py-20 text-center">
        <Crown className="mx-auto h-10 w-10" strokeWidth={1.5} />
        <h1 className="display-title mt-6 text-5xl sm:text-7xl">VIP Signals</h1>
        <p className="script-accent mt-2 text-4xl text-foreground/70">One payment. Full access.</p>
        <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground">
          Get access to the Motion Empire VIP Signals Group and receive trading signals across the
          market.
        </p>
        <p className="display-title mt-8 text-7xl">R{content["price_vip"]}</p>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Once-off payment</p>
        <a
          href={waLink(
            wa,
            `Hi Motion Empire, I want to join the VIP Signals Group (R${content["price_vip"]} once-off).`,
          )}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" /> Join on WhatsApp
        </a>
      </section>

      <QuoteMarquee quotes={quotes} />

      <section className="mx-auto max-w-5xl px-5 py-24">
        <Reveal>
          <h2 className="display-title text-4xl sm:text-5xl">What's inside</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {INCLUDES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="glow-card h-full rounded-2xl border border-border bg-card p-6">
                <item.icon className="h-7 w-7" strokeWidth={1.6} />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            Trading involves risk. Signals are ideas, not guarantees — always manage your risk and
            do your own analysis.
          </p>
        </Reveal>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CalendarRange, Crown, Infinity as InfinityIcon, Trophy } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { PriceCard } from "@/components/site/PriceCard";
import { LeadForm } from "@/components/site/LeadForm";
import { useSiteContent } from "@/hooks/useSiteContent";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Motion Empire Chart Scanner & VIP Signals" },
      {
        name: "description",
        content:
          "Chart scanner access from R150 for 1 month up to R650 lifetime, plus VIP Signals for a R100 once-off payment.",
      },
      { property: "og:title", content: "Motion Empire Pricing" },
      {
        property: "og:description",
        content: "R150 monthly, R300 quarterly, R450 yearly, R650 lifetime, R100 VIP once-off.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { content } = useSiteContent();
  const wa = content["whatsapp"] ?? "";

  const plans = [
    {
      icon: CalendarDays,
      title: "1 Month",
      price: content["price_1m"]!,
      perks: ["Full chart scanner access", "Android app + iOS web app", "Setup help on WhatsApp"],
    },
    {
      icon: CalendarRange,
      title: "3 Months",
      price: content["price_3m"]!,
      tag: "Popular",
      perks: ["Everything in 1 Month", "Better value per month", "Priority WhatsApp support"],
      featured: true,
    },
    {
      icon: Trophy,
      title: "1 Year",
      price: content["price_1y"]!,
      perks: ["Everything in 3 Months", "A full year of scanning", "All updates included"],
    },
    {
      icon: InfinityIcon,
      title: "Lifetime",
      price: content["price_lifetime"]!,
      tag: "Best value",
      perks: ["Pay once, keep forever", "All future updates", "Lifetime support"],
    },
  ];

  return (
    <SiteLayout>
      <section className="grain mx-auto max-w-5xl px-5 py-20 text-center">
        <h1 className="display-title text-5xl sm:text-7xl">Pricing</h1>
        <p className="script-accent mt-2 text-4xl text-foreground/70">Simple. Once-off. No fluff.</p>
        <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground">
          Choose a plan, tap the button and finish on WhatsApp — your plan is pre-filled in the
          message.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <PriceCard
              key={plan.title}
              icon={plan.icon}
              title={plan.title}
              price={plan.price}
              {...(plan.tag ? { tag: plan.tag } : {})}
              perks={plan.perks}
              featured={plan.featured ?? false}
              delay={i * 0.06}
              href={waLink(
                wa,
                `Hi Motion Empire, I'd like the ${plan.title} chart scanner plan (R${plan.price}).`,
              )}
            />
          ))}
        </div>

        <div className="mt-6">
          <PriceCard
            icon={Crown}
            title="VIP Signals Group"
            price={content["price_vip"]!}
            tag="Once-off"
            perks={[
              "Trading signals across the market",
              "One payment, no monthly renewals",
              "Pairs perfectly with the chart scanner",
            ]}
            cta="Join the VIP group"
            href={waLink(
              wa,
              `Hi Motion Empire, I want to join the VIP Signals Group (R${content["price_vip"]} once-off).`,
            )}
          />
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="display-title text-4xl">Not sure which plan?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Tell us how you trade and we'll point you to the right access level.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

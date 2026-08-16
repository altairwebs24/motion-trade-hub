import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { LeadForm } from "@/components/site/LeadForm";
import { useSiteContent } from "@/hooks/useSiteContent";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Motion Empire — WhatsApp, TikTok & Instagram" },
      {
        name: "description",
        content:
          "Reach Motion Empire on WhatsApp 068 013 5747, TikTok @trevorgotmotion or Instagram @got_motion.",
      },
      { property: "og:title", content: "Contact Motion Empire" },
      { property: "og:description", content: "WhatsApp, TikTok and Instagram — we reply fast." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content } = useSiteContent();
  const wa = content["whatsapp"] ?? "";

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: content["whatsapp"]!,
      href: waLink(wa, "Hi Motion Empire!"),
    },
    {
      icon: Music2,
      label: "TikTok",
      value: `@${content["tiktok"]}`,
      href: `https://tiktok.com/@${content["tiktok"]}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${content["instagram"]}`,
      href: `https://instagram.com/${content["instagram"]}`,
    },
  ];

  return (
    <SiteLayout>
      <section className="grain mx-auto max-w-4xl px-5 py-20 text-center">
        <h1 className="display-title text-5xl sm:text-7xl">Contact us</h1>
        <p className="script-accent mt-2 text-4xl text-foreground/70">Let's get you scanning.</p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="glow-card flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
              >
                <span className="relative">
                  <span className="pulse-ring absolute inset-0 rounded-full border border-foreground/40" />
                  <c.icon className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </p>
                <p className="mt-2 text-lg font-semibold">{c.value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="display-title text-4xl">Send a message</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Fill this in and we'll come back to you on WhatsApp or email.
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

import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  Download,
  MoreHorizontal,
  PlusSquare,
  Share,
  ShieldCheck,
  Smartphone,
  Radar,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { useActiveApk, useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Download the Motion Empire Chart Scanner" },
      {
        name: "description",
        content:
          "Download the Motion Empire chart scanner APK for Android, or add the web app to your home screen on iOS.",
      },
      { property: "og:title", content: "Download the Motion Empire Chart Scanner" },
      {
        property: "og:description",
        content: "Android APK download plus step-by-step iOS home screen setup.",
      },
    ],
  }),
  component: ScannerPage,
});

function ScannerPage() {
  const { url, version, notes } = useActiveApk();
  const { content } = useSiteContent();
  const webapp = content["webapp_url"] ?? "";

  const iosSteps = [
    { icon: Share, text: "Open the web app link in Safari, then tap the Share button." },
    { icon: PlusSquare, text: 'Scroll down and tap "Add to Home Screen".' },
    { icon: Smartphone, text: "Name it Motion Empire and tap Add — it now opens like an app." },
  ];

  return (
    <SiteLayout>
      <section className="grain mx-auto max-w-5xl px-5 py-20 text-center">
        <Radar className="mx-auto h-10 w-10" strokeWidth={1.5} />
        <h1 className="display-title mt-6 text-5xl sm:text-7xl">The Chart Scanner</h1>
        <p className="script-accent mt-2 text-4xl text-foreground/70">Scan. Analyse. Trade.</p>
        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
          Install it on Android in one tap, or run it as a home screen web app on iPhone.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-24 md:grid-cols-2">
        <Reveal>
          <div className="glow-card flex h-full flex-col rounded-2xl border border-border bg-card p-8">
            <Smartphone className="h-8 w-8" strokeWidth={1.6} />
            <h2 className="display-title mt-5 text-3xl">Android</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Download the APK and install it directly. Version {version}
              {notes ? ` — ${notes}` : ""}
            </p>
            <a
              href={url}
              download="Trevorgotmotion.apk"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Download className="h-4 w-4" /> Download APK
            </a>
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Android may ask you to allow installs from your browser — approve it, then open the
                downloaded file.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glow-card flex h-full flex-col rounded-2xl border border-border bg-card p-8">
            <Apple className="h-8 w-8" strokeWidth={1.6} />
            <h2 className="display-title mt-5 text-3xl">iPhone / iPad</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              iOS runs the scanner as a web app. Add it to your home screen once and it behaves like
              a normal app.
            </p>
            <a
              href={webapp}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <MoreHorizontal className="h-4 w-4" /> Open the web app
            </a>
            <ol className="mt-6 flex flex-col gap-4">
              {iosSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 rounded-full border border-border p-1.5">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}

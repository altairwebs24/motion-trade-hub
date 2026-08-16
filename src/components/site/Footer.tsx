import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Music2, Zap } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { waLink } from "@/lib/site";

export function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" strokeWidth={2.5} />
              <span className="display-title text-xl">Motion Empire</span>
            </div>
            <p className="script-accent mt-2 text-3xl text-foreground/70">
              Scan. Analyse. Trade. Repeat.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Chart scanning tools and trading signals built to help you spot potential market
              opportunities faster.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Explore</span>
              <Link to="/scanner" className="hover:underline">Scanner</Link>
              <Link to="/pricing" className="hover:underline">Pricing</Link>
              <Link to="/vip" className="hover:underline">VIP Signals</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
              <Link to="/auth" className="text-muted-foreground hover:underline">Admin login</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Connect</span>
              <a
                href={waLink(content['whatsapp'] ?? "", "Hi Motion Empire!")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <MessageCircle className="h-4 w-4" /> {content['whatsapp']}
              </a>
              <a
                href={`https://tiktok.com/@${content['tiktok']}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Music2 className="h-4 w-4" /> @{content['tiktok']}
              </a>
              <a
                href={`https://instagram.com/${content['instagram']}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Instagram className="h-4 w-4" /> @{content['instagram']}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline my-8" />

        <p className="text-xs leading-relaxed text-muted-foreground">
          Trading involves risk. Always manage your risk and do your own analysis. Motion Empire
          provides tools and educational signals only — not financial advice.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Motion Empire. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

# Motion Empire — Website + Admin Panel

Black & white brand site for Motion Empire with the chart scanner APK download, plan pricing, VIP signals, and an admin panel.

## Design direction

- Strict monochrome: deep black backgrounds, bone white text, subtle grey surfaces. No colour accents.
- Type mix: a bold condensed display face for headlines, an elegant cursive/script for accents ("Trade Smarter", quotes, section flourishes), and a clean sans for body.
- Icons only (Lucide) — no AI-generated imagery.
- Motion: scroll-reveal sections, animated marquee of motivational quotes, hover glow on cards, animated grain/gradient hero, count-up on price cards, smooth page transitions.

## Pages

- `/` — Hero (Motion Empire, "Scan. Analyse. Trade. Repeat."), quote marquee, scanner overview, pricing preview, VIP block, contact, risk disclaimer footer.
- `/scanner` — What the scanner does, Android APK download button, iOS instructions (Add to Home Screen for `https://trevorgotmotion.lovable.app/dashboard`) with step-by-step icons.
- `/pricing` — R150 / R300 / R450 / R650 scanner plans + R100 VIP once-off. Each button opens WhatsApp to 068 013 5747 pre-filled with the selected plan.
- `/vip` — VIP signals group details, R100 once-off, WhatsApp join button.
- `/contact` — WhatsApp 068 013 5747, TikTok @trevorgotmotion, Instagram @got_motion.
- `/auth` — sign in/up for admins.
- `/admin` — admin dashboard (protected).

Each route gets its own title/description/og metadata.

## APK download and media (Cloudflare fix)

The uploaded `Trevorgotmotion.apk` is published to Lovable's CDN and referenced by its absolute CDN URL. All icons are inline SVG components. This is the fix for assets breaking on Cloudflare: nothing is served from a local `public/` binary path or relative import that the Worker build can drop. No video is included unless you supply one — if you do, it goes to the same CDN.

## Admin panel

Requires Lovable Cloud (database + login). Altairwebs24@gmail.com is the seeded super admin.

- Roles in a dedicated `user_roles` table (never on profiles), checked server-side.
- Admins tab: list admins, add an admin by email, remove admins (super admin cannot be removed).
- Leads tab: submissions from an "Request access / Get started" form on the site, with plan interest and contact.
- Content tab: edit plan prices, motivational quotes, WhatsApp number and social handles — the public pages read these values.
- APK tab: upload a new scanner build and set the active download version.

## Cloudflare deployment

Add `wrangler.jsonc` (Worker + assets binding, `workers_dev: true`, compatibility date and `nodejs_compat`) so it deploys to a `*.workers.dev` subdomain, plus a short deploy note in the README.

## Technical notes

- TanStack Start routes under `src/routes/`; global styles and fonts in `src/styles.css` (`@theme` tokens, fonts loaded via `<link>` in `__root.tsx`).
- Global CSS rule hides `#lovable-badge` (`display:none !important`).
- Animations with Motion for React; no heavy image assets.
- Admin routes live under an `_authenticated` layout; role checks run in server functions, not the client.
- Site content and roles seeded in the initial migration with grants + RLS.

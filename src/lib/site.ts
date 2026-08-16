export const DEFAULT_CONTENT: Record<string, string> = {
  price_1m: "150",
  price_3m: "300",
  price_1y: "450",
  price_lifetime: "650",
  price_vip: "100",
  whatsapp: "068 013 5747",
  tiktok: "trevorgotmotion",
  instagram: "got_motion",
  webapp_url: "https://trevorgotmotion.lovable.app/dashboard",
  quote_1: "Discipline is the edge no indicator can give you.",
  quote_2: "Scan. Analyse. Trade. Repeat.",
  quote_3: "The market rewards patience, not panic.",
  quote_4: "Risk small. Think big. Stay in motion.",
};

export function waLink(rawNumber: string, message: string) {
  const digits = rawNumber.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `27${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}

export const FALLBACK_APK_URL =
  "/__l5e/assets-v1/d6ff429a-5a3b-462a-8b24-cdeb271af50b/Trevorgotmotion.apk";

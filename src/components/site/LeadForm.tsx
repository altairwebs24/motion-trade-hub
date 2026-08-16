import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PLANS = [
  "1 Month — R150",
  "3 Months — R300",
  "1 Year — R450",
  "Lifetime — R650",
  "VIP Signals — R100",
];

export function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [plan, setPlan] = useState(PLANS[0]!);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast.error("Please add your name and a contact number or email.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      contact: contact.trim(),
      plan,
      message: message.trim() || null,
    });
    setBusy(false);
    if (error) {
      toast.error("Could not send. Please message us on WhatsApp instead.");
      return;
    }
    toast.success("Request sent — we'll get back to you shortly.");
    setName("");
    setContact("");
    setMessage("");
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="WhatsApp number or email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <select className={inputClass} value={plan} onChange={(e) => setPlan(e.target.value)}>
        {PLANS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <textarea
        className={`${inputClass} min-h-28 resize-y`}
        placeholder="Anything you'd like us to know (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {busy ? "Sending…" : "Request access"}
      </button>
    </form>
  );
}

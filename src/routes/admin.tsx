import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Download,
  LogOut,
  MessageSquare,
  Settings2,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Motion Empire" },
      { name: "description", content: "Manage admins, leads, site content and app versions." },
      { property: "og:title", content: "Admin Panel — Motion Empire" },
      { property: "og:description", content: "Motion Empire internal dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "admins" | "leads" | "content" | "apk";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-foreground";

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin(user);
  const [tab, setTab] = useState<Tab>("admins");

  if (loading) {
    return <Centered>Loading…</Centered>;
  }

  if (!user) {
    return (
      <Centered>
        <p className="mb-4">You need to sign in to view the admin panel.</p>
        <Link
          to="/auth"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Go to login
        </Link>
      </Centered>
    );
  }

  if (isAdmin.isLoading) return <Centered>Checking access…</Centered>;

  if (!isAdmin.data) {
    return (
      <Centered>
        <ShieldCheck className="mb-3 h-8 w-8" />
        <p className="mb-1 font-semibold">No admin access</p>
        <p className="mb-5 text-sm text-muted-foreground">
          {user.email} is not on the admin list.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/" });
          }}
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
        >
          Sign out
        </button>
      </Centered>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "admins", label: "Admins", icon: Users },
    { id: "leads", label: "Leads", icon: MessageSquare },
    { id: "content", label: "Content", icon: Settings2 },
    { id: "apk", label: "App version", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5" strokeWidth={2.5} />
            <span className="display-title text-lg">Motion Empire</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="display-title text-4xl">Admin panel</h1>
        <p className="script-accent mt-1 text-3xl text-foreground/70">Run the empire.</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "admins" && <AdminsTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "content" && <ContentTab />}
          {tab === "apk" && <ApkTab />}
        </div>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-6">{children}</div>;
}

function AdminsTab() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");

  const admins = useQuery({
    queryKey: ["admin_emails"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_emails")
        .select("id,email,is_super,created_at")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const add = useMutation({
    mutationFn: async (value: string) => {
      const { error } = await supabase
        .from("admin_emails")
        .insert({ email: value.trim().toLowerCase(), is_super: false });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Admin added.");
      setEmail("");
      qc.invalidateQueries({ queryKey: ["admin_emails"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("admin_emails").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Admin removed.");
      qc.invalidateQueries({ queryKey: ["admin_emails"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-lg font-semibold">Add an admin</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The person signs in with this exact email address and gets full admin access.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className={inputClass}
            placeholder="name@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => email.trim() && add.mutate(email)}
            disabled={add.isPending}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" /> Add admin
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Current admins</h2>
        <div className="mt-4 divide-y divide-border">
          {(admins.data ?? []).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm">{a.email}</p>
                {a.is_super && (
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Super admin
                  </span>
                )}
              </div>
              {!a.is_super && (
                <button
                  onClick={() => remove.mutate(a.id)}
                  className="rounded-full border border-border p-2 transition-colors hover:bg-accent"
                  aria-label={`Remove ${a.email}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          {admins.data?.length === 0 && (
            <p className="py-3 text-sm text-muted-foreground">No admins yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

function LeadsTab() {
  const qc = useQueryClient();
  const leads = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id,name,contact,plan,message,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card>
      <h2 className="text-lg font-semibold">Access requests</h2>
      <div className="mt-4 divide-y divide-border">
        {(leads.data ?? []).map((l) => (
          <div key={l.id} className="flex items-start justify-between gap-4 py-4">
            <div>
              <p className="text-sm font-semibold">{l.name}</p>
              <p className="text-sm text-muted-foreground">{l.contact}</p>
              {l.plan && <p className="mt-1 text-xs uppercase tracking-widest">{l.plan}</p>}
              {l.message && <p className="mt-2 text-sm text-muted-foreground">{l.message}</p>}
              <p className="mt-2 text-[11px] text-muted-foreground">
                {new Date(l.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => remove.mutate(l.id)}
              className="rounded-full border border-border p-2 transition-colors hover:bg-accent"
              aria-label="Delete lead"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {leads.data?.length === 0 && (
          <p className="py-3 text-sm text-muted-foreground">No requests yet.</p>
        )}
      </div>
    </Card>
  );
}

function ContentTab() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const rows = useQuery({
    queryKey: ["site_content_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key,value,label")
        .order("key");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved.");
      qc.invalidateQueries({ queryKey: ["site_content_admin"] });
      qc.invalidateQueries({ queryKey: ["site_content"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card>
      <h2 className="text-lg font-semibold">Site content</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Prices, contact details and the motivational quotes shown on the site.
      </p>
      <div className="mt-5 grid gap-4">
        {(rows.data ?? []).map((row) => (
          <div key={row.key} className="grid gap-2 sm:grid-cols-[220px_1fr_auto] sm:items-center">
            <label className="text-sm text-muted-foreground">{row.label || row.key}</label>
            <input
              className={inputClass}
              value={draft[row.key] ?? row.value}
              onChange={(e) => setDraft({ ...draft, [row.key]: e.target.value })}
            />
            <button
              onClick={() => save.mutate({ key: row.key, value: draft[row.key] ?? row.value })}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ApkTab() {
  const qc = useQueryClient();
  const [version, setVersion] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const versions = useQuery({
    queryKey: ["apk_versions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apk_versions")
        .select("id,version,url,notes,is_active,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function upload() {
    if (!file || !version.trim()) {
      toast.error("Pick an APK file and give it a version number.");
      return;
    }
    setBusy(true);
    const path = `scanner/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("downloads").upload(path, file, {
      contentType: "application/vnd.android.package-archive",
      upsert: false,
    });
    if (upErr) {
      setBusy(false);
      toast.error(upErr.message);
      return;
    }
    const { data: signed, error: signErr } = await supabase.storage
      .from("downloads")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 5, { download: "Trevorgotmotion.apk" });
    if (signErr || !signed) {
      setBusy(false);
      toast.error("Uploaded, but could not create a download link.");
      return;
    }
    await supabase.from("apk_versions").update({ is_active: false }).neq("version", "");
    const { error: insErr } = await supabase.from("apk_versions").insert({
      version: version.trim(),
      url: signed.signedUrl,
      notes: notes.trim() || null,
      is_active: true,
    });
    setBusy(false);
    if (insErr) {
      toast.error(insErr.message);
      return;
    }
    toast.success("New scanner version published.");
    setVersion("");
    setNotes("");
    setFile(null);
    qc.invalidateQueries({ queryKey: ["apk_versions"] });
    qc.invalidateQueries({ queryKey: ["apk_active"] });
  }

  const activate = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("apk_versions").update({ is_active: false }).neq("id", id);
      const { error } = await supabase.from("apk_versions").update({ is_active: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Active version updated.");
      qc.invalidateQueries({ queryKey: ["apk_versions"] });
      qc.invalidateQueries({ queryKey: ["apk_active"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-lg font-semibold">Upload a new scanner build</h2>
        <div className="mt-4 grid gap-3">
          <input
            className={inputClass}
            placeholder="Version (e.g. 1.1)"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Release notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <input
            type="file"
            accept=".apk"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm text-muted-foreground file:mr-3 file:rounded-full file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:text-foreground"
          />
          <button
            onClick={upload}
            disabled={busy}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <Download className="h-4 w-4" /> {busy ? "Uploading…" : "Publish version"}
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Versions</h2>
        <div className="mt-4 divide-y divide-border">
          {(versions.data ?? []).map((v) => (
            <div key={v.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-semibold">
                  v{v.version} {v.is_active && <span className="text-xs">• active</span>}
                </p>
                {v.notes && <p className="text-xs text-muted-foreground">{v.notes}</p>}
                <a
                  href={v.url}
                  className="text-xs text-muted-foreground underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download link
                </a>
              </div>
              {!v.is_active && (
                <button
                  onClick={() => activate.mutate(v.id)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                >
                  Make active
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

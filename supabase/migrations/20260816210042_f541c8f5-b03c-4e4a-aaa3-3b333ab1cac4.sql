CREATE TABLE public.admin_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  is_super boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_emails TO authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email, is_super) VALUES ('altairwebs24@gmail.com', true);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

CREATE POLICY "Admins can view admin emails" ON public.admin_emails
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can add admin emails" ON public.admin_emails
  FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND is_super = false);
CREATE POLICY "Admins can remove non-super admins" ON public.admin_emails
  FOR DELETE TO authenticated USING (public.is_admin() AND is_super = false);

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  plan text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete leads" ON public.leads
  FOR DELETE TO authenticated USING (public.is_admin());

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can change site content" ON public.site_content
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.site_content (key, value, label) VALUES
  ('price_1m', '150', 'Scanner — 1 Month (R)'),
  ('price_3m', '300', 'Scanner — 3 Months (R)'),
  ('price_1y', '450', 'Scanner — 1 Year (R)'),
  ('price_lifetime', '650', 'Scanner — Lifetime (R)'),
  ('price_vip', '100', 'VIP Signals once-off (R)'),
  ('whatsapp', '068 013 5747', 'WhatsApp number'),
  ('tiktok', 'trevorgotmotion', 'TikTok handle'),
  ('instagram', 'got_motion', 'Instagram handle'),
  ('webapp_url', 'https://trevorgotmotion.lovable.app/dashboard', 'iOS web app URL'),
  ('quote_1', 'Discipline is the edge no indicator can give you.', 'Quote 1'),
  ('quote_2', 'Scan. Analyse. Trade. Repeat.', 'Quote 2'),
  ('quote_3', 'The market rewards patience, not panic.', 'Quote 3'),
  ('quote_4', 'Risk small. Think big. Stay in motion.', 'Quote 4');

CREATE TABLE public.apk_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  url text NOT NULL,
  notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.apk_versions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.apk_versions TO authenticated;
GRANT ALL ON public.apk_versions TO service_role;
ALTER TABLE public.apk_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read app versions" ON public.apk_versions
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage app versions" ON public.apk_versions
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.apk_versions (version, url, notes, is_active) VALUES
  ('1.0', '/__l5e/assets-v1/d6ff429a-5a3b-462a-8b24-cdeb271af50b/Trevorgotmotion.apk', 'Initial Motion Empire scanner release.', true);

CREATE POLICY "Public can read downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'downloads');
CREATE POLICY "Admins can upload downloads" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'downloads' AND public.is_admin());
CREATE POLICY "Admins can update downloads" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'downloads' AND public.is_admin());
CREATE POLICY "Admins can delete downloads" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'downloads' AND public.is_admin());
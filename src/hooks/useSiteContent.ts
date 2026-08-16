import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_CONTENT, FALLBACK_APK_URL } from "@/lib/site";

export type ContentRow = { key: string; value: string; label: string };

export function useSiteContent() {
  const query = useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<ContentRow[]> => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key,value,label")
        .order("key");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const map: Record<string, string> = { ...DEFAULT_CONTENT };
  for (const row of query.data ?? []) {
    if (row.value) map[row.key] = row.value;
  }

  return { content: map, rows: query.data ?? [], isLoading: query.isLoading };
}

export function useActiveApk() {
  const query = useQuery({
    queryKey: ["apk_active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apk_versions")
        .select("id,version,url,notes,created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });

  return {
    url: query.data?.url ?? FALLBACK_APK_URL,
    version: query.data?.version ?? "1.0",
    notes: query.data?.notes ?? "",
  };
}

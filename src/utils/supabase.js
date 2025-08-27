import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SUPABASE KEY:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing"
);

export function createClerkSupabaseClient(getToken) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      async accessToken() {
        // return session?.getToken() ?? null;
        return (await getToken()) ?? null;
      },
    }
  );
}

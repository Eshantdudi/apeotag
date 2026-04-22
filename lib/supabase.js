import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const globalForSupabase = globalThis;

export const supabase =
  globalForSupabase.supabase ||
  createClient(supabaseUrl, supabaseKey);

if (typeof window !== "undefined") {
  globalForSupabase.supabase = supabase;
}
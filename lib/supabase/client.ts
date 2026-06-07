import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a mock client for build time, real client for runtime
function createBrowserClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey || typeof window === 'undefined') {
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => Promise.resolve({ data: [], error: null }),
            }),
          }),
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    } as unknown as SupabaseClient;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = typeof window !== 'undefined'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createBrowserClient();

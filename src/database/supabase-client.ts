import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/database/database.types';
import { env } from '@/utils/env';

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

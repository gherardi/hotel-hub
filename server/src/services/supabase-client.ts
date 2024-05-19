import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import { env } from '../utils/env';

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_KEY;
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

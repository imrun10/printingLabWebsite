import { createClient } from '@supabase/supabase-js'

// Fetch the API key from an environment variable
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// Check if the environment variables are set
if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase URL or key is missing. Make sure to set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY environment variables.");
}

export default createClient(SUPABASE_URL, SUPABASE_KEY);

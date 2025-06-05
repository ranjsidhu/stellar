const { createClient } = require("@supabase/supabase-js");

const { NEXT_PUBLIC_DB_URL, NEXT_PUBLIC_DB_API_ANON_KEY } = process.env;
const client = createClient(NEXT_PUBLIC_DB_URL, NEXT_PUBLIC_DB_API_ANON_KEY);

export { client };

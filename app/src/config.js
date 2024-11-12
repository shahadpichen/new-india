const config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || "http://localhost:5002",
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
};

export default config;

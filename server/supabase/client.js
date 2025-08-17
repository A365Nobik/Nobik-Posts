import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient("https://ytwdkngbpnbthhqjzofc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0d2RrbmdicG5idGhocWp6b2ZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDI5Nzg3NiwiZXhwIjoyMDY5ODczODc2fQ.TuQu2WED0OGmQaotw6Lakn0Ex_ohvI9bl_0Rat7uxNk" );

const createSupabaseClient = (url, key) => {
  try {
    if (!url || !key) {
      throw new Error("Please enter url adn key!");
    }
    const client = createClient(url, key);
    if (!client) {
      throw new Error("Can't create a client");
    }
    return client;
  } catch (error) {
    return error.message;
  }
};

export default createSupabaseClient
import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "../index.js";
import { supabaseUrl } from "../index.js";


export const supabase = createClient("https://ytwdkngbpnbthhqjzofc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0d2RrbmdicG5idGhocWp6b2ZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDI5Nzg3NiwiZXhwIjoyMDY5ODczODc2fQ.TuQu2WED0OGmQaotw6Lakn0Ex_ohvI9bl_0Rat7uxNk" );

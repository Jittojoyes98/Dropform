import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../_helpers/constants";
export const supabase = createClient(supabaseUrl, supabaseKey);

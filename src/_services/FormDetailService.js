import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useFormDetails = create(() => ({
  data: null,
  getFormDetails: () => {},
}));

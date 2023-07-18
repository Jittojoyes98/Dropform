import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useFormOrder = create(() => ({
  inputs: [],
  setInputs: () => {},
}));

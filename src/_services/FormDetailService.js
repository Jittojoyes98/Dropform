import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useFormDetails = create((set, get) => ({
  data: null,
  currentFormDetails: (formData) => {
    console.log(formData);
    set(() => ({ data: formData }));
  },
}));

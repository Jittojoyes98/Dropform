import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useFormDetails = create((set, get) => ({
  loading: false,
  error: null,
  data: null,
  currentFormDetails: (formData) => {
    set(() => ({ data: formData }));
  },
  getCurrentFormDetails: async (formid) => {
    set(() => ({ loading: true }));
    try {
      const { data, error } = await supabase.rpc("get_current_form_details", {
        formid,
      });
      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
}));

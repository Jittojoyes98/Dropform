import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useCreateFormStore = create((set, get) => ({
  loading: false,
  error: null,
  data: null,
  createForm: async ({ formName }, id) => {
    set(() => ({ loading: true }));
    try {
      console.log(id, formName);
      const { data, error } = await supabase.rpc("create_form_function", {
        created_user_id: id,
        name: formName,
      });
      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
}));

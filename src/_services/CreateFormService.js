import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";
import { toast } from "react-toastify";

export const useCreateFormStore = create((set, get) => ({
  loading: true,
  error: null,
  data: null,
  fetchFormsAgain: true,
  createForm: async ({ formName }, id) => {
    set(() => ({ loading: true }));
    try {
      const { data, error } = await supabase.rpc("create_form_function", {
        created_user_id: id,
        name: formName,
      });
      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  fetchForms: async (id) => {
    set(() => ({ loading: true }));
    try {
      const { data, error } = await supabase.rpc("get_forms", {
        users_id: id,
      });
      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  deleteForms: async (form_id) => {
    set(() => ({ loading: true }));
    try {
      const { error, status } = await supabase
        .from("forms")
        .delete()
        .eq("id", form_id);
      if (error) {
        if (status == 0) {
          set(() => ({ error: "You’re offline", loading: false }));
          toast("You’re offline");
        } else {
          set(() => ({ error: error.message, loading: false }));
        }
        return;
      }
      let currentFetch = get().fetchFormsAgain;
      set(() => ({ loading: false, fetchFormsAgain: !currentFetch }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  updateFormName: async (form_id, name) => {
    set(() => ({ loading: true }));
    try {
      const { error } = await supabase
        .from("question")
        .update({ form_name: name })
        .eq("id", form_id);

      set(() => ({ loading: false }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  clearData: () => {},
}));

import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useQuestions = create((set, get) => ({
  loading: false,
  error: null,
  data: null,
  fetchAgain: true,
  createQuestion: async (formid, type, questionNumber) => {
    set(() => ({ loading: true }));

    try {
      const { data, error } = await supabase.rpc(
        "create_question_initial_function",
        {
          current_form_id: formid,
          question_type: type,
          question_text: `${type} ${questionNumber}`,
        }
      );
      // now the whole list is not retured , will add the necessary in the future.
      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  getQuestion: async (formid) => {
    set(() => ({ loading: true }));

    try {
      const { data, error } = await supabase.rpc("get_current_questions", {
        formid: formid,
      });

      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  deleteQuestion: async (question_id) => {
    set(() => ({ loading: true }));

    try {
      const { error } = await supabase
        .from("question")
        .delete()
        .eq("id", question_id);

      let currentFetch = get().fetchAgain;
      set(() => ({ loading: false, fetchAgain: !currentFetch }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
}));

import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";

export const useQuestions = create((set, get) => ({
  loading: false,
  error: null,
  data: null,
  fetchAgain: true,
  createQuestion: async (formid, type, questionNumber, orderId) => {
    set(() => ({ loading: true }));

    try {
      const { data, error } = await supabase.rpc(
        "create_question_initial_function",
        {
          current_form_id: formid,
          question_type: type,
          question_text: `${type} ${questionNumber}`,
          order_id: orderId,
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
  updateQuestionName: async (question_id, name) => {
    set(() => ({ loading: true }));
    try {
      const { error } = await supabase
        .from("question")
        .update({ question_name: name })
        .eq("id", question_id);

      let currentFetch = get().fetchAgain;
      set(() => ({ loading: false, fetchAgain: !currentFetch }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
  changeOrderId: async (
    question_id_over,
    question_id_active,
    order_id_over,
    order_id_active
  ) => {
    set(() => ({ loading: true }));
    try {
      const { errorOver } = await supabase
        .from("question")
        .update({ order_id: order_id_active })
        .eq("id", question_id_over);
      const { errorActive } = await supabase
        .from("question")
        .update({ order_id: order_id_over })
        .eq("id", question_id_active);

      // let currentFetch = get().fetchAgain;
      set(() => ({ loading: false }));
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
    }
  },
}));

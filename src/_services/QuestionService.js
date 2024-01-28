import { create } from "zustand";
import { supabase } from "../_supabase/supabaseInitialize";
import { setInitialQuestionProperies } from "../_ui/QuestionSettings/SettingsStore";

export const useQuestions = create((set, get) => ({
  loading: true,
  error: null,
  data: null,
  fetchAgain: true,
  createdQuestionId:null,
  deletedQuestionId:null,
  createQuestion: async (formid, type, questionNumber, orderId) => {
    set(() => ({ loading: true }));
    try {
      const { data, error, status } = await supabase.rpc(
        "create_question_initial_function",
        {
          current_form_id: formid,
          question_type: type,
          question_text: `${type} ${questionNumber}`,
          order_id: orderId,
        }
      );
      if(error){
        set(() => ({ loading: false, error:error?.message }));
        return;
      }
      const questionsLength=data.length;
      // now the whole list is not retured , will add the necessary in the future.
      set(() => ({ loading: false, data: data ,createdQuestionId: data[questionsLength-1].id}));
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
  deleteQuestion: async (question_id, form_id) => {
    set(() => ({ loading: true }));
    try {
      const { data, error:errorReorder } = await supabase.rpc(
        "delete_question_with_order",
        {
          formid: form_id,
          questionid: question_id,
        }
      );
      const {error} = await supabase
        .from("question")
        .delete()
        .eq("id", question_id);
      
      if(errorReorder || error){
        set(() => ({ loading: false,error: errorReorder?.message || error?.message}));
        return;
      }

      let currentFetch = get().fetchAgain;
      set(() => ({ loading: false, fetchAgain: !currentFetch, deletedQuestionId: question_id }));
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

export const useQuestionPropertyServices = create((set, get) => ({
  loading: true,
  error: null,
  data: null,
  getAllQuestionProperties:async (formid) => {
    set(() => ({ loading: true }));

    try {
      const {data , error } = await supabase.rpc("get_current_formquestion_properies", {
        formid: formid,
      });

      if(error){
        // handle error 
        set(() => ({ loading: false, error: error.message }));
        return
      }
      setInitialQuestionProperies(data)

      set(() => ({ loading: false, data: data }));
    } catch (error) {
      set(() => ({ loading: false , error: error.message }));
    }
  },
  updateQuestionProperties:async (payload) => {
    set(() => ({ loading: true }));
    
    try {
      const {data , error } = await supabase.rpc("update_settings",
       {payload: [payload]});

      if(error){
        // handle error 
        set(() => ({ loading: false, error: error.message }));
        return
      }
      console.log(data);
      if(data){
        set(() => ({ loading: false, data: data }));
        return true;
      }

      
    } catch (error) {
      set(() => ({ loading: false , error: error.message }));
    }
  },
}))

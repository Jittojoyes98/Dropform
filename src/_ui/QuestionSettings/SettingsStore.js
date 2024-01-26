import { create } from "zustand";
import { initialQuestionProperties } from "../../_helpers/utils";

export const useQuestionProperties = create((set, get) => ({
  questionProperties: {},
  setNewQuestionProperies: (id,formId) =>
    set((state) => ({
      questionProperties: {...state.questionProperties,[id]: initialQuestionProperties(id,formId) } ,
    })),
  deleteQuestionProperties: (questionId) => set((state) =>{ 
    const currentProperties=state.questionProperties;
    delete currentProperties[questionId]
    return { questionProperties: currentProperties }
  }),
  updateQuestionProperties:(updatedProperies)=>set((state) => ({ questionProperties: {...state.questionProperties, [updatedProperies.id] : updatedProperies }})),
  setInitialQuestionProperies:(initialProperties)=>set((state)=>({questionProperties: initialProperties }))
}));

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
  updateQuestionProperties:(updatedProperies)=>set((state) => ({ questionProperties: {...state.questionProperties, [updatedProperies.question_id] : updatedProperies }})),
}));

// modular appraoch to updating store without calling hooks , which is way better
// for service to store approach.

export const setInitialQuestionProperies = (initialProperties) => useQuestionProperties.setState({ questionProperties : initialProperties })

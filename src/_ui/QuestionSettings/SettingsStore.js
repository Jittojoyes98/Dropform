import { create } from "zustand";
import { initialQuestionProperties } from "../../_helpers/utils";

export const useQuestionProperties = create((set, get) => ({
  questions: [],
  setInitialQuestionProperies: (id) =>
    set((state) => ({
      questions: [...state.questions, initialQuestionProperties(id)],
    })),
  setActiveIdOnEnd: () => set((event) => ({ activeId: null })),
}));

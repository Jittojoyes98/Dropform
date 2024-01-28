export const getDataFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const addToLocalStorage = (object) => {
  localStorage.setItem(object["key"], object["value"]);
};
export const initialQuestionProperties = (id,formId) => ({
  question_id: id,
  required: false,
  min_num: null,
  max_char: null,
  max_num: null,
  actual_question: "...",
  is_max_char: false,
  question_form_id:formId,
});

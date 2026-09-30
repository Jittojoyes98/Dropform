import React, { useState } from "react";
import { editorStore } from "./EditorStore";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuestions } from "../_services/QuestionService";
import useSettingsMapper from "../_hooks/useSettingsMapper";
import { useQuestionProperties } from "../_ui/QuestionSettings/SettingsStore";
import { useClickAway } from "../_hooks/useClickAway";

const InputSettings = ({ currentInput }) => {
  const [updateQuestionName] = useQuestions((state) => {
    return [state.updateQuestionName];
  });
  const closeSettings = editorStore((state) => state.closeSettings);
  const questionProperties = useQuestionProperties(
    (state) => state.questionProperties
  );

  const [tabIndex, setTabIndex] = React.useState("1");

  let currentInputName = currentInput?.question_name;
  const [inputName, setInputName] = useState(currentInput?.question_name);
  const inputRef = React.useRef(currentInput?.question_name);
  const nameFieldRef = React.useRef(null);

  const handleNameChange = React.useCallback((e) => {
    setInputName(e.target.value);
    inputRef.current = e.target.value;
  }, []);

  React.useEffect(() => {
    setInputName(currentInput?.question_name);
    inputRef.current = currentInput?.question_name;
  }, [currentInput]);

  const handleClickAway = React.useCallback(() => {
    if (inputName && inputName != currentInputName) {
      updateQuestionName(currentInput.id, inputName);
    } else {
      setInputName(currentInputName);
    }
  }, [inputName, currentInputName, currentInput, updateQuestionName]);

  useClickAway(nameFieldRef, handleClickAway);

  const QuestionSettings = useSettingsMapper()[currentInput.type];

  const currentQuestionProperties = questionProperties[currentInput.id];

  return (
    <div className="settings-wrapper">
      <div className="settings-header">
        <div ref={nameFieldRef}>
          <Input
            value={inputRef.current ?? ""}
            id="filled-hidden-label-small"
            className="input-text-question-field mr-2.5"
            onChange={handleNameChange}
          />
        </div>
        <div onClick={closeSettings} className="settings-close">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="close-svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99931 10.9751L15.0242 16.0014L16 15.027L10.9737 10.0007L16 4.97577L15.0256 4L9.99931 9.0263L4.97439 4L4 4.97577L9.02492 10.0007L4 15.0256L4.97439 16.0014L9.99931 10.9751Z"
              fill="#8092AC"
            ></path>
          </svg>
        </div>
      </div>

      <div>
        <div className="w-full">
          <Tabs
            value={tabIndex}
            onValueChange={setTabIndex}
            className="input-settings-tab"
          >
            <TabsList
              variant="line"
              className="w-full justify-start rounded-none bg-transparent"
            >
              <TabsTrigger
                value="1"
                className="text-[15px] font-normal text-[rgb(137,137,137)] data-[state=active]:text-[rgb(38,38,39)]"
              >
                Question
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className="text-[15px] font-normal text-[rgb(137,137,137)] data-[state=active]:text-[rgb(38,38,39)]"
              >
                Styles
              </TabsTrigger>
              <TabsTrigger
                value="3"
                className="text-[15px] font-normal text-[rgb(137,137,137)] data-[state=active]:text-[rgb(38,38,39)]"
              >
                three
              </TabsTrigger>
            </TabsList>

            <div className="settings-tab-wrapper">
              <TabsContent value="1">
                {QuestionSettings(currentQuestionProperties)}
              </TabsContent>
              <TabsContent value="2">
                <div>
                  <p>The second tab</p>
                </div>
              </TabsContent>
              <TabsContent value="3">
                <div>
                  <p>The third tab</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InputSettings;

import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MeasuringStrategy,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import Playground from "./Playground";
import Widget from "./Widgets";
import Overlay from "./Overlay";
import SortableItems from "./SortableItems";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { editorStore, useDndStore } from "./EditorStore";
import InputSettings from "./InputSettings";
import { useCreateFormStore } from "../_services/CreateFormService";
import { CircularProgressLoader } from "../_ui/Loader/CircularProgress";
import useInputIcons from "../_hooks/useInputIcons";
import { useParams } from "react-router-dom";
import { useQuestions } from "../_services/QuestionService";
import { useFormDetails } from "../_services/FormDetailService";
// https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/

const Editor = () => {
  const openPropertiesDropping = editorStore(
    (state) => state.openPropertiesDropping
  );
  const [formLoading, data, getCurrentFormDetails] = useFormDetails((state) => {
    return [state.loading, state.data, state.getCurrentFormDetails];
  });

  const closeProperties = editorStore((state) => state.closeProperties);
  const [
    questionLoading,
    error,
    createQuestion,
    getQuestion,
    questions,
    fetchAgain,
    changeOrderId,
  ] = useQuestions((state) => {
    return [
      state.loading,
      state.error,
      state.createQuestion,
      state.getQuestion,
      state.data,
      state.fetchAgain,
      state.changeOrderId,
    ];
  });
  const { formid } = useParams();
  const divs = useInputIcons();
  const setActiveIdOnStart = useDndStore((state) => state.setActiveIdOnStart);
  const setActiveIdOnEnd = useDndStore((state) => state.setActiveIdOnEnd);
  const selectedItem = editorStore((state) => state.selectedItem);
  const itemSelected = editorStore((state) => state.itemSelected);
  const [components, setComponents] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fetchQuestions, setFetchQuestions] = useState(true);
  const gridSize = 10; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  const editorRef = useRef(null);
  const initialLoad = useRef(true);
  const [questionCache, setQuestionCache] = useState({});

  // const measuringConfig = {
  //   droppable: {
  //     strategy: MeasuringStrategy.Always,
  //   },
  // };
  // will be working on this.

  useEffect(() => {
    if (!editorRef.current) {
      getCurrentFormDetails(formid);
    }
    getQuestion(formid);
    return () => closeProperties();
  }, [fetchAgain]);

  useEffect(() => {
    setComponents(questions);
    if (Object.keys(questionCache).length === 0) {
      let questionNameCache = questionCache;
      questions?.forEach((question) => {
        if (!questionNameCache[question.type]) {
          questionNameCache[question.type] = 0;
        }
        questionNameCache[question.type]++;
      });
      setQuestionCache(questionNameCache);
    }
  }, [questions]);

  const handleDragStart = (event) => {
    setDragging(true);
    setActiveIdOnStart(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    let id = active.id;
    let type = active.data.current.type;
    setActiveIdOnEnd();

    // create a closure here

    if (over) {
      let questionNameCache = questionCache;

      if (!questionNameCache[type]) {
        questionNameCache[type] = 0;
      }
      questionNameCache[type]++;
      setQuestionCache(questionNameCache);
      createQuestion(
        formid,
        type,
        questionNameCache[type],
        components.length + 1
      );
      openPropertiesDropping(components.length + 1);
      // working on delete
    }
    setDragging(false);
  };
  const handleDragStartLeft = () => {};

  const handleDragSortableEnd = (event) => {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      setComponents((inpt) => {
        const activeIndex = inpt.indexOf(active.id);
        const overIndex = inpt.indexOf(over.id);
        let currentActiveOrderId = inpt[activeIndex].order_id;
        let currentOverOrderId = inpt[overIndex].order_id;
        changeOrderId(
          inpt[activeIndex].id,
          inpt[overIndex].id,
          currentActiveOrderId,
          currentOverOrderId
        );
        inpt = arrayMove(inpt, activeIndex, overIndex);
        inpt[activeIndex].order_id = currentOverOrderId;
        inpt[overIndex].order_id = currentActiveOrderId;
        return inpt;
      });
    }
  };

  if (!components) {
    return (
      <div className="progress-wrapper">
        <CircularProgressLoader />
      </div>
    );
  }

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 8,
  //     },
  //   })
  // );

  return (
    <div className="editor-wrapper">
      <div className="editor-main">
        <div className="editor-order">
          <DndContext
            // sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragSortableEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={components}
              strategy={verticalListSortingStrategy}
            >
              {components?.map((inpt, index) => (
                <SortableItems
                  key={inpt.id}
                  id={inpt}
                  index={index + 1}
                  selectedItem={selectedItem}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Playground
            setComponents={setComponents}
            components={components}
            setQuestionCache={setQuestionCache}
            questionCache={questionCache}
            divs={divs}
            editorRef={editorRef}
          />
          <div className="editor-sidebar">
            <div className="widget-wrapper">
              {/* {console.log(selectedItem)} */}
              {itemSelected && selectedItem > 0 ? (
                <InputSettings currentInput={components[selectedItem - 1]} />
              ) : (
                <>
                  <span style={{ width: "100%" }}>Commonly used</span>
                  {divs.map((div, index) => {
                    return (
                      <Widget
                        key={div.heading}
                        id={div.id}
                        heading={div.type}
                        svgIcon={div.svgIcon}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          {editorRef.current ? (
            createPortal(
              <DragOverlay
                dropAnimation={null}
                modifiers={[snapToGridModifier]}
                zIndex={2}
                style={{ cursor: "grabbing", marginLeft: "20px" }}
              >
                {dragging ? <Overlay /> : null}
              </DragOverlay>,
              editorRef.current
            )
          ) : (
            <></>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;

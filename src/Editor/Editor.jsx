import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MeasuringStrategy,
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
// https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/

const Editor = () => {
  const openPropertiesDropping = editorStore(
    (state) => state.openPropertiesDropping
  );
  const closeProperties = editorStore((state) => state.closeProperties);
  const [loading, error, createQuestion, getQuestion, questions, fetchAgain] =
    useQuestions((state) => {
      return [
        state.loading,
        state.error,
        state.createQuestion,
        state.getQuestion,
        state.data,
        state.fetchAgain,
      ];
    });
  const { formid } = useParams();
  const divs = useInputIcons();
  const setActiveIdOnStart = useDndStore((state) => state.setActiveIdOnStart);
  const setActiveIdOnEnd = useDndStore((state) => state.setActiveIdOnEnd);
  const [loadingState, setLoadingState] = useState(true);
  const selectedItem = editorStore((state) => state.selectedItem);
  const itemSelected = editorStore((state) => state.itemSelected);
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [fetchQuestions, setFetchQuestions] = useState(true);
  const gridSize = 10; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  const editorRef = useRef(null);
  let questionNameCache = {};

  // will be changing and these by fetching

  useEffect(() => {
    getQuestion(formid);
    return () => closeProperties();
  }, [fetchAgain]);

  useEffect(() => {
    setComponents(questions);
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
      if (Object.keys(questionNameCache).length === 0) {
        components.forEach((component) => {
          if (!questionNameCache[component.type]) {
            questionNameCache[component.type] = 0;
          }
          questionNameCache[component.type]++;
        });
      }
      if (!questionNameCache[type]) {
        questionNameCache[type] = 0;
      }
      questionNameCache[type]++;
      createQuestion(formid, type, questionNameCache[type]);
      openPropertiesDropping(components.length + 1);
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
        return arrayMove(inpt, activeIndex, overIndex);
      });
    }
  };
  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  setTimeout(() => {
    setLoadingState(false);
  }, 2000);

  if (loadingState) {
    return (
      <div className="progress-wrapper">
        <CircularProgressLoader />
      </div>
    );
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-main">
        <div className="editor-order">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragSortableEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={components}
              strategy={verticalListSortingStrategy}
            >
              {components.map((inpt) => (
                <SortableItems key={inpt.id} id={inpt} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Playground
            setComponents={setComponents}
            components={components}
            divs={divs}
            editorRef={editorRef}
          />
          <div className="editor-sidebar">
            <div className="widget-wrapper">
              {itemSelected ? (
                <InputSettings />
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

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
  const [loading, error, createQuestion, getQuestion, questions] = useQuestions(
    (state) => {
      return [
        state.loading,
        state.error,
        state.createQuestion,
        state.getQuestion,
        state.data,
      ];
    }
  );
  const { formid } = useParams();
  const divs = useInputIcons();
  const setActiveIdOnStart = useDndStore((state) => state.setActiveIdOnStart);
  const setActiveIdOnEnd = useDndStore((state) => state.setActiveIdOnEnd);
  const selectedItem = editorStore((state) => state.selectedItem);
  const itemSelected = editorStore((state) => state.itemSelected);
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [languages, setLanguages] = useState(["python", "javascript", "java"]);
  const gridSize = 10; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  const editorRef = useRef(null);

  // will be changing and these by fetching
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    getQuestion(formid);
  }, []);

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

    if (over) {
      // it means new question is created so do the rpc for creation of new question and add
      // necessary data from it.
      createQuestion(formid, type);

      const droppedDiv = divs.filter((div) => div.id === id);
      openPropertiesDropping(components.length + 1);
      setComponents((components) => [...components, droppedDiv[0]]);
    }
    setDragging(false);
  };
  const handleDragStartLeft = () => {};

  const handleDragSortableEnd = (event) => {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      setLanguages((language) => {
        const activeIndex = language.indexOf(active.id);
        const overIndex = language.indexOf(over.id);
        return arrayMove(language, activeIndex, overIndex);
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
  console.log(components);

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
              items={languages}
              strategy={verticalListSortingStrategy}
            >
              {languages.map((lan) => (
                <SortableItems key={lan} id={lan} />
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

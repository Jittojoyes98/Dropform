import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MeasuringStrategy,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from "@dnd-kit/core";
import Playground from "./Playground";
import Widget from "./Widgets";
import Overlay from "./Overlay";
import SortableItems from "./SortableItems";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { editorStore, useDndStore } from "./EditorStore";
import InputSettings from "./InputSettings";
import { CircularProgressLoader } from "../_ui/Loader/CircularProgress";
import useInputIcons from "../_hooks/useInputIcons";
import { useParams } from "react-router-dom";
import {
  useQuestionPropertyServices,
  useQuestions,
} from "../_services/QuestionService";
import { useFormDetails } from "../_services/FormDetailService";
import { useQuestionProperties } from "../_ui/QuestionSettings/SettingsStore";
// https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/

const Editor = () => {
  const openPropertiesDropping = editorStore(
    (state) => state.openPropertiesDropping
  );
  const [formLoading, data, getCurrentFormDetails] = useFormDetails((state) => {
    return [state.loading, state.data, state.getCurrentFormDetails];
  });

  const [serviceQuestionProperties, getAllQuestionProperties] =
    useQuestionPropertyServices((state) => {
      return [state.data, state.getAllQuestionProperties];
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
    createdQuestionId,
    deletedQuestionId,
  ] = useQuestions((state) => {
    return [
      state.loading,
      state.error,
      state.createQuestion,
      state.getQuestion,
      state.data,
      state.fetchAgain,
      state.changeOrderId,
      state.createdQuestionId,
      state.deletedQuestionId,
    ];
  });
  const [
    currentQuestionProperties,
    setNewQuestionProperies,
    deleteQuestionProperties,
  ] = useQuestionProperties((state) => {
    return [
      state.questionProperties,
      state.setNewQuestionProperies,
      state.deleteQuestionProperties,
    ];
  });
  const openPropertiesClicking = editorStore(
    (state) => state.openPropertiesClicking
  );
  const { formid } = useParams();
  const divs = useInputIcons();
  const setActiveIdOnStart = useDndStore((state) => state.setActiveIdOnStart);
  const setActiveIdOnEnd = useDndStore((state) => state.setActiveIdOnEnd);
  const selectedItem = editorStore((state) => state.selectedItem);
  const itemSelected = editorStore((state) => state.itemSelected);
  const [components, setComponents] = useState(null);
  const [dragging, setDragging] = useState(false);
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
      getAllQuestionProperties(formid);
    }
    getQuestion(formid);
    return () => closeProperties();
  }, [fetchAgain]);

  useEffect(() => {
    setComponents((prevComponents) => {
      if (!prevComponents || !questions) {
        return questions;
      }
      if (prevComponents.length > questions.length) {
        // deleted
        deleteQuestionProperties(deletedQuestionId);
      }
      if (prevComponents.length < questions.length) {
        // created
        setNewQuestionProperies(createdQuestionId, formid);
      }
      return questions;
    });
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
    }
    setDragging(false);
  };
  const handleDragStartLeft = () => {};

  const handleDragSortableEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setComponents((inpt) => {
        const mappedIds = inpt.map((x) => x.id);
        const activeIndex = mappedIds.indexOf(active.id);
        const overIndex = mappedIds.indexOf(over.id);
        let currentActiveOrderId = inpt[activeIndex].order_id;
        let currentOverOrderId = inpt[overIndex].order_id;
        const moveDirection = activeIndex > overIndex ? 1 : -1;

        changeOrderId(
          inpt[activeIndex].id,
          currentOverOrderId,
          moveDirection,
          formid
        );
        inpt = arrayMove(inpt, activeIndex, overIndex);

        inpt = inpt.map((x, index) => {
          x.order_id = index + 1;
          return x;
        });
        openPropertiesClicking(currentOverOrderId);

        return inpt;
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );

  if (!components) {
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
            sensors={sensors}
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
                  id={inpt.id}
                  item={inpt}
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
              {itemSelected && components[selectedItem - 1] ? (
                <InputSettings currentInput={components[selectedItem - 1]} />
              ) : (
                <>
                  <span style={{ width: "100%" }}>Commonly used</span>
                  {divs.map((div, index) => {
                    return (
                      <Widget
                        key={div.id}
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

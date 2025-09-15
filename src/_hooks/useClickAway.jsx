import { useCallback, useEffect, useRef } from "react";
import { editorStore } from "../Editor/EditorStore";

// https://www.joshwcomeau.com/react/usememo-and-usecallback/
// https://www.joshwcomeau.com/react/why-react-re-renders/
// When a component re-renders, it tries to re-render all descendants, regardless of whether they're being passed a particular state variable through props or not.

const useClickAway = (setAway, editorRef) => {
  const ref = useRef(null);
  const isDropped = editorStore((state) => state.isDropped);
  const changeDrop = editorStore((state) => state.changeDrop);

  const handleClickOutside = useCallback(
    (event) => {
      const refOut = ref.current && !ref.current.contains(event.target);
      const editorRefOut = editorRef.current.contains(event.target);
      const setAwayListener = (awayFunction) => {
        if (refOut) {
          if (editorRefOut) {
            awayFunction();
          }
        }
      };
      if (isDropped) {
        setAwayListener(changeDrop);
        return;
      }
      setAwayListener(setAway);
    },
    [isDropped]
  );

  useEffect(() => {
    document.removeEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
};

export default useClickAway;

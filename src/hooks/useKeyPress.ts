import { useEffect } from "react";

function useKeyPress(key: string, action: () => void) {
  if (typeof key !== "string" || typeof action !== "function") {
    throw new Error("Wrong hook arguments!");
  }

  useEffect(() => {
    function onKeyClick(event: { code: string; preventDefault: () => void }) {
      if (
        event.code === key &&
        document.activeElement.tagName !== "TEXTAREA" &&
        document.activeElement.tagName !== "INPUT"
      ) {
        event.preventDefault();
        action();
      }
    }

    document.addEventListener("keydown", onKeyClick);

    return () => {
      document.removeEventListener("keydown", onKeyClick);
    };
  }, [action]);
}

export default useKeyPress;

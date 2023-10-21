import { useReducer, useCallback } from "react";
import cls from "./note.module.scss";

interface NotePropsType {
  text: string | void;
  edit: (arg0: string | void | undefined) => void;
}

function noteReducer(state, action) {
  switch (action.type) {
    case "editNote": {
      return {
        ...state,
        editMode: true,
      };
    }
    case "textNote": {
      return {
        ...state,
        noteText: action.value,
      };
    }
    case "saveNote": {
      return {
        ...state,
        editMode: false,
      };
    }
  }
}

function Note({ text, edit }: NotePropsType) {
  const [state, dispatch] = useReducer(noteReducer, {
    editMode: false,
    noteText: text,
  });

  const handlerBlurSave = useCallback((): void => {
    dispatch({ type: "saveNote" });
    edit(state.noteText);
  }, [dispatch, edit, state.noteText]);

  return (
    <div className={cls.note}>
      <div className={cls.title}>Note</div>
      {state.editMode ? (
        <textarea
          name="note"
          placeholder="Enter your note..."
          value={state.noteText ?? ""}
          onInput={(event) => {
            dispatch({ type: "textNote", value: event.target.value });
          }}
          onBlur={handlerBlurSave}
          autoFocus
        ></textarea>
      ) : (
        <div
          className={cls.text}
          onClick={() => dispatch({ type: "editNote" })}
          role="button"
          tabIndex={0}
        >
          {state.noteText ?? "Enter you note..."}
        </div>
      )}
    </div>
  );
}

export default Note;

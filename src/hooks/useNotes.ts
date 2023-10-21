import { useState } from "react";

type NoteElemType = {
  id: string;
  note: string;
};

function localData(text: string | null = null, id: string): string | void {
  if (text) {
    localStorage.setItem(id, text);
  } else {
    return localStorage.getItem(id) ?? null;
  }
}

function useNotes() {
  const [notes, setNote] = useState([]);

  function saveNote(text: string, plateId: string) {
    const upNote: NoteElemType | undefined = notes.find(
      (item: NoteElemType) => item.id === plateId
    );
    if (upNote) {
      upNote.note = text;
      setNote([...notes, upNote]);
    } else {
      setNote([...notes, { id: plateId, note: text }]);
    }
    localData(text, plateId);
  }

  function getNote(plateId: string) {
    const findNote: NoteElemType | undefined = notes.find(
      (item: NoteElemType) => item.id === plateId
    );
    if (findNote) {
      return findNote.note;
    } else {
      return localData(null, plateId);
    }
  }

  return [saveNote, getNote] as const;
}

export default useNotes;

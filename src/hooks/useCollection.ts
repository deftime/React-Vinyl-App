import { useState } from "react";

function toLocalStorage(
  coll: Array<number> | null = null
): Array<number> | void {
  if (coll) {
    localStorage.setItem("collection", JSON.stringify(coll));
  } else {
    return JSON.parse(localStorage.getItem("collection")) ?? [];
  }
}

function useCollection() {
  const [collection, setInCollection] = useState(() => toLocalStorage());

  function changeCollection(inColl: boolean, plateId: number): void {
    const newColl: Array<number> = inColl
      ? collection.filter((item: number) => item !== plateId)
      : [...(<[]>collection), plateId];
    setInCollection(newColl);
    toLocalStorage(newColl);
  }

  return [collection, changeCollection] as const;
}

export default useCollection;

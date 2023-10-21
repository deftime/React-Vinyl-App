import { useState } from "react";

function toLocalStorage(
  coll: Array<number> | null = null
): Array<number> | void {
  if (coll) {
    localStorage.setItem("favorites", JSON.stringify(coll));
  } else {
    return JSON.parse(localStorage.getItem("favorites")) ?? [];
  }
}

function useFavorites() {
  const [favorites, setInFavorites] = useState(() => toLocalStorage());

  function changeFavorites(inFav: boolean, plateId: number): void {
    const newFav = inFav
      ? favorites.filter((item: number) => item !== plateId)
      : [...(<[]>favorites), plateId];
    setInFavorites(newFav);
    toLocalStorage(newFav);
  }

  return [favorites, changeFavorites] as const;
}

export default useFavorites;

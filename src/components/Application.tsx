import { Outlet } from "react-router-dom";
import useCollection from "../hooks/useCollection.ts";
import useFavorites from "../hooks/useFavorites.ts";
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import { createContext } from "react";
import useNotes from "../hooks/useNotes.ts";

export type PlateType = {
  id: never | number;
  artist: string;
  title: string;
  genre: number | string;
  styles: Array<string>;
  year: number;
  country: string;
  thumb_image: string;
};

export type CurrentPlateType = {
  inColl: boolean;
  inFav: boolean;
} & PlateType;

export type IdNameType = {
  id: number | string;
  title: string;
};

export const FavCollContext = createContext(null);
export const NotesContext = createContext(null);

function App() {
  const [collection, changeCollection] = useCollection();
  const [favorites, changeFavorites] = useFavorites();
  const [saveNote, getNote] = useNotes();

  return (
    <>
      <div className="fullWrapper">
        <Header collection={collection.length} favorites={favorites.length} />
        <NotesContext.Provider value={{ saveNote, getNote }}>
          <FavCollContext.Provider
            value={{ collection, favorites, changeCollection, changeFavorites }}
          >
            <Outlet />
          </FavCollContext.Provider>
        </NotesContext.Provider>
        <Footer text="(c)Copyrights" />
      </div>
    </>
  );
}

export default App;

import { useContext } from "react";
import cls from "./homePage.module.scss";
import { Helmet } from "react-helmet-async";
import Vynil from "../Vinyl/Vinyl.tsx";
import { FavCollContext, type CurrentPlateType } from "../Application.tsx";
import useFilteredReadyPlates from "../../hooks/useFilteredReadyPlates.ts";

function HomePage() {
  const { collection, favorites, changeCollection, changeFavorites } =
    useContext(FavCollContext);

  const [plateList] = useFilteredReadyPlates(collection, favorites);
  const collList: CurrentPlateType = plateList.filter(
    (plate: CurrentPlateType) => plate.inColl
  );
  const favList: CurrentPlateType = plateList.filter(
    (plate: CurrentPlateType) => plate.inFav
  );

  return (
    <>
      <Helmet>
        <title>React Vynil | Home</title>
      </Helmet>
      <section className={cls.homeLists}>
        <div className={cls.title}>Your Favorites</div>
        <div className={cls.list}>
          {favList.map((plate: CurrentPlateType) => (
            <Vynil
              key={plate.id}
              plateData={plate}
              onColBtnClick={changeCollection}
              onFavBtnClick={changeFavorites}
            />
          ))}
        </div>
        <div className={cls.title}>Your Collection</div>
        <div className={cls.list}>
          {collList.map((plate: CurrentPlateType) => (
            <Vynil
              key={plate.id}
              plateData={plate}
              onColBtnClick={changeCollection}
              onFavBtnClick={changeFavorites}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;

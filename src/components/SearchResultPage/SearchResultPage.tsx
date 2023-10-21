import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import cls from "./SearchResultPage.module.scss";
import useFilteredReadyPlates from "../../hooks/useFilteredReadyPlates.ts";
import Vynil from "../Vinyl/Vinyl.tsx";
import Chip from "../Chip/Chip.tsx";
import type { FilterFormType } from "../Filters/Filters.tsx";
import { FavCollContext } from "../Application.tsx";

function SearchResultPage() {
  const { collection, favorites, changeCollection, changeFavorites } =
    useContext(FavCollContext);

  const [params] = useSearchParams();

  const filter: FilterFormType = {
    artist: params.has("artist") ? params.get("artist") : "",
    genre: params.has("genre") ? params.get("genre") : "",
    decade: params.has("decade") ? params.get("decade") : "",
    country: params.has("country") ? params.get("country") : "",
  };

  const [filteredPlateList, total, loading] = useFilteredReadyPlates(
    collection,
    favorites
  );

  return (
    <>
      <Helmet>
        <title>Search results...</title>
      </Helmet>
      <section className={cls.result}>
        <div className={cls.top}>
          <span>Filters applied!</span>
          <Link to={"/search"}>RESET</Link>
          <div className={cls.chips}>
            {[...Object.keys(filter)].map((key, index) => {
              if (filter[key] !== "") {
                return <Chip key={index} name={key} />;
              }
            })}
          </div>
        </div>
        <div className={cls.list}>
          {loading && (
            <img src="/img/loader.png" alt="loader_pic" className="loader" />
          )}
          {filteredPlateList.map((plate) => (
            <Vynil
              key={plate.id}
              plateData={plate}
              onColBtnClick={changeCollection}
              onFavBtnClick={changeFavorites}
            />
          ))}
          {total === 0 && !loading && (
            <div className="not-found">
              <img src="/img/noVinyl.png" alt="not_found_pic" />
              <div className="err-name">
                Ooops... Vinul not found!
                <br />
                Please, try to change filters.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResultPage;

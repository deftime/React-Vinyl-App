import { useContext, lazy } from "react";
import { Helmet } from "react-helmet-async";
import cls from "./searchPage.module.scss";
import useFilteredReadyPlates from "../../hooks/useFilteredReadyPlates.ts";
import Filters from "../Filters/Filters.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { FavCollContext, type CurrentPlateType } from "../Application.tsx";
const Vynil = lazy(() => import("../Vinyl/Vinyl.tsx"));

function SearchPage() {
  const { collection, favorites, changeCollection, changeFavorites } =
    useContext(FavCollContext);

  const [plateList, total, loading] = useFilteredReadyPlates(
    collection,
    favorites
  );

  return (
    <>
      <Helmet>
        <title>React Vynil | Search</title>
      </Helmet>
      <section className={cls.searchWrap}>
        <div className={cls.filters}>
          <Filters />
        </div>
        <div className={cls.list}>
          <div className={cls.title}>Catalog</div>
          <div className={cls.inner}>
            {loading && (
              <img src="/img/loader.png" alt="loader_pic" className="loader" />
            )}
            {plateList.map((plate: CurrentPlateType, index: number) => (
              <Vynil
                key={plate.id}
                order={index}
                plateData={plate}
                onFavBtnClick={changeFavorites}
                onColBtnClick={changeCollection}
              />
            ))}
          </div>
          <Pagination countItems={total} itemsPerPage={10} />
        </div>
      </section>
    </>
  );
}

export default SearchPage;

import { useMemo } from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import useStyleListAsync from "./useStyleListAsync.ts";
import useCountryListAsync from "./useCountryListAsync.ts";
import type {
  PlateType,
  CurrentPlateType,
  IdNameType,
} from "../components/Application.tsx";

function useFilteredReadyPlates(
  collection: Array<number>,
  favorites: Array<number>,
  query = "/api/search"
) {
  const [params] = useSearchParams();

  if (params) {
    query = "/api/search?" + params.toString();
  }

  const musicStyleListResponse = useStyleListAsync();
  const countryListResponse = useCountryListAsync();
  const plateListResponse = useSWR(
    query,
    () =>
      fetch(query)
        .then((response) => response.json())
        .then((data) => data),
    {
      suspense: true,
    }
  );

  let currentPlateList: CurrentPlateType[] = [];

  const plateList = useMemo(
    () => plateListResponse.data ?? [],
    [plateListResponse.data]
  );
  const musicStyleList = useMemo(
    () => musicStyleListResponse.data ?? [],
    [musicStyleListResponse.data]
  );
  const countryList = useMemo(
    () => countryListResponse.data ?? [],
    [countryListResponse.data]
  );

  let total = 0;
  const loading =
    musicStyleListResponse.isLoading ||
    plateListResponse.isLoading ||
    countryListResponse.isLoading;

  if (!loading) {
    currentPlateList = plateList.results.map((plate: PlateType) => {
      return {
        ...plate,
        styles: plate.styles ?? [],
        genre: musicStyleList.find(
          (item: IdNameType) => item.id === plate.genre
        ).title,
        country: countryList.find(
          (item: IdNameType) => item.id === plate.country
        ).title,
        inColl: collection.includes(plate.id),
        inFav: favorites.includes(plate.id),
      };
    });
    total = plateListResponse.data.total;
  }

  return [currentPlateList, total, loading] as const;
}

export default useFilteredReadyPlates;

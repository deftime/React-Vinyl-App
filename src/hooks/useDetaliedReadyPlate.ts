import useSWR from "swr";
import { useContext } from "react";
import useStyleListAsync from "./useStyleListAsync.ts";
import useCountryListAsync from "./useCountryListAsync.ts";
import type { CurrentDetailPlateType } from "../components/VynilDetails/VynilDetails.tsx";
import { FavCollContext, type IdNameType } from "../components/Application.tsx";

function useDetaliedReadyPlate(id: number) {
  const { collection, favorites } = useContext(FavCollContext);

  const musicStyleListResponse = useStyleListAsync();
  const countryListResponse = useCountryListAsync();
  const plateResponse = useSWR(`/api/releases/${id}`, () =>
    fetch(`/api/releases/${id}`)
      .then((response) => response.json())
      .then((data) => data)
  );

  let currentPlate: CurrentDetailPlateType | object = {};

  const loading =
    musicStyleListResponse.isLoading ||
    plateResponse.isLoading ||
    countryListResponse.isLoading;

  if (!loading) {
    currentPlate = {
      ...plateResponse.data.release,
      genre: musicStyleListResponse.data.find(
        (item: IdNameType) => item.id === plateResponse.data.release.genre
      ).title,
      country: countryListResponse.data.find(
        (item: IdNameType) => item.id === plateResponse.data.release.country
      ).title,
      inColl: collection.includes(plateResponse.data.release.id),
      inFav: favorites.includes(plateResponse.data.release.id),
    };
  }

  return [currentPlate, loading] as const;
}

export default useDetaliedReadyPlate;

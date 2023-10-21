import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import cls from "./filters.module.scss";
import Chip from "../Chip/Chip.tsx";
import useCountryListAsync from "../../hooks/useCountryListAsync.ts";
import useStyleListAsync from "../../hooks/useStyleListAsync.ts";
import type { IdNameType } from "../Application.tsx";

export interface FilterFormType {
  artist: string;
  genre: string;
  decade: string;
  country: string;
}

const yupSchema = Yup.object({
  artist: Yup.string()
    .min(2, "More then 2 chars")
    .max(15, "Less then 15 chars"),
  genre: Yup.string(),
  decade: Yup.string(),
  country: Yup.string(),
});

function Filters() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      artist: "",
      genre: "holder",
      decade: "holder",
      country: "holder",
    },
    resolver: yupResolver(yupSchema),
  });

  const navigator = useNavigate();
  const countryList = useCountryListAsync();
  const styleList = useStyleListAsync();

  function handlerForm(formData: FilterFormType): void {
    const queryLine = new URLSearchParams();
    if (formData.artist !== "") {
      queryLine.set("artist", formData.artist);
    }
    if (formData.genre !== "holder") {
      queryLine.set("genre", formData.genre);
    }
    if (formData.decade !== "holder") {
      queryLine.set("year_from", formData.decade.substring(0, 4));
      queryLine.set("year_to", formData.decade.substring(5));
    }
    if (formData.country !== "holder") {
      queryLine.set("country", formData.country);
    }
    navigator({
      pathname: "/result",
      search: queryLine.toString(),
    });
  }

  if (countryList.isLoading || styleList.isLoading) {
    return <img src="/img/loader.png" alt="loader_pic" className="loader" />;
  }

  return (
    <div className={cls.filters}>
      <form action="#" name="search" onSubmit={handleSubmit(handlerForm)}>
        <input
          type="text"
          placeholder="Artist"
          {...register("artist")}
          className={clsx({ [cls.onError]: errors.artist })}
        />
        <div
          className={clsx(cls.errorMsg, {
            [cls.onError]: errors.artist,
          })}
        >
          {errors.artist?.message}
        </div>
        <fieldset>
          <select id="genre" {...register("genre")}>
            <option value="holder" disabled>
              Genre
            </option>
            {styleList.data.map((style: IdNameType) => (
              <option key={style.id} value={style.id}>
                {style.title}
              </option>
            ))}
          </select>
          <select id="decade" {...register("decade")}>
            <option value="holder" disabled>
              Decade
            </option>
            <option value="1950-1960">1950-60 рр.</option>
            <option value="1960-1970">1960-70 рр.</option>
            <option value="1970-1980">1970-80 рр.</option>
            <option value="1980-1990">1980-90 рр.</option>
            <option value="1990-2000">1990-00 рр.</option>
            <option value="2000-2010">2000-10 рр.</option>
            <option value="2010-2020">2010-20 рр.</option>
            <option value="2020-2030">2020-30 рр..</option>
          </select>
        </fieldset>
        <select id="" {...register("country")}>
          <option value="holder" disabled>
            Country
          </option>
          {countryList.data.map((country: IdNameType, index: number) => (
            <option key={index} value={country.id}>
              {country.title}
            </option>
          ))}
        </select>
        <div className={cls.selectedFilters}>
          {isDirty && <Chip name={"Reset ALL"} action={() => reset()} />}
        </div>
        <button type="submit" disabled={!isDirty}>
          Search
        </button>
      </form>
    </div>
  );
}

export default Filters;

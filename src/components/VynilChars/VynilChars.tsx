import { memo } from "react";
import clsx from "clsx";
import cls from "./VynilChars.module.scss";

interface DataPropsType {
  year: number;
  genre: string | number;
  styles: Array<string>;
  country: string;
}

const VynilChars = memo(function VynilChars(data: DataPropsType) {
  return (
    <div aria-label="plate-info" className="chars">
      <div className={clsx(cls.albumData, cls.year)}>
        <span>Year : </span>
        <span>{data.year}</span>
      </div>
      <div className={clsx(cls.albumData, cls.genre)}>
        <span>Genre : </span>
        <span>{data.genre}</span>
      </div>
      <div className={clsx(cls.albumData, cls.style)}>
        <span>Style : </span>
        <span>
          {data.styles.map((elem, index) => (index === 0 ? elem : ", " + elem))}
        </span>
      </div>
      <div className={clsx(cls.albumData, cls.country)}>
        <span>Country : </span>
        <span>{data.country}</span>
      </div>
    </div>
  );
});

export default VynilChars;

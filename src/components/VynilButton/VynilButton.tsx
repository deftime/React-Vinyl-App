import { memo } from "react";
import clsx from "clsx";
import cls from "./VynilButton.module.scss";

interface ButtonPropsType {
  inColl: boolean;
  onClick: () => void;
}

const VynilButton = memo(function VynilButton({
  inColl,
  onClick,
}: ButtonPropsType) {
  return (
    <button
      className={clsx(cls.addBtn, cls.jsFavorites, {
        [cls.added]: inColl,
      })}
      onClick={() => onClick()}
    >
      <span>{inColl ? "In Collection" : "Add"}</span>
      {inColl ? (
        <svg
          className={cls.minus}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10L8.5 14L16 6"
            stroke="#106081"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className={cls.plus}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14.6667V7.99999M8 7.99999V1.33333M8 7.99999H14.6667M8 7.99999H1.33334"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
});

export default VynilButton;

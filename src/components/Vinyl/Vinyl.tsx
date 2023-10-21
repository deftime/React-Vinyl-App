import { useReducer, useRef, useState, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";
import { Portal } from "react-portal";
import clsx from "clsx";
import cls from "./vynil.module.scss";
import VynilChars from "../VynilChars/VynilChars.tsx";
import VynilButton from "../VynilButton/VynilButton.tsx";
import VynilDetails from "../VynilDetails/VynilDetails.tsx";
import Message from "../Message/Message.tsx";
import type { CurrentPlateType } from "../Application.tsx";

interface vynilPropsType {
  plateData: CurrentPlateType;
  statusSearch?: string;
  onColBtnClick: (arg0: boolean, arg1: number) => void;
  onFavBtnClick: (arg0: boolean, arg1: number) => void;
  order: number;
}

function openReducer(state, action) {
  switch (action.type) {
    case "openVinyl": {
      return {
        open: true,
      };
    }
    case "closeVinyl": {
      return {
        open: false,
      };
    }
    default: {
      return state;
    }
  }
}

function Vynil({
  plateData,
  statusSearch,
  onColBtnClick,
  onFavBtnClick,
  order,
}: vynilPropsType) {
  const [state, dispatch] = useReducer(openReducer, { open: false });

  const [msg, setMsg] = useState({
    show: false,
  });
  const favBtn = useRef(null);

  function overHandler(event: {
    target: { getBoundingClientRect: () => never };
  }) {
    const params = event.target.getBoundingClientRect();
    const top = parseInt(params.y + params.height + 10);
    const left = parseInt(params.x);

    setMsg((msg) => {
      return { show: !msg.show, x: top, y: left };
    });
  }

  const btnHandler = useCallback(() => {
    onColBtnClick(plateData.inColl, plateData.id);
  }, [plateData.inColl, plateData.id, onColBtnClick]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, x: 0 }}
      data-key={order}
      key={plateData.id}
      className={clsx(cls.item, { [cls.loading]: statusSearch === "load" })}
      id={"plate-" + plateData.id}
    >
      <div
        className={cls.pic}
        onClick={() => dispatch({ type: "openVinyl" })}
        role="button"
        tabIndex={0}
      >
        <button
          className={cls.favBox}
          onMouseEnter={overHandler}
          onMouseLeave={overHandler}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavBtnClick(plateData.inFav, plateData.id);
          }}
          ref={favBtn}
        >
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill={plateData.inFav ? "#000" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 4.6617C14 8.21672 7.5 11.9998 7.5 11.9998C7.5 11.9998 1 8.21672 1 4.6617C1 -0.165119 7.5 -0.0999381 7.5 4.14814C7.5 -0.0999381 14 -0.0363918 14 4.6617Z"
              stroke="black"
              strokeWidth="1.10308"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <img src={plateData.thumb_image} alt="album_cover" />
      </div>
      <div className={cls.name}>{plateData.title}</div>
      <div className={cls.band}>{plateData.artist}</div>
      <VynilChars
        year={plateData.year}
        genre={plateData.genre}
        styles={plateData.styles}
        country={plateData.country}
      />
      <VynilButton inColl={plateData.inColl} onClick={btnHandler} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={state.open}
        timeout={500}
        classNames={{
          enter: cls.enter,
          enterActive: cls.enterActive,
          enterDone: cls.enterDone,
          exit: cls.exit,
          exitActive: cls.exitActive,
          exitDone: cls.exitDone,
        }}
      >
        <VynilDetails
          plateId={plateData.id}
          plateinColl={plateData.inColl}
          onFavBtnClick={onFavBtnClick}
          onColBtnClick={onColBtnClick}
          onClose={() => dispatch({ type: "closeVinyl" })}
        />
      </CSSTransition>
      {msg.show && (
        <Portal>
          <Message
            text={
              plateData.inFav ? "Remove from Favorites" : "Add to Favorites"
            }
            x={msg.x}
            y={msg.y}
          />
        </Portal>
      )}
    </motion.div>
  );
}

export default Vynil;

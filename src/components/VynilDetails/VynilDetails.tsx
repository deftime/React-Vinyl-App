import {
  useState,
  useRef,
  useReducer,
  useContext,
  lazy,
  useCallback,
} from "react";
import { Portal } from "react-portal";
import { motion } from "framer-motion";
import cls from "./VynilDetails.module.scss";
import VynilChars from "../VynilChars/VynilChars.tsx";
import VynilButton from "../VynilButton/VynilButton.tsx";
import useDetaliedReadyPlate from "../../hooks/useDetaliedReadyPlate.ts";
import useKeyPress from "../../hooks/useKeyPress.ts";
import { NotesContext } from "../Application.tsx";
const Note = lazy(() => import("../Note/Note.tsx"));

interface VynilDetailsPropsType {
  plateId: number;
  plateinColl: boolean;
  onColBtnClick: (arg0: boolean, arg1: number) => void;
  onFavBtnClick: (arg0: boolean, arg1: number) => void;
  onClose: () => void;
}

export type DetailPlateType = {
  release: {
    id: number;
    artist_id: number;
    artist: string;
    title: string;
    all_genres: Array<number>;
    genre: number;
    styles: Array<string>;
    release_date: string;
    year: number;
    all_countries: Array<string>;
    country: string;
    thumb_image: string;
    cover_image: string;
    tracklist: Array<TracklistType>;
  };
};

export type CurrentDetailPlateType = {
  inColl: boolean;
  inFav: boolean;
} & DetailPlateType;

export type TracklistType = {
  position: string;
  title: string;
  duration: string;
};

function vinylReducer(state, action) {
  switch (action.type) {
    case "addToCollection": {
      return {
        ...state,
        inColl: true,
        noteShow: true,
      };
    }
    case "removeFromCollection": {
      return {
        inColl: false,
        noteShow: false,
        noteContent: null,
      };
    }
  }
}

function VynilDetails({
  plateId,
  plateinColl,
  onColBtnClick,
  onFavBtnClick,
  onClose,
}: VynilDetailsPropsType) {
  const { saveNote, getNote } = useContext(NotesContext);

  const [plate, loading] = useDetaliedReadyPlate(plateId);
  const [playing, setPlay] = useState(false);
  const audio = useRef(null);
  const playBtn = useRef(null);

  const [state, dispatch] = useReducer(vinylReducer, {
    inColl: plateinColl,
    noteShow: plateinColl,
    noteContent: getNote(plateId),
  });

  const onPlay = useCallback((): void => {
    setPlay(!playing);
    playing ? audio.current.pause() : audio.current.play();
  }, [setPlay, playing]);

  const noteSaver = useCallback(
    (noteData: string): void => {
      saveNote(noteData, plateId);
    },
    [saveNote, plateId]
  );

  const collectionManage = useCallback((): void => {
    onColBtnClick(state.inColl, plateId);
    state.inColl
      ? dispatch({ type: "removeFromCollection" })
      : dispatch({ type: "addToCollection" });
  }, [onColBtnClick, state.inColl, plateId]);

  useKeyPress("Space", onPlay);

  if (loading) {
    return (
      <div className={cls.wrapper}>
        <div className={cls.inner}>
          <img src="/img/loader.png" alt="loader" className="loader" />
        </div>
      </div>
    );
  }

  return (
    <Portal>
      <div className={cls.wrapper}>
        <div className={cls.inner}>
          <div className={cls.top}>
            <div className={cls.name}>
              <div className={cls.sing}>{plate.title}</div>
              <div className={cls.band}>{plate.artist}</div>
            </div>
            <div
              className={cls.close}
              onClick={onClose}
              role="button"
              tabIndex={0}
            >
              <img src="/img/cross.svg" alt="close_cross" />
            </div>
          </div>
          <div className={cls.scrollZone}>
            <div className={cls.pic}>
              <button
                className={cls.favBox}
                onClick={() => onFavBtnClick(plate.inFav, plate.id)}
              >
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill={plate.inFav ? "#000" : "none"}
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
              <button ref={playBtn} className={cls.play} onClick={onPlay}>
                {playing ? (
                  <img
                    src="/img/pause.svg"
                    alt="play_icon"
                    className={cls.pauseIcon}
                  />
                ) : (
                  <img
                    src="/img/play.svg"
                    alt="play_icon"
                    className={cls.playIcon}
                  />
                )}
              </button>
              <motion.img
                animate={playing ? "play" : "noPlay"}
                transition={{ ease: "linear", duration: 0.5 }}
                variants={{
                  noPlay: {
                    x: 0,
                  },
                  play: {
                    x: -320,
                  },
                }}
                src={plate.cover_image}
                alt="cover"
                className={cls.cover}
              />
              <motion.img
                animate={playing ? "spin" : "noSpin"}
                initial={{ rotate: 0 }}
                transition={{
                  ease: "linear",
                  repeat: Infinity,
                  duration: 2,
                  delay: 1,
                }}
                variants={{
                  noSpin: {
                    rotate: 0,
                    transition: {
                      repeat: 0,
                      duration: 0.1,
                    },
                  },
                  spin: {
                    rotate: 360,
                  },
                }}
                src="/img/vinyl.png"
                alt="plate"
                className={cls.plate}
              />
            </div>
            <audio ref={audio} controls src="/media/rainbow.mp3"></audio>
            <VynilChars
              year={plate.year}
              country={plate.country}
              genre={plate.genre}
              styles={plate.styles}
            />
            {state.noteShow && (
              <Note text={state.noteContent} edit={noteSaver} />
            )}
            <div className={cls.title}>Track list</div>
            <div className={cls.listBox}>
              {plate.tracklist.map((item: TracklistType, index: number) => (
                <div key={index} className={cls.track}>
                  <span>{item.position}</span>
                  <span>{item.title}</span>
                  <span>{item.duration}</span>
                </div>
              ))}
            </div>
          </div>
          <VynilButton inColl={state.inColl} onClick={collectionManage} />
        </div>
      </div>
    </Portal>
  );
}

export default VynilDetails;

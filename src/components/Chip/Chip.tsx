import cls from "./chip.module.scss";
import {BASE_URL} from "../../main.tsx";

interface ChipPropsType {
  name: string;
  action?: () => void;
}

function Chip({ name, action }: ChipPropsType) {
  return (
    <div className={cls.chip} role="button" tabIndex={0} onClick={action}>
      <span>{name}</span>
      <img src={BASE_URL + "img/cross.svg"}alt="delete_tag_icon" />
    </div>
  );
}

export default Chip;

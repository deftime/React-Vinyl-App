import cls from "./chip.module.scss";

interface ChipPropsType {
  name: string;
  action?: () => void;
}

function Chip({ name, action }: ChipPropsType) {
  return (
    <div className={cls.chip} role="button" tabIndex={0} onClick={action}>
      <span>{name}</span>
      <img src="/img/cross.svg" alt="delete_tag_icon" />
    </div>
  );
}

export default Chip;

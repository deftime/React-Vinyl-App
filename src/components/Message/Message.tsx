import cls from "./message.module.scss";

interface MessagePropsType {
  text: string;
  x: number;
  y: number;
}

function Message({ text, x, y }: MessagePropsType) {
  return (
    <div style={{ top: x, left: y }} className={cls.message}>
      {text}
    </div>
  );
}

export default Message;

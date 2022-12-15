import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

type Props = {
  onChange: (count: number) => void;
};

export const Stars = ({ onChange }: Props) => {
  const [count, setCount] = useState<number>(-1);
  const [hover, setHover] = useState<number>(-1);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const arr = [...Array(5).keys()];

  const calc = (idx: number) => {
    if (hoverEnabled) {
      return idx <= hover;
    }

    return idx <= count;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {arr.map((_, idx) => (
        <AiFillStar
          key={idx}
          style={{
            height: "18px",
            width: "26px",
            paddingRight: "8px",
          }}
          onMouseEnter={() => {
            setHoverEnabled(true);
            setHover(idx);
          }}
          onMouseLeave={() => {
            setHoverEnabled(false);
          }}
          onClick={() => {
            setCount(idx);
            onChange(idx);
          }}
          className={calc(idx) ? "color" : ""}
        />
      ))}
    </div>
  );
};

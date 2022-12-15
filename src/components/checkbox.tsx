import { BsCheck2 } from "react-icons/bs";

type Props = {
  isChecked: boolean;
};

export const Checkbox = ({ isChecked }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "24px",
        width: "24px",
        background: isChecked ? "#646cff" : "black",
        borderRadius: "4px",
        transition: ".2 background",
      }}
    >
      <BsCheck2 style={{ color: "black" }} />
    </div>
  );
};

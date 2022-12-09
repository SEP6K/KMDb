import { VscClose } from "react-icons/vsc";

type Props = {
  text: string;
  onDiscard: () => void;
};

export const FilterPill = ({ text, onDiscard }: Props) => {
  return (
    <div
      style={{
        height: "24px",
        borderRadius: "24px",
        background: "#646cff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.6em",
        gap: "8px",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onClick={onDiscard}
    >
      <div>{text}</div>
      <VscClose />
    </div>
  );
};

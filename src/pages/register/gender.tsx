import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Checkbox } from "../../components/checkbox";

type Props = {
  onChange: (g: string) => void;
};

export const GenderPicker = ({ onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"M" | "F">("M");
  onChange("M");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "217px",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          fontSize: "1em",
          fontWeight: 500,
          background: "#1a1a1a",
          cursor: "pointer",
          transition: ".2s ease-in-out",
          width: "100%",
          padding: "0.6em 1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => setOpen(!open)}
      >
        {selected === "F" ? "Female" : "Male"}
        <MdOutlineArrowBackIos
          style={{
            rotate: open ? "90deg" : "-90deg",
            transition: ".2s ease-in-out",
          }}
        />
      </div>
      <div
        style={{
          display: open ? "flex" : "none",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            fontSize: "1em",
            fontWeight: 500,
            background: "#1a1a1a",
            cursor: "pointer",
            transition: ".2s ease-in-out",
            width: "100%",
            padding: "0.6em 1.2em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => {
            setSelected("M");
            setOpen(false);
            onChange("M");
          }}
        >
          Male
          <Checkbox isChecked={selected === "M"} />
        </div>
        <div
          style={{
            borderRadius: "8px",
            fontSize: "1em",
            fontWeight: 500,
            background: "#1a1a1a",
            cursor: "pointer",
            transition: ".2s ease-in-out",
            width: "100%",
            padding: "0.6em 1.2em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => {
            setSelected("F");
            setOpen(false);
            onChange("F");
          }}
        >
          Female
          <Checkbox isChecked={selected === "F"} />
        </div>
      </div>
    </div>
  );
};

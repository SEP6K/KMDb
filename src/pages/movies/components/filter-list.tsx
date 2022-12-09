import { useMemo, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Checkbox } from "../../../components/checkbox";

type Props = {
  title: string;
  items: string[];
  onChange: (item: string) => void;
  isChecked: (item: string) => boolean;
};

export const FilterList = ({ title, items, onChange, isChecked }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "300px",
        background: "#1a1a1a",
        borderRadius: "8px",
        padding: "0.6em 1.2em",
        gap: "16px",
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        {title}
        <SlArrowDown
          style={{
            rotate: isOpen ? "180deg" : "none",
            transition: ".2s ease-in-out",
          }}
        />
      </div>
      <div
        style={{
          display: isOpen ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <FilterItem
            item={item}
            key={item}
            onChange={onChange}
            isChecked={isChecked(item)}
          />
        ))}
      </div>
    </div>
  );
};

type ItemProps = {
  item: string;
  onChange: (item: string) => void;
  isChecked: boolean;
};

const FilterItem = ({ item, onChange, isChecked }: ItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => {
        onChange(item);
      }}
    >
      {item}
      <Checkbox isChecked={isChecked} />
    </div>
  );
};

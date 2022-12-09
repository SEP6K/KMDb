import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Spinner } from "./spinner";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      if (search !== "") console.log(search);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        transition: "background .1s",
        height: "100%",
        position: "relative",
      }}
    >
      <CiSearch
        style={{
          width: "32px",
          height: "32px",
          position: "absolute",
          left: "8px",
        }}
      />
      <input
        placeholder="Search.."
        style={{
          paddingLeft: "44px",
          height: "100%",
          marginRight: "16px",
        }}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          visibility: isLoading ? "visible" : "hidden",
        }}
      >
        <Spinner />
      </div>
      <div
        style={{
          position: "absolute",
          top: "56px",
          left: 0,
          display: !isLoading && search !== "" ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        {[...Array(5).keys()].map((_, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start ",
                alignItems: "center",
                borderRadius: "8px",
                backgroundColor: "#1a1a1a",
                padding: "8px 16px",
                width: "100%",
              }}
              key={index}
            >
              Result movie #{index}
            </div>
          );
        })}
      </div>
    </div>
  );
};

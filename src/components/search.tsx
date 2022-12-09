import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDbContext } from "../context/db-context";
import { SimpleMovie } from "../models/movie";
import { Spinner } from "./spinner";

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { getMovieByTitle, getMovieByYear } = useDbContext();
  const [searchResult, setSearchResult] = useState<SimpleMovie[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      if (search !== "") {
        const a = async () => {
          if (search.match(/^[12][0-9]{3}$/)) {
            return await getMovieByYear(parseInt(search));
          }

          return await getMovieByTitle(search);
        };

        a().then((res) => {
          setSearchResult(res);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
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
        placeholder="Search by title or year.."
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
        {searchResult.map((result, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end ",
                borderRadius: "8px",
                backgroundColor: "#1a1a1a",
                padding: "8px 16px",
                width: "100%",
              }}
              key={index}
            >
              <div style={{ fontWeight: 500 }}>{result.title}</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                {result.year}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

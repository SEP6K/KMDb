import { VscClose } from "react-icons/vsc";
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
    if (search.length === 0) return;
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          visibility: isLoading || search.length > 0 ? "visible" : "hidden",
        }}
      >
        {search.length > 0 && !isLoading ? (
          <VscClose
            style={{
              cursor: "pointer",
              height: "24px",
              width: "24px",
            }}
            onClick={() => setSearch("")}
          />
        ) : (
          <Spinner />
        )}
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
        {searchResult.map((result) => {
          return (
            <ResultItem
              title={result.title}
              year={result.year}
              key={result.id}
            />
          );
        })}
      </div>
    </div>
  );
};

type ResultProps = {
  title: string;
  year: number;
};

const ResultItem = ({ title, year }: ResultProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderRadius: "8px",
        backgroundColor: "#1a1a1a",
        padding: "8px 16px",
        width: "100%",
        cursor: "pointer",
        transition: ".2s ease-in-out",
      }}
      className="search-result"
    >
      <div style={{ fontWeight: 500 }}>{title}</div>
      <div
        style={{
          fontSize: "12px",
          color: "grey",
        }}
      >
        {year}
      </div>
    </div>
  );
};

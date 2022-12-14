import { VscClose } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { SimpleMovie } from "../models/movie";
import { Spinner } from "./spinner";

type Props = {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  searchResult: SimpleMovie[];
  isLoading: boolean;
  search: string;
};

export const Search = ({
  onClear,
  onSearch,
  searchResult,
  isLoading,
  search,
}: Props) => {
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
        width: "100%",
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
          marginRight: "10px",
          width: "100%",
        }}
        value={search}
        onChange={onSearch}
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
          <div
            onClick={onClear}
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              transition: ".2s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="clear-search"
          >
            <VscClose
              style={{
                cursor: "pointer",
                height: "24px",
                width: "24px",
              }}
            />
          </div>
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
        {searchResult?.map((result) => {
          return (
            <ResultItem
              title={result.title}
              year={result.year}
              key={result.movie_id}
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

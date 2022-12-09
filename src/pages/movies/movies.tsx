import { useCallback, useEffect, useState } from "react";
import { NavBar } from "../../components/nav";
import { FilterList } from "./components/filter-list";
import { FilterPill } from "./components/filter-pill";

const directors = ["director 1", "director 2", "director 3"];

const genres = ["action", "thriller", "romance", "detective", "horror"];

const boxOffice = ["150 million", "200 million", "300 million"];

export const Movies = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const onChange = useCallback((item: string) => {
    setFilters((prev) => {
      if (prev.includes(item)) return prev.filter((i) => i !== item);

      return [...prev, item];
    });
  }, []);

  const isChecked = useCallback(
    (item: string) => filters.includes(item),
    [filters]
  );

  useEffect(() => {
    console.log(buildQuery(filters));
  }, [filters]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          height: "100%",
          width: "100%",
          padding: "32px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "16px",
            height: "24px",
          }}
        >
          {filters.map((item) => (
            <FilterPill
              text={item}
              key={item}
              onDiscard={() => onChange(item)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "100%",
              minWidth: "300px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <FilterList
              items={genres}
              title="Genre"
              onChange={onChange}
              isChecked={isChecked}
            />
            <FilterList
              items={directors}
              title="Director"
              onChange={onChange}
              isChecked={isChecked}
            />
            <FilterList
              items={boxOffice}
              title="Box Office"
              onChange={onChange}
              isChecked={isChecked}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Content goes here..
          </div>
        </div>
      </div>
    </div>
  );
};

const buildQuery = (filters: string[]) => {
  let query = "";

  const filteredDirectors = directors.filter((item) => filters.includes(item));
  const filteredGenres = genres.filter((item) => filters.includes(item));
  const filteredBoxOffice = boxOffice.filter((item) => filters.includes(item));

  const interlace = (array: string[]) => {
    array.forEach((item, index) => {
      const last = index === array.length - 1;
      const string = `${item}${last ? "+" : ""}`;

      query = query.concat(string);
    });
  };

  if (filteredDirectors.length > 0) {
    query = query.concat(`${query.length === 0 ? "?" : "&"}directors=`);
    interlace(filteredDirectors);
  }

  if (filteredGenres.length > 0) {
    query = query.concat(`${query.length === 0 ? "?" : "&"}genres=`);
    interlace(filteredGenres);
  }

  if (filteredBoxOffice.length > 0) {
    query = query.concat(`${query.length === 0 ? "?" : "&"}boxOffice=`);
    interlace(filteredBoxOffice);
  }

  return query;
};

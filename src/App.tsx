import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { NavBar } from "./components/nav";
import { Search } from "./components/search";
import { useDbContext } from "./context/db-context";
import { SimpleMovie } from "./models/movie";

function App() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getMovieByTitle, getMovieByYear } = useDbContext();
  const [searchResult, setSearchResult] = useState<SimpleMovie[]>([]);

  useEffect(() => {
    if (search.length === 0) {
      setIsLoading(false);
      return;
    }
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scale: "150%",
            }}
          >
            <Search
              isLoading={isLoading}
              onClear={() => setSearch("")}
              onSearch={(e) => setSearch(e.target.value)}
              searchResult={searchResult}
              search={search}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

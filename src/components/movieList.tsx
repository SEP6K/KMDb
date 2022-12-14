import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useAuth } from "../auth/auth-provider";
import { Spinner } from "../components/spinner";
import { useDbContext } from "../context/db-context";
import { EnrichedMovie, SimpleMovie, TmdbMovieResponse } from "../models/movie";
import { Movie } from "./movie";

export const MovieList = () => {
  const [favMovies, setFavMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const {
    getMovieById,
    getFavouriteMoviesForUser,
    getSimilarMoviesForUser,
    getEnrichedMovie,
  } = useDbContext();
  const { user } = useAuth();

  useEffect(() => {
    const getFavouriteMoviesList = async () => {
      return await getFavouriteMoviesForUser(user?.username);
    };

    getFavouriteMoviesList().then(async (res) => {
      const movies: EnrichedMovie[] = await Promise.all(
        res.map(async (element) => {
          const movieInfo = await getMovieById(element.movie_id);
          return await getEnrichedMovie(movieInfo.movie_id);
        })
      );
      setFavMovies(movies);
    });

    // -------

    const getSimilarMoviesList = async () => {
      return await getSimilarMoviesForUser(auth.currentUser?.uid);
    };

    getSimilarMoviesList().then(async (res) => {
      setSimilarMovies(res);
    });
  }, []);

  return (
    <div>
      Your favourite movies:
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {favMovies.map((movie: EnrichedMovie) => {
          return <Movie movie={movie} isTmdbMovieType={false} />;
        })}
      </div>
      You might also like:
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {similarMovies.map((movie: TmdbMovie) => {
          return <Movie movie={movie} isTmdbMovieType={true} />;
        })}
      </div>
    </div>
  );
};

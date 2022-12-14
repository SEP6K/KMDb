import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useAuth } from "../auth/auth-provider";
import { useDbContext } from "../context/db-context";
import { EnrichedMovie, TmdbMovieResponse } from "../models/movie";
import { Movie } from "./movie";

export const MovieList = () => {
  const [favMovies, setFavMovies] = useState<EnrichedMovie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<TmdbMovieResponse[]>([]);

  const {
    getMovieById,
    getFavouriteMoviesForUser,
    getSimilarMoviesForUser,
    getEnrichedMovie,
  } = useDbContext();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getFavouriteMoviesList = async () => {
      return await getFavouriteMoviesForUser(user.username);
    };

    getFavouriteMoviesList().then(async (res) => {
      const movies: EnrichedMovie[] = await Promise.all(
        res.map(async (element) => {
          const movieInfo = await getMovieById(element.movie_id);
          return await getEnrichedMovie(movieInfo.movie_id.toString());
        })
      );
      setFavMovies(movies);
    });

    const getSimilarMoviesList = async () => {
      if (!auth.currentUser) return;
      return await getSimilarMoviesForUser(auth.currentUser.uid);
    };

    getSimilarMoviesList().then(async (res) => {
      if (!res) return;
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
        {similarMovies.map((movie: TmdbMovieResponse) => {
          return <Movie movie={movie} isTmdbMovieType={true} />;
        })}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useAuth } from "../auth/auth-provider";
import { Spinner } from "../components/spinner";
import { useDbContext } from "../context/db-context";
import { SimpleMovie, TmdbMovieResponse } from "../models/movie";
import { Movie } from "./movie";

export const MovieList = (username: string) => {
  const [favMovies, setFavMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { getMovieById, getFavouriteMoviesForUser, getSimilarMoviesForUser } =
    useDbContext();
  const { user } = useAuth();

  useEffect(() => {
    const getFavouriteMoviesList = async () => {
      return await getFavouriteMoviesForUser(user?.username);
    };

    getFavouriteMoviesList().then(async (res) => {
      const movies: SimpleMovie[] = await Promise.all(
        res.map(async (element) => {
          const movieInfo = await getMovieById(element.movie_id);
          console.log(movieInfo);
          return movieInfo;
        })
      );
      setFavMovies(movies);
    });
  }, []);

  useEffect(() => {
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
      {favMovies.map((movie: SimpleMovie) => {
        return <p>{movie.title}</p>;
      })}
      You might also like:
      <div
        style={{
          height: "30vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {similarMovies.map((movie: TmdbMovie) => {
          // return <p>{movie.title}</p>;
          return <Movie movie={movie} />;
        })}
      </div>
    </div>
  );
};

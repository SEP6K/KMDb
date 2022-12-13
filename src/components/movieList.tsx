import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useAuth } from "../auth/auth-provider";
import { useDbContext } from "../context/db-context";
import { SimpleMovie, TmdbMovieResponse } from "../models/movie";

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
      Favourite movies list:
      {favMovies.map((movie: SimpleMovie) => {
        return <p>{movie.title}</p>;
      })}
      You might also like:
      {similarMovies.map((movie: TmdbMovie) => {
        return <p>{movie.title}</p>;
      })}
    </div>
  );
};

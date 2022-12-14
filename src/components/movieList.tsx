import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useAuth } from "../auth/auth-provider";
import { useDbContext } from "../context/db-context";
import { EnrichedMovie, TmdbMovieResponse } from "../models/movie";
import { Movie, TmdbMovie } from "./movie";
import { Spinner } from "./spinner";

export const MovieList = () => {
  const [favMovies, setFavMovies] = useState<EnrichedMovie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<TmdbMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      await Promise.all(
        res.map(async (element) => {
          const movieInfo = await getMovieById(element.movie_id);
          return await getEnrichedMovie(movieInfo.movie_id.toString());
        })
      ).then((val) => setFavMovies(val));
    });
  }, []);

  useEffect(() => {
    const getSimilarMoviesList = async () => {
      if (!auth.currentUser) return;
      return await getSimilarMoviesForUser(auth.currentUser.uid).then((val) => {
        setSimilarMovies(val);
      });
    };

    getSimilarMoviesList();
  }, [auth.currentUser]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "32px",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            scale: "150%",
          }}
        >
          <Spinner />
        </div>
      </div>
    );
  }

  if (favMovies.length === 0) {
    return (
      <div
        style={{
          height: "80%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
        }}
      >
        Your favourite movies will show up here.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "32px",
        padding: "0 32px",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "32px",
          }}
        >
          Favourite movies
        </p>
        <div
          style={{
            display: "flex",
            gap: "32px",
            overflowX: "auto",
            width: "calc(100vw - 64px)",
            borderRadius: "8px",
          }}
        >
          {favMovies.map((movie: EnrichedMovie) => {
            return <Movie movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "32px",
          }}
        >
          You might also like:
        </p>
        <div
          style={{
            display: "flex",
            gap: "32px",
            overflowX: "auto",
            width: "calc(100vw - 64px)",
            borderRadius: "8px",
          }}
        >
          {similarMovies.map((movie: TmdbMovieResponse) => {
            return <TmdbMovie movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

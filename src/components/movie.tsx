import { FC } from "react";
import { EnrichedMovie, TmdbMovieResponse } from "../models/movie";

export const Movie: FC<MovieProps> = (props): JSX.Element => {
  const isTmdbMovieType = props.isTmdbMovieType;

  if (isTmdbMovieType) {
    const movie: TmdbMovieResponse = props.movie as TmdbMovieResponse;
    return (
      <div
        style={{
          borderRadius: "10%",
          height: "500px",
          width: "400px",
          backgroundColor: "#1a1a1a",
          padding: "20px",
          marginLeft: "30px",
        }}
      >
        <img
          src={movie.backdrop_path}
          style={{
            width: "100%",
          }}
        />
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    );
  } else {
    const movie: EnrichedMovie = props.movie as EnrichedMovie;
    return (
      <div
        style={{
          borderRadius: "10%",
          height: "500px",
          width: "400px",
          backgroundColor: "#1a1a1a",
          padding: "20px",
          marginLeft: "30px",
        }}
      >
        <img
          src={movie.backdropPath}
          style={{
            width: "100%",
          }}
        />
        <h3>{movie.title}</h3>
        <p>{movie.plotDescription}</p>
      </div>
    );
  }
};

interface MovieProps {
  movie: TmdbMovieResponse | EnrichedMovie;
  isTmdbMovieType: boolean;
}

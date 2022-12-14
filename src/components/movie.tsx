import { EnrichedMovie, TmdbMovieResponse } from "../models/movie";

type Props = {
  movie: TmdbMovieResponse | EnrichedMovie;
  isTmdbMovieType: boolean;
};

export const Movie = ({ movie, isTmdbMovieType }: Props) => {
  if (isTmdbMovieType) {
    const tmdb_movie = movie as TmdbMovieResponse;
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
          src={tmdb_movie.backdrop_path}
          style={{
            width: "100%",
          }}
        />
        <h3>{tmdb_movie.title}</h3>
        <p>{tmdb_movie.overview}</p>
      </div>
    );
  } else {
    const enrichedMovie = movie as EnrichedMovie;
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
          src={enrichedMovie.backdropPath}
          style={{
            width: "100%",
          }}
        />
        <h3>{movie.title}</h3>
        <p>{enrichedMovie.plotDescription}</p>
      </div>
    );
  }
};

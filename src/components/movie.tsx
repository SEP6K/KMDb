import { EnrichedMovie, TmdbMovieResponse } from "../models/movie";

type Props = {
  movie: TmdbMovieResponse;
};

export const TmdbMovie = ({ movie }: Props) => {
  return (
    <div
      style={{
        flexShrink: 0,
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column",
        gap: "16px",
        width: "700px",
        height: "300px",
        background: `linear-gradient(to right, transparent, #1a1a1a 60%), url(${movie.backdrop_path})`,
      }}
      className="fancy-background"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "250px",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          {movie.title}
        </p>
        <p className="description">{movie.overview}</p>
      </div>
    </div>
  );
};

type EnrichedMovieProps = {
  movie: EnrichedMovie;
};

export const Movie = ({ movie }: EnrichedMovieProps) => {
  return (
    <div
      style={{
        flexShrink: 0,
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column",
        gap: "16px",
        width: "700px",
        height: "300px",
        background: `linear-gradient(to right, transparent, #1a1a1a 60%), url(${movie.backdropPath})`,
      }}
      className="fancy-background"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "250px",
          maxHeight: "250px",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          {movie.title}
        </p>
        <p className="description">{movie.plotDescription}</p>
      </div>
    </div>
  );
};

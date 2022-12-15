import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/nav";
import { useDbContext } from "../../context/db-context";
import { EnrichedMovie } from "../../models/movie";
import { BsFillAwardFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";

export const Movie = () => {
  const { getEnrichedMovie } = useDbContext();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<EnrichedMovie>();

  useEffect(() => {
    if (!movieId) return;

    const a = async () =>
      getEnrichedMovie(movieId).then((res) => setMovie(res));

    a();
  }, [movieId]);

  if (!movie) {
    return null;
  }

  const genres = movie.genre.split(",");
  const actors = movie.actors;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <NavBar />
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          padding: "32px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            height: "100%",
            width: "90%",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "64px",
                lineHeight: "64px",
                fontWeight: 700,
                color: "white",
              }}
            >
              {movie?.title}
            </p>
          </div>
          <div
            style={{
              color: "gray",
              display: "flex",
              width: "100%",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              {genres.map((val) => (
                <div
                  style={{
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "24px",
                    background: "#646cff",
                    color: "white",
                    padding: "0.6em",
                  }}
                  key={val}
                >
                  {val}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <AiFillDollarCircle />
              <p>{movie.boxOffice} Box office</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              color: "gray",
            }}
          >
            {actors.map((actor, index) => {
              return (
                <div
                  style={{
                    borderRight:
                      index !== actors.length - 1 ? "1px solid white" : "none",
                    paddingRight: "16px",
                  }}
                  key={index}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {actor.name}
                  </p>
                </div>
              );
            })}
          </div>
          <p>
            Directed by{" "}
            <span style={{ color: "#646cff" }}>{movie?.director.name}</span>
            {", "}
            written by{" "}
            <span style={{ color: "#646cff" }}>{movie?.writers}</span>
          </p>
          <p
            className="description"
            style={{
              fontSize: "20px",
              maxWidth: "40%",
            }}
          >
            {movie.plotDescription}
          </p>
          <div
            style={{
              background: `url(${movie.backdropPath})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "70%",
              width: "80%",
              borderRadius: "32px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                background: "#1a1a1a",
                padding: "0.1em 0.6em",
                fontSize: "14px",
                gap: "8px",
              }}
            >
              {movie.awards}
              <BsFillAwardFill style={{ color: "#646cff" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../components/nav";
import { useDbContext } from "../../context/db-context";
import { EnrichedMovie, Review } from "../../models/movie";
import { BsFillAwardFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { auth } from "../../../utils/firebase";
import { UserInfo } from "../../models/user";
import { AiFillStar } from "react-icons/ai";
import { Stars } from "./stars";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useAuth } from "../../auth/auth-provider";

export const Movie = () => {
  const {
    getEnrichedMovie,
    getReviewsForMovie,
    reviewMovie,
    addMovieToFavourites,
    getFavouriteMoviesForUser,
    removeMovieFromFavourites,
  } = useDbContext();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<EnrichedMovie>();
  const [reviews, setReviews] = useState<Review[] | undefined>();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [favourite, setFavourite] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!movieId) return;

    const a = async () =>
      await getEnrichedMovie(movieId).then((res) => {
        if (!res) {
          navigate("/");
          return;
        }
        setMovie(res);
      });

    a();
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;

    const a = async () =>
      await getReviewsForMovie(movieId).then((res) => setReviews(res));

    a();
  }, [movieId]);

  useEffect(() => {
    const a = async () =>
      await getFavouriteMoviesForUser(user!.username).then((res) => {
        if (res.map((e) => e.movie_id).includes(parseInt(movieId ?? ""))) {
          setFavourite(true);
        }
      });

    a();
  }, []);

  const reivewMovie = () => {
    const rev = {
      movie_id: movieId!,
      user_comments: comment,
      user_id: userId!,
      user_ratings: rating,
    };
    reviewMovie(rev);
  };

  const favouriteMovie = () => {
    if (!movieId || !userId) return;
    if (favourite) {
      removeMovieFromFavourites(movieId, userId);
      setFavourite(false);
      return;
    }
    addMovieToFavourites(movieId, userId);
    setFavourite(true);
  };

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
          height: "80%",
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
            width: "70%",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
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
            <BsFillSuitHeartFill
              style={{
                height: "64px",
                width: "64px",
                cursor: "pointer",
              }}
              className={favourite ? "color" : ""}
              onClick={favouriteMovie}
            />
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                color: "white",
              }}
            >
              {movie.rating}
              <AiFillStar style={{ color: "#646cff" }} />
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
        <div
          style={{
            width: "30%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div>Leave a review: </div>
            <Stars onChange={(e) => setRating(e + 1)} />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <textarea onChange={(e) => setComment(e.target.value)} />
              <button onClick={reivewMovie}>Review</button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "16px",
              overflowY: "auto",
              width: "100%",
              height: "70%",
            }}
          >
            {reviews?.map((review, index) => (
              <ReviewComp review={review} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  review: Review;
};

const ReviewComp = ({ review }: Props) => {
  const [user, setUser] = useState<UserInfo | undefined>();
  const { getUserDetail } = useDbContext();

  useEffect(() => {
    const a = async () =>
      await getUserDetail(review.user_id).then((res) => setUser(res));
    a();
  }, []);

  const url = user
    ? `url(https://api.multiavatar.com/${user.user_name.replaceAll(
        " ",
        "%20"
      )}.png)`
    : "undefined";

  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: "8px",
        padding: "16px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "16px",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          <div
            style={{
              backgroundImage: url,
              borderRadius: "50%",
              height: "30px",
              width: "30px",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          />{" "}
          {user?.user_name}
        </div>
        <div>
          {[...Array(review.user_ratings).keys()].map((_, idx) => (
            <AiFillStar key={idx} style={{ color: "#646cff" }} />
          ))}
        </div>
      </div>
      <div
        style={{
          fontSize: "14px",
          width: "100%",
        }}
      >
        {review.user_comments}
      </div>
    </div>
  );
};

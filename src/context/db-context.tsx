import React, { createContext, useContext } from "react";
import { ActorWithMovies, YearlyActors } from "../models/actor";
import {
  EnrichedMovie,
  FavouriteMovies,
  Review,
  SimpleMovie,
  TmdbMovieResponse,
} from "../models/movie";
import { YearRating } from "../models/rating";
import { UserInfo } from "../models/user";

type Props = {
  children: React.ReactNode;
};

type Context = {
  getMovieById: (id: number) => Promise<SimpleMovie>;
  getMovieByTitle: (title: string) => Promise<SimpleMovie[]>;
  getMovieByYear: (year: number) => Promise<SimpleMovie[]>;
  getYearlyRatings: () => Promise<YearRating[]>;
  getNumberOfActorsPerYear: () => Promise<YearlyActors[]>;
  getActorsWithMostMovies: (count: number) => Promise<ActorWithMovies[]>;
  saveUserInfo: (
    userId: string,
    username: string,
    gender: string,
    dob: string
  ) => Promise<void>;
  getFavouriteMoviesForUser: (username: string) => Promise<FavouriteMovies[]>;
  getSimilarMoviesForUser: (uId: string) => Promise<TmdbMovieResponse[]>;
  getEnrichedMovie: (movieId: string) => Promise<EnrichedMovie | undefined>;
  getReviewsForMovie: (movieId: string) => Promise<Review[]>;
  reviewMovie: (review: Review) => Promise<Response>;
  addMovieToFavourites: (movieId: string, userId: string) => Promise<Response>;
  getUserDetail: (userId: string) => Promise<UserInfo>;
  removeMovieFromFavourites: (
    movieId: string,
    userId: string
  ) => Promise<Response>;
};

const Context = createContext<Context>({} as Context);

const baseURL = import.meta.env.VITE_SERVER_URL;
// const baseURL = "http://localhost:3000";

export const useDbContext = (): Context => useContext(Context);

export const DbContext = ({ children }: Props) => {
  const getMovieById = async (id: number): Promise<SimpleMovie> => {
    return await fetch(baseURL + "/movie/id/" + id).then(
      (res) => res.json() as Promise<SimpleMovie>
    );
  };

  const getMovieByTitle = async (title: string): Promise<SimpleMovie[]> => {
    return await fetch(baseURL + "/movie/title/" + title).then(
      (res) => res.json() as Promise<SimpleMovie[]>
    );
  };

  const getMovieByYear = async (year: number): Promise<SimpleMovie[]> => {
    return await fetch(baseURL + "/movie/year/" + year).then(
      (res) => res.json() as Promise<SimpleMovie[]>
    );
  };

  const getYearlyRatings = async (): Promise<YearRating[]> => {
    return await fetch(baseURL + "/chart/ratings").then(
      (res) => res.json() as Promise<YearRating[]>
    );
  };

  const getNumberOfActorsPerYear = async (): Promise<YearlyActors[]> => {
    return await fetch(baseURL + "/chart/actors").then(
      (res) => res.json() as Promise<YearlyActors[]>
    );
  };

  const getActorsWithMostMovies = async (
    count: number
  ): Promise<ActorWithMovies[]> => {
    return await fetch(baseURL + "/chart/topStars/" + count).then(
      (res) => res.json() as Promise<ActorWithMovies[]>
    );
  };

  const saveUserInfo = async (
    userId: string,
    username: string,
    gender: string,
    dob: string
  ): Promise<void> => {
    let userCred = JSON.stringify({
      user_id: userId,
      user_name: username,
      gender: gender,
      date_of_birth: dob,
    });
    await fetch(baseURL + "/userinfo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: userCred,
    });
  };

  const getFavouriteMoviesForUser = async (
    username: string
  ): Promise<FavouriteMovies[]> => {
    return await fetch(baseURL + `/userinfo/favouritemovies/${username}`).then(
      (res) => res.json() as Promise<FavouriteMovies[]>
    );
  };

  const getSimilarMoviesForUser = async (
    uId: string
  ): Promise<TmdbMovieResponse[]> => {
    return await fetch(baseURL + `/movie/similar/${uId}`).then(
      (res) => res.json() as Promise<TmdbMovieResponse[]>
    );
  };

  const getEnrichedMovie = async (
    movieId: string
  ): Promise<EnrichedMovie | undefined> => {
    return await fetch(baseURL + `/movie/enriched/${movieId}`)
      .then((res) => res.json() as Promise<EnrichedMovie>)
      .catch(() => undefined);
  };

  const getReviewsForMovie = async (movieId: string): Promise<Review[]> => {
    return await fetch(baseURL + `/reviews/${movieId}`).then(
      (res) => res.json() as Promise<Review[]>
    );
  };

  const reviewMovie = async (review: Review) => {
    return await fetch(baseURL + `/reviews`, {
      method: "post",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const addMovieToFavourites = async (movieId: string, userId: string) => {
    return await fetch(baseURL + "/favouritemovies", {
      method: "post",
      body: JSON.stringify({ movie_id: movieId, user_id: userId }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const removeMovieFromFavourites = async (movieId: string, userId: string) => {
    return await fetch(baseURL + "/favouritemovies", {
      method: "delete",
      body: JSON.stringify({ movie_id: movieId, user_id: userId }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const getUserDetail = async (userId: string) => {
    return await fetch(baseURL + `/userinfo/${userId}`).then(
      (res) => res.json() as Promise<UserInfo>
    );
  };

  const context = {
    getMovieById,
    getMovieByTitle,
    getMovieByYear,
    getYearlyRatings,
    getNumberOfActorsPerYear,
    getActorsWithMostMovies,
    saveUserInfo,
    getFavouriteMoviesForUser,
    getSimilarMoviesForUser,
    getEnrichedMovie,
    getReviewsForMovie,
    reviewMovie,
    addMovieToFavourites,
    getUserDetail,
    removeMovieFromFavourites,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

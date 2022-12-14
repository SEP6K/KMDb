import React, { createContext, useContext } from "react";
import { ActorWithMovies, YearlyActors } from "../models/actor";
import {
  EnrichedMovie,
  FavouriteMovies,
  SimpleMovie,
  TmdbMovieResponse,
} from "../models/movie";
import { YearRating } from "../models/rating";

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
  getEnrichedMovie: (movieId: number) => Promise<EnrichedMovie>;
};

const Context = createContext<Context>({} as Context);

const baseURL = import.meta.env.VITE_SERVER_URL;

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
    console.log(userCred);
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

  const getEnrichedMovie = async (movieId: string): Promise<EnrichedMovie> => {
    return await fetch(baseURL + `/movie/enriched/${movieId}`).then(
      (res) => res.json() as Promise<EnrichedMovie>
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
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

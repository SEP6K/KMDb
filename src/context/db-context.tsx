import React, { createContext, useContext } from "react";
import { ActorWithMovies, YearlyActors } from "../models/actor";
import { SimpleMovie } from "../models/movie";
import { YearRating } from "../models/rating";

type Props = {
  children: React.ReactNode;
};

type Context = {
  getMovieById: (id: number) => Promise<SimpleMovie[]>;
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
};

const Context = createContext<Context>({} as Context);

const baseURL = "https://kmdb-server-dev-mr4lg3chza-ey.a.run.app";

export const useDbContext = (): Context => useContext(Context);

export const DbContext = ({ children }: Props) => {
  const getMovieById = async (id: number): Promise<SimpleMovie[]> => {
    return await fetch(baseURL + "/movie/id/" + id).then(
      (res) => res.json() as Promise<SimpleMovie[]>
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
    await fetch(baseURL + "/userinfo", {
      method: "post",
      body: JSON.stringify({
        user_id: userId,
        user_name: username,
        gender: gender,
        date_of_birth: dob,
      }),
    });
  };

  const context = {
    getMovieById,
    getMovieByTitle,
    getMovieByYear,
    getYearlyRatings,
    getNumberOfActorsPerYear,
    getActorsWithMostMovies,
    saveUserInfo,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

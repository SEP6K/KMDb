import React, { createContext, useContext } from "react";
import { Movie, SimpleMovie } from "../models/movie";
import { YearRating } from "../models/rating";

type Props = {
  children: React.ReactNode;
};

type Context = {
  getMovieById: (id: number) => Promise<SimpleMovie[]>;
  getMovieByTitle: (title: string) => Promise<SimpleMovie[]>;
  getMovieByYear: (year: number) => Promise<SimpleMovie[]>;
  getYearlyRatings: (from?: number, to?: number) => Promise<YearRating[]>;
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

  const getYearlyRatings = async (
    from?: number,
    to?: number
  ): Promise<YearRating[]> => {
    return await fetch(baseURL + "/chart/ratings").then(
      (res) => res.json() as Promise<YearRating[]>
    );
  };

  const context = {
    getMovieById,
    getMovieByTitle,
    getMovieByYear,
    getYearlyRatings,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

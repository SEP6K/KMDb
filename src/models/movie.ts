export type Movie = {
  title: string;
  releaseDate: string;
  runtime: string;
  genre: string;
  director: string;
  writers: string;
  actors: string;
  plotDescription: string;
  awards: string;
  posterUrl: string;
  boxOffice: string;
  id: number;
  year: number;
};

export type SimpleMovie = {
  movie_id: number;
  title: string;
  year: number;
};

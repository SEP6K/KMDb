import { DataSource } from "typeorm";
import { Directors, Movies, People, Ratings, Stars } from "./models";

export const dataSource = new DataSource({
  type: "postgres",
  host: import.meta.env.VITE_HOST,
  // env vars in react need the REACT_APP prefix to work
  // and they always return as (string | undefined)
  port: parseInt(import.meta.env.VITE_PORT!),
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PASSWORD,
  database: import.meta.env.VITE_DATABASE,
  entities: [Directors, Movies, People, Ratings, Stars],
}).initialize();

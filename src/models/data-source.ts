import { DataSource } from "typeorm";
import { Directors, Movies, People, Ratings, Stars } from "./models";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.VITE_DB_HOST,
  // env vars in react need the VITE prefix to work
  // and they always return as (string | undefined)
  port: parseInt(import.meta.env.VITE_DB_PORT!),
  username: import.meta.env.VITE_DB_USERNAME,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DATABASE,
  entities: [Directors, Movies, People, Ratings, Stars],
}).initialize();

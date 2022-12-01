import { DataSource } from "typeorm";
import { Directors, Movies, People, Ratings, Stars } from "./models";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.REACT_APP_HOST,
  // env vars in react need the REACT_APP prefix to work
  // and they always return as (string | undefined)
  port: parseInt(process.env.REACT_APP_PORT!),
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD,
  database: process.env.REACT_APP_DATABASE,
  entities: [Directors, Movies, People, Ratings, Stars],
}).initialize();

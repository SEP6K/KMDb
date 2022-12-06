import { DataSource } from "typeorm";
import { Directors, Movies, People, Ratings, Stars } from "./models";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.REACT_APP_DB_HOST,
  port: parseInt(process.env.REACT_APP_DB_PORT!),
  username: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE,
  entities: [Directors, Movies, People, Ratings, Stars],
}).initialize();

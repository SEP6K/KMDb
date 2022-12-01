import { DataSource } from "typeorm";
import { Directors, Movies, People, Ratings, Stars } from "./models";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.REACT_APP_HOST,
  port: parseInt(process.env.REACT_APP_PORT!),
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD,
  database: process.env.REACT_APP_DATABASE,
  entities: [Directors, Movies, People, Ratings, Stars],
}).initialize();

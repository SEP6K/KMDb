import { Login } from "../pages/login/login";
import { Movies } from "../pages/movies/movies";
import { Ratings } from "../pages/ratings/ratings";
import Register from "../pages/register/Register";

type Route = {
  path: string;
  element: React.ReactNode | null;
};

export const routes: Route[] = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/ratings",
    element: <Ratings />,
  },
];

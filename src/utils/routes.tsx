import { Login } from "../pages/login/login";
import { Movie } from "../pages/movie/movie";
import { Profile } from "../pages/profile/Profile";
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
    path: "/ratings",
    element: <Ratings />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/movie/:movieId",
    element: <Movie />,
  },
];

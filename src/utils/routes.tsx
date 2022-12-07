import { Login } from "../pages/login/login";
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
];

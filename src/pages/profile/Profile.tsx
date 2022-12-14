import { auth } from "../../../utils/firebase";
import { useAuth } from "../../auth/auth-provider";
import { MovieList } from "../../components/movieList";
import { NavBar } from "../../components/nav";

export const Profile = () => {
  const { user } = useAuth();

  const username = user?.username.replaceAll(" ", "%20");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />

      {username}
      <div
        style={{
          borderRadius: "50%",
          width: "42px",
          height: "42px",
          backgroundImage: `url(https://api.multiavatar.com/${username}.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
      />
      <MovieList />
    </div>
  );
};

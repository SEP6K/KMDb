import { useAuth } from "../../auth/auth-provider";
import { MovieList } from "../../components/movieList";
import { NavBar } from "../../components/nav";

export const Profile = () => {
  const { user } = useAuth();

  const username = user?.username?.replaceAll(" ", "%20");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "32px",
          gap: "16px",
          fontWeight: 700,
          fontSize: "32px",
          flexGrow: 1,
          height: "20%",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            width: "96px",
            height: "96px",
            backgroundImage: `url(https://api.multiavatar.com/${username}.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p>{user?.username}</p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "normal",
            }}
          >
            {user?.email}
          </p>
        </div>
      </div>
      <MovieList />
    </div>
  );
};

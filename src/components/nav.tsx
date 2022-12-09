import { Search } from "./search";
import { Spinner } from "./spinner";
import { UserPanel } from "./user-panel";

export const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "32px",
        }}
      >
        <p
          style={{
            color: "#646cff",
            fontSize: "28px",
            fontWeight: "900",
          }}
        >
          KMDb
        </p>
        <button>Movies</button>
        <button>Directors</button>
        <button>Your list</button>
        <Search />
      </div>
      <div
        style={{
          justifySelf: "end",
        }}
      >
        <UserPanel />
      </div>
    </div>
  );
};

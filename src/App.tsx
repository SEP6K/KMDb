import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./auth/auth-provider";
import { Footer } from "./components/footer";
import { NavBar } from "./components/nav";

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "16px",
          height: "100%",
        }}
      >
        Hello world
      </div>
      <Footer />
    </div>
  );
}

export default App;

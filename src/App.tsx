import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./auth/auth-provider";

function App() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout().then(() => navigate("/register"));
  };

  useEffect(() => {
    if (!user) navigate("/register");
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
        gap: "16px",
      }}
    >
      Hello {user?.username}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default App;

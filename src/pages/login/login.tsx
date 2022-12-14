import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/auth-provider";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmailAndPass, user, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signIn = async () =>
    await signInWithEmailAndPass(email, password).then((val) => {
      if (val === undefined) setError("Failed to log in.");
    });

  useEffect(() => {
    if (user) navigate("/");
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          position: "relative",
          width: "216px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <button style={{ width: "100px" }} onClick={signIn}>
            Login
          </button>
          <button
            style={{ width: "100px" }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: "gray",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: -13,
              left: "50%",
              translate: "-50% 0",
              padding: "0 8px",
              background: "black",
            }}
          >
            or
          </p>
          <button onClick={googleLogin}>Google OAuth</button>
        </div>
      </div>
    </div>
  );
};

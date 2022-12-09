import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth-provider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { googleLogin, signUpWithEmailAndPass } = useAuth();

  const GoogleLogin = async () =>
    await googleLogin()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));

  const signUpWithEmailAndPassword = async () => {
    signUpWithEmailAndPass(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        }}
      >
        <button onClick={signUpWithEmailAndPassword}>Register</button>
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
            top: "30px",
            left: "50%",
            translate: "-50% 0",
            padding: "0 8px",
            background: "black",
          }}
        >
          or
        </p>
        <button onClick={GoogleLogin}>Google OAuth</button>
      </div>
    </div>
  );
};

export default Register;

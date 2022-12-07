import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../utils/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpWithEmailAndPass = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
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
        <button type="submit" onClick={() => signUpWithEmailAndPass()}>
          Register
        </button>
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

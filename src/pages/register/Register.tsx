import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    createUserWithEmailAndPassword(auth, "ionut@gmail.com", "password")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  return (
    <div>
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
      <button type="submit" onClick={() => signUpWithEmailAndPass()}>
        Register
      </button>
      <button onClick={GoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Register;

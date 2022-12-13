import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth-provider";
import { useDbContext } from "../../context/db-context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const navigate = useNavigate();
  const { googleLogin, signUpWithEmailAndPass } = useAuth();
  const { saveUserInfo } = useDbContext();

  const GoogleLogin = async () =>
    await googleLogin()
      .then((res) => {
        saveUserInfo(res.user.uid, res.user.displayName ?? "", "", "");
        navigate("/");
      })
      .catch((err) => console.error(err));

  const signUpWithEmailAndPassword = async () => {
    signUpWithEmailAndPass(email, password)
      .then((res) => {
        saveUserInfo(res.user.uid, username, gender, dob.toLocaleDateString());
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
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>
        Gender:
        <select
          value={gender}
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </label>
      <label>
        Birthday:
        <DatePicker selected={dob} onChange={(date: Date) => setDob(date)} />
      </label>
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

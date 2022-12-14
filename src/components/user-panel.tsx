import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";

export const UserPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const username = user?.username?.replaceAll(" ", "%20");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        gap: "16px",
        paddingLeft: "24px",
        color: "white",
        fontWeight: "bold",
        backgroundColor: color,
        transition: ".2s ease-in-out background",
        cursor: "pointer",
        borderRadius: "42px",
      }}
      className="user-panel"
      onMouseEnter={() => setColor("#646cff")}
      onMouseLeave={() => !isOpen && setColor("transparent")}
      onClick={() => setIsOpen(!isOpen)}
    >
      {user?.username}
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
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          position: "absolute",
          top: "64px",
          padding: "16px",
          right: "0",
          display: isOpen ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "24px",
            translate: "50%",
            rotate: "45deg",
            backgroundColor: "#1a1a1a",
            height: "16px",
            width: "16px",
            borderRadius: "2px",
          }}
        />
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </button>
        <button
          onClick={() => {
            navigate("/login");
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

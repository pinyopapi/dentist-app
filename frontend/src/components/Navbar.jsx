import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { getText } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>{getText("home")}</Link>

      {user ? (
        <>
          <Link to="/appointments" style={{ marginRight: "10px" }}>{getText("appointmentsNav")}</Link>
          <Link to="/admin" style={{ marginRight: "10px" }}>{getText("admin")}</Link>
          <Link to="/adminServices" style={{ marginRight: "10px" }}>{getText("services")}</Link>
          <span style={{ marginRight: "15px" }}>Hello, {user.name}</span>
          <button onClick={handleLogout}>{getText("logout")}</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>{getText("login")}</Link>
          <Link to="/register">{getText("register")}</Link>
        </>
      )}
      <LanguageSelector />
    </nav>
  );
};

export default Navbar;
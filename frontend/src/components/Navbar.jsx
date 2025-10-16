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
          <Link to="/appointments">{getText("appointmentsNav")}</Link>
          <Link to="/services">{getText("services")}</Link>
          <Link to="/adminCalendar">{getText("adminCalendar")}</Link>
          <Link to="/adminServices">{getText("manageServices")}</Link>
          <span>Hello, {user.name}</span>
          <button onClick={handleLogout}>{getText("logout")}</button>
        </>
      ) : (
        <>
          <Link to="/login">{getText("login")}</Link>
          <Link to="/register">{getText("register")}</Link>
        </>
      )}
      <LanguageSelector />
    </nav>
  );
};

export default Navbar;
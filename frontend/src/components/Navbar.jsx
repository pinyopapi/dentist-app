import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { getText } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>{getText("home")}</Link>

        {user ? (
          <>
            <Link to="/appointments" className={styles.navLink}>{getText("appointmentsNav")}</Link>
            <Link to="/services" className={styles.navLink}>{getText("services")}</Link>
            <Link to="/adminCalendar" className={styles.navLink}>{getText("adminCalendar")}</Link>
            <Link to="/adminServices" className={styles.navLink}>{getText("manageServices")}</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>{getText("login")}</Link>
            <Link to="/register" className={styles.navLink}>{getText("register")}</Link>
          </>
        )}
      </div>

      <div className={styles.userSection}>
        {user && (<>
          <span className={styles.greeting}>Hello, {user.name}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>{getText("logout")}</button>
        </>)}
        <LanguageSelector />
      </div>

    </nav>
  );
};

export default Navbar;
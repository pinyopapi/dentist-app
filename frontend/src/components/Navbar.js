import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LanguageSelector from ".//LanguageSelector";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

            {user ? (
                <>
                    <Link to="/appointments" style={{ marginRight: "10px" }}>Appointments</Link>
                    <span style={{ marginRight: "15px" }}>Hello, {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
            <LanguageSelector />
        </nav>
    );
};

export default Navbar;
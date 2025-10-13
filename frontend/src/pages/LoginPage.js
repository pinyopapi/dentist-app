import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import translations from "../i18n";
import { LanguageContext } from "../contexts/LanguageContext";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const getTranslation = (key) => translations[key][language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (url, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        login(token);
        setMessage(getTranslation("successLogin"));
        setTimeout(() => {
          setMessage("");
          navigate("/dashboard");
        }, 2000);
      }
      else {
        setMessage(data.message || getTranslation("error"));
        setTimeout(() => setMessage(""), 2000);
      }
    } catch {
      setMessage(getTranslation("error"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin("/auth/login", { email, password });
  };

  const handleGoogleLogin = (credentialResponse) => {
    handleLogin("/auth/google", { token: credentialResponse.credential });
  };

  return (
    <div className="login-page">
      <h1>{getTranslation("login")}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={getTranslation("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="current-username"
        />
        <input
          type="password"
          placeholder={getTranslation("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">{getTranslation("login")}</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage(getTranslation("error"))}
        />
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
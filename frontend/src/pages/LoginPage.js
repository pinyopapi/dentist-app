import { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import translations from "../i18n";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { language } = useContext(LanguageContext);
  const getTranslation = (key) => translations[key][language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResponse = async (url, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMessage(res.ok ? getTranslation("successLogin") : data.message || getTranslation("error"));
    } catch {
      setMessage(getTranslation("error"));
    }
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="login-page">
      <h1>{getTranslation("login")}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResponse("/auth/login", { email, password });
        }}
      >
        <input
          type="email"
          placeholder={getTranslation("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={getTranslation("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{getTranslation("login")}</button>
      </form>

      <div style={{ margin: "20px 0" }}>
        <GoogleLogin
          onSuccess={(res) => handleResponse("/auth/google", { token: res.credential })}
          onError={() => setMessage(getTranslation("error"))}
        />
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
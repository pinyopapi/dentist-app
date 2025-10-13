import { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import translations from "../i18n";
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const { language } = useContext(LanguageContext);
  const getTranslation = (key) => translations[key][language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) setMessage(getTranslation("successLogin"));
      else setMessage(data.message || getTranslation("error"));
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(getTranslation("networkError"));
    }
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
        />
        <input
          type="password"
          placeholder={getTranslation("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{getTranslation("login")}</button>
      </form>
      {message && <p>{message}</p>}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;
          // POST to backend
          const res = await fetch("/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          if (res.ok) {
            // save JWT
            console.log(data.token);
          }
        }}
        onError={() => {
          console.log('Google login failed');
        }}
      />
    </div>
  );
};

export default LoginPage;

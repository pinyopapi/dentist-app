import { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import translations from "../i18n";

const RegisterPage = () => {
  const { language } = useContext(LanguageContext);
  const getTranslation = (key) => translations[key][language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) setMessage(getTranslation("successRegister"));
      else setMessage(data.message || getTranslation("error"));
    } catch (err) {
      setMessage(getTranslation("networkError"));
    }
  };

  return (
    <div className="register-page">
      <h1>{getTranslation("register")}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={getTranslation("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">{getTranslation("register")}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;

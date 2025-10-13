import { useContext } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { LanguageProvider, LanguageContext } from "./contexts/LanguageContext";

function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <button onClick={toggleLanguage}>
      {language === "hu" ? "English" : "Magyar"}
    </button>
  );
}

function AppContent() {
  return (
    <div>
      <LanguageSwitcher />
      <RegisterPage />
      <LoginPage />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

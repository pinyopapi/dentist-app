import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <LanguageProvider>
        <LanguageSelector />
        <RegisterPage />
        <LoginPage />
    </LanguageProvider>
  );
}

export default App;
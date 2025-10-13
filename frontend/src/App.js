import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import LanguageSelector from "./components/LanguageSelector";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <LanguageSelector />
        <RegisterPage />
        <LoginPage />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
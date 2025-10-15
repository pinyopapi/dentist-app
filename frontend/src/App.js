import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute> <AppointmentsPage /> </ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
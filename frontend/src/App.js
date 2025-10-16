import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminServicesPage from "./pages/AdminServicePage";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
              <Route path="/adminServices" element={<ProtectedRoute> <AdminServicesPage /> </ProtectedRoute>} />
            </Routes>
          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
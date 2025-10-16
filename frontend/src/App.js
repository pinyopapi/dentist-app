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
import AdminCalendarPage from "./pages/AdminCalendarPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminServicesPage from "./pages/AdminServicePage";
import UserServicesPage from "./pages/UserServicesPage";

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
              <Route path="/services" element={<ProtectedRoute> <UserServicesPage /> </ProtectedRoute>} />
              <Route path="/adminCalendar" element={<ProtectedRoute> <AdminCalendarPage /> </ProtectedRoute>} />
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
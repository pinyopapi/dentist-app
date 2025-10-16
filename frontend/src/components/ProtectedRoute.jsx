import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { getText } = useTranslation();

  if (loading) return <p>{getText("loading")}</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, role } = useContext(AuthContext);
  // console.log(user, "knfio");

  // ✅ If no user, redirect to login
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If user has the correct role, allow access

  // ✅ Redirect based on role if trying to access the wrong dashboard
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (role === "student") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

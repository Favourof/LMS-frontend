import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { checkUserRole } from "../services/authService";

const AuthRedirectHandler = () => {
  const [redirectPath, setRedirectPath] = useState(null);
  const location = useLocation(); // ✅ Now it's inside <Router>

  useEffect(() => {
    const restrictedRoutes = ["/", "/login", "/signup"];
    if (restrictedRoutes.includes(location.pathname)) {
      checkUserRole().then((route) => {
        if (route !== "/") {
          setRedirectPath(route);
        }
      });
    }
  }, [location.pathname]);

  return redirectPath ? <Navigate to={redirectPath} replace /> : null;
};

export default AuthRedirectHandler;

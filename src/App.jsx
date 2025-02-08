import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layouts/DashboardLayout";
import UserDashboard from "./layouts/UserDashboard";
import CoursesPage from "./pages/CoursesPage";
import CreateCourse from "./pages/CreateCourse";
import AllCoursePage from "./pages/AllcoursePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
// import AuthRedirectHandler from "./components/AuthRedirectHandler";
import AuthContext from "./context/AuthContext";
import Reviews from "./components/Reviews";

const App = () => {
  const { user, role } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // ✅ Restore User Session Before Rendering Routes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRole = localStorage.getItem("role");
    console.log('hello from the app page');
    

    if (storedUser && storedRole) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    // <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <AuthRedirectHandler /> */}

        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* ✅ Auto Route Users to Dashboard Based on Role */}
          {user && role === "admin" ? (
            <Route path="/admin-dashboard" element={<DashboardLayout />}>
              <Route index element={<h1>Admin Dashboard</h1>} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="manage" element={<CreateCourse />} />
              <Route path="revenue" element={<Reviews />} />
              <Route path="settings" element={<h1>Settings</h1>} />
            </Route>
          ) : user && role === "student" ? (
            <Route path="/dashboard" element={<UserDashboard />}>
              <Route index element={<h1>User Dashboard</h1>} />
              <Route path="courses" element={<AllCoursePage />} />
              <Route path="manage" element={<CreateCourse />} />
              <Route path="revenue" element={<h1>Revenue</h1>} />
              <Route path="settings" element={<h1>Settings</h1>} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}

          {/* ✅ Course Details Accessible to Both Admins & Students */}
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

          {/* ✅ Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    // </AuthProvider>
  );
};

export default App;

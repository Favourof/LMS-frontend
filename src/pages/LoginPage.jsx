import React, { useState, useContext } from "react";
import { FaFacebookF, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { CustomizeButton } from "../components/CustomizeButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { user, role, random, setRandom } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser, setToken, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading("Signing in... Please wait!");

    try {
      const response = await login(formData);
      console.log(response, "i am here");

      // Store in context and localStorage

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);

      // Update toast to success
      toast.update(toastId, {
        render: "🎉 Login Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setRandom(Math.random() * 10);

      // Redirect based on role
      if (response.user.role === "admin") {
        console.log(response.user.role);
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Update toast to error
      toast.update(toastId, {
        render: error.response?.data?.message || "Invalid credentials",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Sign in to your account
        </h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Username or Email ID"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <CustomizeButton
            text={loading ? "Creating Account..." : "Create Account"}
            disabled={loading}
          />
        </form>

        {/* Social Login */}
        <p className="text-center mt-6 text-gray-600">Sign in with</p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-3 bg-blue-600 text-white rounded-full">
            <FaFacebookF />
          </button>
          <button className="p-3 bg-red-500 text-white rounded-full">
            <FaGoogle />
          </button>
          <button className="p-3 bg-yellow-600 text-white rounded-full">
            <FaMicrosoft />
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        // class=""
        className="hidden md:block md:w-1/2 bg-cover bg-center bg-login"
        // style={{ backgroundImage: url({ logg }) }}
      ></div>
    </div>
  );
};

export default LoginPage;

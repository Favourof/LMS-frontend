import React, { useState, useContext } from "react";
import { FaFacebookF, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { CustomizeButton } from "../components/CustomizeButton";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify"; // Import react-toastify

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "learner",
  });

  //   const { setUser } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // 🔵 Loading state

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // 🔵 Start loading

    // Show a loading toast
    const toastId = toast.loading("Signing up... Please wait!");

    try {
      const userData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await signup(userData);

      // Update toast to success
      toast.update(toastId, {
        render: "🎉 Signup Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      // Update toast to error
      console.log(error);

      toast.update(toastId, {
        render: error.response?.data?.message || "An error occurred",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false); // 🔵 Stop loading
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center bg-signup"></div>
      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Create Your Account
        </h2>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className="w-full px-4 py-3 border rounded-lg"
            onChange={handleChange}
            required
          />
          <div className="flex gap-4">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-1/2 px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-1/2 px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Register as:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white"
            >
              <option value="student">Student</option>
              <option value="admin">Instructor</option>
            </select>
          </div>

          {/* Disable button while loading */}
          <CustomizeButton
            text={loading ? "Creating Account..." : "Create Account"}
            disabled={loading}
          />
        </form>

        {/* Social Signup */}
        <p className="text-center mt-6 text-gray-600">Sign up with</p>
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
    </div>
  );
};

export default SignupPage;

import heroImage from "../assets/Group 469347.png";
import ProtectedRoute from "./ProtectedRoute";

const HeroSection = () => {
  const handleGetStart = () => {
    // ProtectedRoute();
  };
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 p-4 bg-gray-100">
      {/* Left Side - Text Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl font-bold text-gray-900">
          Unlock Your Potential <br /> with{" "}
          <span className="text-blue-600">Byway</span>
        </h1>
        <p className="text-gray-600 mt-4">
          Welcome to Byway, where learning knows no bounds. We believe that
          education is the key to personal and professional growth, and we're
          here to guide you on your journey to success. Whether you're a
          student, professional, or lifelong learner, our cutting-edge Learning
          Management System is designed to elevate your learning experience.
        </p>
        <button
          onClick={() => handleGetStart()}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start your instructor journey
        </button>
      </div>

      {/* Right Side - Hero Image */}
      <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img src={heroImage} alt="Hero Section" className="w-full max-w-lg" />
      </div>
    </section>
  );
};

export default HeroSection;

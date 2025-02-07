import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import InstructorSection from "./InstructorSection";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Byway
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center border rounded-lg px-4 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search courses"
              className="outline-none"
            />
          </div>
          <Link to="/login" className="px-4 py-2 border rounded-md">
            Log In
          </Link>
          <Link
            to="signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white border-t shadow-md">
          <div className="flex items-center border rounded-lg px-4 py-2 my-2 w-11/12">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search courses"
              className="outline-none w-full"
            />
          </div>
          <Link
            to="/login"
            className="px-4 py-2 border rounded-md w-11/12 text-center"
          >
            Log In
          </Link>
          <a
            href="#intructor"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-11/12 text-center mt-2"
          >
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

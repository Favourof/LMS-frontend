import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  FaBars,
  FaBook,
  FaEnvelope,
  FaMoneyBill,
  FaCog,
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../services/authService";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    console.log("helllo");

    logout();
    window.location.href = "/login";
  };

  const menus = [
    { name: "Dashboard", icon: FaTachometerAlt, link: "/admin-dashboard" },
    { name: "Courses", icon: FaBook, link: "/admin-dashboard/courses" },
    {
      name: "manage",
      icon: FaEnvelope,
      link: "/admin-dashboard/manage",
    },
    { name: "Revenue", icon: FaMoneyBill, link: "/admin-dashboard/revenue" },
    { name: "Settings", icon: FaCog, link: "/admin-dashboard/settings" },
  ];

  return (
    <aside
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      {/* Profile & Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <FaUserCircle size={30} className="text-white" />
          {isOpen && (
            <div>
              <p className="text-lg font-semibold">Hi, {user.firstname}</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          )}
        </div>
        {/* Sidebar Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="mt-4">
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.link}
            className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-lg"
          >
            <menu.icon size={24} className="text-white" />
            <span
              className={`text-sm transition-all ${
                isOpen ? "block" : "hidden group-hover:block"
              }`}
            >
              {menu.name}
            </span>
          </NavLink>
        ))}
      </ul>

      {/* ✅ Fixed Logout Button */}
      <button
        className={`absolute bottom-4 left-[5%] transform -translate-x-1/2 flex items-center gap-2 bg-red-600 py-2 px-4 rounded-md w-fit`}
        onClick={() => handleLogOut()}
      >
        <FaSignOutAlt size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;

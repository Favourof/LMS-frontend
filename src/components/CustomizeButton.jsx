import React from "react";
import { FaArrowRight } from "react-icons/fa";

export const CustomizeButton = ({ text }) => {
  return (
    <button className="group px-4 w-auto bg-black text-white py-3 rounded-lg mt-4 flex items-center justify-center hover:bg-gray-800 transition">
      {text}
      <FaArrowRight className="inline ml-3 transition-transform duration-300 group-hover:translate-x-2" />
    </button>
  );
};

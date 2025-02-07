import { FaFacebookF, FaGithub, FaGlobe, FaWindows } from "react-icons/fa";

const Footer = () => {
  return (
    <footer x className="bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-blue-400">Byway</h2>
          <p className="text-gray-400 mt-3">
            Empowering learners through accessible and engaging online
            education.
          </p>
          <p className="text-gray-400 mt-2">
            Byway is a leading online learning platform dedicated to providing
            high-quality, flexible, and affordable educational experiences.
          </p>
        </div>

        {/* Middle Left - Get Help */}
        <div>
          <h3 className="text-lg font-semibold">Get Help</h3>
          <ul className="text-gray-400 mt-3 space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Latest Articles
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Middle Right - Programs */}
        <div>
          <h3 className="text-lg font-semibold">Programs</h3>
          <ul className="text-gray-400 mt-3 space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Art & Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Business
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                IT & Software
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Languages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Programming
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Info & Socials */}
        <div id="intructor">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-gray-400 mt-3">
            Address: 123 Main Street, Anytown, CA 12345
          </p>
          <p className="text-gray-400">Tel: +1 (123) 456-7890</p>
          <p className="text-gray-400">Mail: bywayedu@webkul.in</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white text-xl hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white text-xl hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="#" className="text-white text-xl hover:text-green-400">
              <FaGlobe />
            </a>
            <a href="#" className="text-white text-xl hover:text-blue-600">
              <FaWindows />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

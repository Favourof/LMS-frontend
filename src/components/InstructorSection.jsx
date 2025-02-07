import { Link } from "react-router-dom";
import icons from "../assets/Icon";
import { CustomizeButton } from "./CustomizeButton";

const InstructorSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Become an Instructor */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={icons.becomeIntructor}
            alt="Instructor"
            className="w-56 sm:w-72 h-auto rounded-lg bg-purple-100 p-4"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold">Become an Instructor</h2>
            <p className="text-gray-600 mt-3 max-w-md">
              Instructors from around the world teach millions of students on
              Byway. We provide the tools and skills to teach what you love.
            </p>
            <div className="flex justify-center sm:justify-start">
              <CustomizeButton text="Start Your Instructor Journey" />
            </div>
          </div>
        </div>

        {/* Right - Transform Your Life */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={icons.student}
            alt="Student Learning"
            className="w-56 sm:w-72 h-auto rounded-lg bg-blue-100 p-4"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold">
              Transform Your Life Through Education
            </h2>
            <p className="text-gray-600 mt-3 max-w-md">
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </p>
            <div className="flex justify-center sm:justify-start">
              <Link to={"/signup"}>
                <CustomizeButton text="Checkout Courses" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;

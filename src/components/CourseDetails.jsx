import { useState } from "react";
import { FaStar } from "react-icons/fa";
// import UpdateCourseForm from "./UpdateCourseForm";
// import AddModuleForm from "./AddModuleForm";

const CourseDetails = ({ course }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Course Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        {/* ⭐ Ratings */}
        <div className="flex items-center text-yellow-500 text-sm mt-2">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar
            className={course?.averageRating < 5 ? "text-gray-400" : ""}
          />
          <span className="ml-2 text-gray-500">
            ({course?.averageRating || "No"} Ratings)
          </span>
        </div>
        <div className="text-lg font-bold mt-3">${course?.price}</div>
        <p className="text-gray-600 text-md">
          {course?.description.slice(0, 300)}
        </p>
      </div>

      {/* Admin Actions */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg w-[250px]">
        <div className="lg:w-auto bg-blue-200 border-2 md:flex sm: hidden ">
          <img
            src={course?.thumbnail || "/assets/default-course.jpg"}
            alt={course?.title}
            className="w-full h-40 object-cover"
          />
        </div>
        <button
          className="bg-blue-500 text-white w-full py-2 rounded mb-2  "
          onClick={() => setShowUpdateForm(true)}
        >
          Update Course
        </button>
        <button
          className="bg-green-500 text-white w-full py-2 rounded"
          onClick={() => setShowAddModuleForm(true)}
        >
          Add Module
        </button>
      </div>

      {/* {showUpdateForm && (
        <UpdateCourseForm
          course={course}
          closeForm={() => setShowUpdateForm(false)}
        />
      )}
      {showAddModuleForm && (
        <AddModuleForm
          courseId={course._id}
          closeForm={() => setShowAddModuleForm(false)}
        />
      )} */}
    </div>
  );
};

export default CourseDetails;

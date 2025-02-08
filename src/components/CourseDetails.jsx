import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import UpdateCourseForm from "./UpdateCourseForm";
import AddModuleForm from "./AddModuleForm";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { enrollInCourse, getCourseProgress } from "../services/progressService";
import Syllabus from "./Syllabus";

const CourseDetails = ({ course, onUpdateCourse, onAddModule }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const { role } = useContext(AuthContext);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await getCourseProgress(course._id);
        setProgress(progressData.progress);
      } catch (error) {
        console.error("Failed to fetch course progress:", error);
      } finally {
        setLoadingProgress(false);
      }
    };

    if (role === "student") {
      fetchProgress();
    }
  }, [course._id, role, loading]);

  const handleEnrollCourse = async (courseId) => {
    setLoading(true)
      const toastId = toast.loading("Enrolling... Please wait!");
    try {
    
      await enrollInCourse(courseId);
       toast.update(toastId, {
              render: "🎉 Enroll Successful!",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
    } catch (error) {
       toast.update(toastId, {
              render:error,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
      
    }finally{
      setLoading(false)
    }
  };

  // Prevent errors by checking if course exists
  if (!course) {
    return (
      <p className="text-center text-gray-500">Loading course details...</p>
    );
  }

  return (
    <div>

   
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
          {course?.description?.slice(0, 300)}
        </p>
        {/* Course Progress for Students */}
      
      </div>

      {/* Admin Actions */}
      <div className="w-full md:w-1/3  bg-gray-100 p-4 rounded-lg">
        <div className="lg:w-auto bg-blue-200 border-2 md:flex sm:hidden hidden">
          <img
            src={course?.thumbnail || "/assets/default-course.jpg"}
            alt={course?.title}
            className="w-full h-40 object-cover"
          />
        </div>
        {role === 'admin' ? (
          <div>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded mb-2"
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
        ) : (
          <button
            className="bg-green-500 text-white w-full py-2 rounded"
            onClick={() => handleEnrollCourse(course._id)}
          >
            {loading ?"Loading" : "Enroll course"}
            
          </button>
        )}
      </div>

      {showUpdateForm && (
        <UpdateCourseForm
          course={course}
          onUpdate={onUpdateCourse} // ✅ Pass the correct function
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {/* ✅ Add Module Modal */}
      {showAddModuleForm && (
        <AddModuleForm
          courseId={course._id}
          onAdd={onAddModule}
          onClose={() => setShowAddModuleForm(false)}
        />
      )}
    </div>
    {role === "student" && !loadingProgress && progress && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <p>Total Modules: {progress.totalModules}</p>
            <p>Completed Modules: {progress.completedModules}</p>
            <p>Completion Percentage: {progress.completionPercentage}%</p>
          </div>
        )}
        {role === "student" && loadingProgress && (
          <p className="text-gray-500">Loading progress...</p>
        )}

         {/* Course Modules for Students */}
         {role === "student" && (
        <Syllabus modules={course.modules} courseId={course._id} />
      )}
    </div>
  );
};

export default CourseDetails;
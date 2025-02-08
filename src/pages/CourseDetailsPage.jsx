import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  updateCourseDetails,
  addModulesToCourse,
  updateModule,
} from "../services/courseService";
import EnrolledStudents from "../components/EnrolledStudents";
import Syllabus from "../components/Syllabus";
import Reviews from "../components/Reviews";
import CourseDetails from "../components/CourseDetails";
import EditModuleForm from "../components/EditModuleForm";
import UpdateCourseForm from "../components/UpdateCourseForm";
import AddModuleForm from "../components/AddModuleForm";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [editingModule, setEditingModule] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
        console.log(courseData, "hello");
      } catch (error) {
        toast.error("Error fetching course details");
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleEditModule = (index, module) => {
    setEditingModule({ index, module });
  };

  const handleModuleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await updateModule(courseId, updatedData);
      const updatedCourse = await getCourseById(courseId);
      setCourse(updatedCourse);
      toast.success("Module updated successfully!");
      setEditingModule(null);
    } catch (error) {
      toast.error("Failed to update module.");
      console.error("Failed to update module:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await updateCourseDetails(courseId, updatedData);
      const updatedCourse = await getCourseById(courseId);
      setCourse(updatedCourse);
      toast.success("Course updated successfully!");
      setShowUpdateForm(false);
    } catch (error) {
      toast.error("Failed to update course.");
      console.error("Failed to update course:", error);
    } finally {
      setLoading(false);
    }
  };

  

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading course details...</p>
    );
  if (!course)
    return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <CourseDetails
        course={course}
        onEditCourse={() => setShowUpdateForm(true)}
        onAddModule={() => setShowAddModuleForm(true)}
      />

      {/* ✅ Tabs Navigation */}
      {role === "admin" ? (
        <div className="flex border-b mt-6 overflow-x-auto">
          {["details", "students", "syllabus", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap transition-all duration-300
              ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 font-semibold text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      ) : (
        <h1>Enroll</h1>
      )}

      {/* ✅ Display Tab Content */}
      <div className="mt-6">
        {activeTab === "details" && (
          <p className="text-gray-700">{course.description}</p>
        )}
        {activeTab === "students" && (
          <EnrolledStudents students={course.studentsEnrolled} />
        )}
        {activeTab === "syllabus" && (
          <Syllabus modules={course.modules} onEditModule={handleEditModule} />
        )}
        {activeTab === "reviews" && <Reviews review={course.feedback} />}
      </div>

      {/* ✅ Module Editing Form */}
      {editingModule && (
        <EditModuleForm
          module={editingModule.module}
          moduleIndex={editingModule.index}
          onUpdate={handleModuleUpdate}
          onClose={() => setEditingModule(null)}
        />
      )}

      {/* ✅ Update Course Form */}
      {showUpdateForm && (
        <UpdateCourseForm
          course={course}
          onUpdate={handleCourseUpdate} // ✅ Ensure this function is defined
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {/* ✅ Add Module Form */}
      {showAddModuleForm && (
        <AddModuleForm
          courseId={courseId}
          onClose={() => setShowAddModuleForm(false)}
        />
      )}
    </div>
  );
};

export default CourseDetailsPage;
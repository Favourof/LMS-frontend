import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import EnrolledStudents from "../components/EnrolledStudents";
import Syllabus from "../components/Syllabus";
import Reviews from "../components/Reviews";
import CourseDetails from "../components/CourseDetails";
import EditModuleForm from "../components/EditModuleForm"; // New Form for Updating Modules

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
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
    try {
      const updatedCourse = await updateSpecificModule(courseId, updatedData);
      setCourse(updatedCourse);
      setEditingModule(null);
    } catch (error) {
      console.error("Failed to update module:", error);
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
      <CourseDetails course={course} />

      {/* ✅ Tabs Navigation */}
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
        {activeTab === "reviews" && <Reviews />}
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
    </div>
  );
};

export default CourseDetailsPage;

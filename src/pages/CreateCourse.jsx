import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPlus } from "react-icons/fa";
import CourseDetails from "../components/createCourse/CourseDetails";
import CourseModules from "../components/createCourse/CourseModules";
import { createCourse } from "../services/courseService";
import validateCourseData from "../utils/validateCourseData";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    thumbnail: null,
    modules: [],
  });

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Perform Validation
    const validationErrors = validateCourseData(courseData);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    // ✅ Prepare FormData for Submission
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("price", courseData.price);
    formData.append("duration", courseData.duration);

    if (courseData.thumbnail) {
      formData.append("thumbnail", courseData.thumbnail);
    }

    // ✅ Prepare Modules for Submission
    const modulesData = courseData.modules.map((mod) => ({
      title: mod.title,
      contentType: mod.contentType || "text",
    }));
    formData.append("modules", JSON.stringify(modulesData));

    courseData.modules.forEach((mod) => {
      if (mod.file) {
        formData.append("modulefile", mod.file);
      }
    });

    try {
      await createCourse(formData);
      toast.success("Course created successfully!");

      setCourseData({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        thumbnail: null,
        modules: [],
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-auto mx-auto overflow-hidden">
      <h1 className="text-xl font-semibold mb-4">Create Course</h1>

      {/* ✅ Tabs Navigation */}
      <div className="border-b mb-4 flex gap-6">
        {["details", "modules"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-500 font-semibold"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ Render Content Based on Active Tab */}
      <div className="flex-1 overflow-auto">
        {activeTab === "details" && (
          <CourseDetails
            courseData={courseData}
            setCourseData={setCourseData}
          />
        )}
        {activeTab === "modules" && (
          <CourseModules
            courseData={courseData}
            setCourseData={setCourseData}
          />
        )}
      </div>

      {/* ✅ Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </div>
  );
};

export default CreateCourse;

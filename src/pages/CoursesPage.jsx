import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminCourses } from "../services/courseService";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getAdminCourses(token);

        if (res && res.courses) {
          setCourses(res.courses); // ✅ Fix: Extract the array from `res.courses`
          console.log(res.courses); // ✅ This should log the correct array
        }
      } catch (error) {
        toast.error(error || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* 🔵 Sort Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Sort By</span>
          <select
            className="border px-3 py-2 rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="popularity">Popularity</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 🔵 Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : courses.length === 0 ? ( // ✅ Fix: `courses.length` instead of `courses?.results`
        <p className="text-center text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course?._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course._id)} // ✅ Handle course click
            >
              {/* ✅ Course Image */}
              <img
                src={course?.thumbnail || "/assets/default-course.jpg"}
                alt={course?.title}
                className="w-full h-40 object-cover"
              />

              {/* ✅ Course Details */}
              <div className="p-4">
                <h3 className="font-bold text-lg">{course?.title}</h3>
                <p className="text-gray-600 text-sm">
                  By {user.firstname} {user.lastname}
                </p>

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

                {/* ⏳ Duration & Lectures */}
                <p className="text-gray-500 text-sm mt-2">
                  {course?.duration} Hours, {course?.modules?.length || 0}{" "}
                  Modules
                </p>

                {/* 💲 Price */}
                <div className="text-lg font-bold mt-3">${course?.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;

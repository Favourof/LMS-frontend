import apiClient from "./apiClient";

/**
 * ✅ Create a new course (Admin Only)
 * @param {FormData} courseData - Course details including files
 */
export const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post("/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error Creating Course:", error);
    throw (
      error.response?.data?.message ||
      "An error occurred while creating the course."
    );
  }
};

/**
 * ✅ Get all courses (Public)
 */
export const getCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error Fetching Courses:", error);
    throw error.response?.data?.message || "Failed to fetch courses.";
  }
};

/**
 * ✅ Get courses created by the logged-in admin (Protected)
 */
export const getAdminCourses = async () => {
  try {
    const response = await apiClient.get("/courses/admin");
    return response?.data;
  } catch (error) {
    console.error("Error Fetching Admin Courses:", error);
    throw error.response?.data?.message || "Failed to fetch admin courses.";
  }
};

/**
 * ✅ Get a single course by ID
 * @param {string} courseId - The ID of the course
 */
export const getCourseById = async (courseId) => {
  try {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data.course;
  } catch (error) {
    console.error(`Error Fetching Course ${courseId}:`, error);
    throw error.response?.data?.message || "Failed to fetch course details.";
  }
};

/**
 * ✅ Update course details (Admin Only)
 * @param {string} courseId - The ID of the course
 * @param {object} updatedData - Updated course details
 */
export const updateCourseDetails = async (courseId, updatedData) => {
  try {
    const response = await apiClient.put(`/courses/${courseId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error Updating Course ${courseId}:`, error);
    throw error.response?.data?.message || "Failed to update course.";
  }
};

/**
 * ✅ Add Modules to a Course (Admin Only)
 * @param {string} courseId - The ID of the course
 * @param {FormData} moduleData - Module data including files
 */
export const addModulesToCourse = async (courseId, moduleData) => {
  try {
    const response = await apiClient.put(
      `/courses/${courseId}/modules`,
      moduleData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error Adding Modules to Course ${courseId}:`, error);
    throw error.response?.data?.message || "Failed to add modules.";
  }
};

/**
 * ✅ Update a Specific Module in a Course (Admin Only)
 * @param {string} courseId - The ID of the course
 * @param {number} moduleIndex - Index of the module to update
 * @param {FormData} updatedModule - Updated module data
 */
export const updateModule = async (courseId, moduleIndex, updatedModule) => {
  try {
    const response = await apiClient.put(
      `/courses/${courseId}/modules/${moduleIndex}`,
      updatedModule,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error Updating Module in Course ${courseId}:`, error);
    throw error.response?.data?.message || "Failed to update module.";
  }
};

/**
 * ✅ Delete a course (Admin Only)
 * @param {string} courseId - The ID of the course to delete
 */
export const deleteCourse = async (courseId) => {
  try {
    const response = await apiClient.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error Deleting Course ${courseId}:`, error);
    throw error.response?.data?.message || "Failed to delete course.";
  }
};

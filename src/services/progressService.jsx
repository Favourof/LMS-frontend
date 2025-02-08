import apiClient from "./apiClient";

/**
 * Enroll in a Course
 * @param {string} courseId - The ID of the course
 */
export const enrollInCourse = async (courseId) => {
  try {
    const response = await apiClient.post(`/progress/enroll/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error Enrolling in Course:", error);
    throw error.response?.data?.message || "Failed to enroll in course.";
  }
};

/**
 * Mark a Module as Completed
 * @param {string} courseId - The ID of the course
 * @param {object} moduleData - The index of the module to mark as completed
 */
export const markModuleAsCompleted = async (courseId, moduleData) => {
    const data = JSON.stringify(moduleData) 
    try {
// Log the moduleIndex being sent as a stringbeing sent as a string
      const response = await apiClient.put(`/progress/complete/${courseId}`, data, {
        headers: {
            'Content-Type': 'application/json'
          }
      });  
      return response.data;
    } catch (error) {
    //   console.error("Error Marking Module as Completed:", error);
      throw error.response?.data?.message || "Failed to mark module as completed.";
    }
  };

/**     
 * Get Course Progress
 * @param {string} courseId - The ID of the course
 */
export const getCourseProgress = async (courseId) => {
  try {
    const response = await apiClient.get(`/progress/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Course Progress:", error);
    throw error.response?.data?.message || "Failed to fetch course progress.";
  }
};
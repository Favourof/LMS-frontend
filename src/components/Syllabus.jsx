import { useContext, useState } from "react";
import { FaEdit, FaCheck, FaStar } from "react-icons/fa";

import { markModuleAsCompleted } from "../services/progressService";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import apiClient from "../services/apiClient";

const Syllabus = ({ modules, onEditModule, courseId }) => {
  const { role } = useContext(AuthContext);
  const [loading, isLoading] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const handleCompleteModule = async (Index) => {

    const moduleData = {
      moduleIndex: Index
    }
    isLoading(true)
    const toastId = toast.loading('loading..., please wait')
    try {
      await markModuleAsCompleted(courseId, moduleData);
      toast.update(toastId, {
        render: "🎉 module mark as complete",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      // Optionally, refresh progress or update UI
    } catch (error) {
      toast.update(toastId, {
        render:error,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }finally{
      isLoading(false)
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    isLoading(true);
    const data = {
      rating,
      comment
    }
     const feedata = JSON.stringify(data)
    try {
      const response = await apiClient.post(`/feedback/${courseId}`, feedata, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
       
      );
      toast.success("Feedback submitted successfully!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    
    } finally {
      isLoading(false);
    }
  };

  
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Course Modules</h2>
      <ul className="space-y-2">
        {modules.map((module, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => toggleModule(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{module.title}</h3>
              </div>
              {role === "admin" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditModule(index, module);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompleteModule(index);
                  }}
                  className="text-green-500 hover:text-green-700"
                >
                 <FaCheck />  complete
                </button>
              )}
            </div>

            {/* Expanded Module Details */}
            {expandedModule === index && (
              <div className="mt-2 p-3 bg-white shadow rounded">
                {module.contentType === "image" && (
                  <img
                    src={module.contentUrl}
                    alt={module.title}
                    className="w-full rounded max-h-[400px]"
                  />
                )}
                {module.contentType === "video" && (
                  <video controls className="w-full">
                    <source src={module.contentUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {module.contentType === "audio" && (
                  <audio controls className="w-full">
                    <source src={module.contentUrl} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                )}
                {module.contentType === "text" && (
                  <a
                    href={module.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
       {/* Feedback Form */}
       {role === "student" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
          <form onSubmit={handleSubmitFeedback}>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                Rating
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    className={`cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
          </div>
      )}
    </div>
  );
};

export default Syllabus;
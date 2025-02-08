import { useState } from "react";
import { updateCourseDetails } from "../services/courseService";

const UpdateCourseForm = ({ course, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: course.title,
    category: course.category,
    price: course.price,
    duration: course.duration,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      console.log(course._id);
      
      const res = await updateCourseDetails( course._id, formData);
      console.log(res);
      
    } catch (error) {
      console.log('error message', error);
      
    }finally{
      setLoading(false);
    }
 
  
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Update Course</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-3">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-3">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-3">Duration (Hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="text-gray-600" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseForm;

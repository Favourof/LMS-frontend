import { useState } from "react";
import { toast } from "react-toastify";
import { addModulesToCourse, getCourseById } from "../services/courseService";

const AddModuleForm = ({ courseId, onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const moduleData = JSON.stringify([{ title }]);
    formData.append("modules", moduleData);
    if (file) formData.append("file", file);

    console.log("Submitting module:", title, file);
    try {
      await addModulesToCourse(courseId, formData); // ✅ Fix: Pass courseId separately
      const updatedCourse = await getCourseById(courseId);
      // setCourse(updatedCourse);
      toast.success("Module added successfully!");
      // setShowAddModuleForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add module.");
      console.error("Failed to add module:", error);
    } finally {
      setLoading(false);
    }
   
  };

  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Module</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">Module Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-3">Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded mt-1"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="text-gray-600" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModuleForm;

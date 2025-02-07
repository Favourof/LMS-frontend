import { useState } from "react";

const EditModuleForm = ({ module, moduleIndex, onUpdate, onClose }) => {
  const [title, setTitle] = useState(module.title);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("moduleIndex", moduleIndex);
    formData.append("title", title);
    if (file) formData.append("file", file);

    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Module</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">Title</label>
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
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="text-gray-600" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModuleForm;

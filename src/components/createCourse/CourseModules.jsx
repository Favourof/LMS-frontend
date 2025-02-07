import { FaTrash } from "react-icons/fa";

const CourseModules = ({ courseData, setCourseData }) => {
  const handleModuleTitleChange = (index, value) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index].title = value;
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const handleModuleFileUpload = (index, file) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index].file = file;
    updatedModules[index].contentType = getFileType(file);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const getFileType = (file) => {
    if (!file) return "text";
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (file.type === "application/pdf") return "text";
    return "text";
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        { title: "", file: null, contentType: "" },
      ],
    });
  };

  const removeModule = (index) => {
    const updatedModules = courseData.modules.filter((_, i) => i !== index);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Course Modules</h2>
      <p className="text-sm text-gray-500">
        Upload Course Resources (PDF, Images, Videos, Audio)
      </p>

      {/* ✅ Display Uploaded Modules */}
      {courseData.modules.map((module, index) => (
        <div key={index} className="flex gap-4 items-center mb-2">
          <input
            type="text"
            placeholder="Module Title"
            onChange={(e) => handleModuleTitleChange(index, e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="file"
            onChange={(e) => handleModuleFileUpload(index, e.target.files[0])}
            required
          />
          <button
            type="button"
            onClick={() => removeModule(index)}
            className="text-red-500"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addModule}
        className="bg-green-500 text-white px-3 py-2 rounded"
      >
        Add Module
      </button>
    </div>
  );
};

export default CourseModules;

import { useState } from "react";
import { FaFilePdf, FaImage, FaMusic, FaVideo, FaEdit } from "react-icons/fa";

const Syllabus = ({ modules, onEditModule }) => {
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const getFileIcon = (contentType) => {
    switch (contentType) {
      case "image":
        return <FaImage className="text-blue-500 text-xl" />;
      case "video":
        return <FaVideo className="text-red-500 text-xl" />;
      case "audio":
        return <FaMusic className="text-green-500 text-xl" />;
      case "text":
        return <FaFilePdf className="text-gray-500 text-xl" />;
      default:
        return null;
    }
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
                {getFileIcon(module.contentType)}
                <h3 className="text-lg font-semibold">{module.title}</h3>
              </div>

              {/* Edit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditModule(index, module);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
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
                    View PDF
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Syllabus;

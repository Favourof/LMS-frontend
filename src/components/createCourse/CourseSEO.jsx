const CourseSEO = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">SEO Settings</h2>
      <p className="text-sm text-gray-500">
        Optimize your course for search engines.
      </p>

      <div className="mt-4">
        <label className="block text-sm font-semibold">Meta Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Meta Title"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold">Meta Description</label>
        <textarea
          className="w-full border p-2 rounded mt-1 h-24"
          placeholder="Enter Meta Description"
        ></textarea>
      </div>
    </div>
  );
};

export default CourseSEO;

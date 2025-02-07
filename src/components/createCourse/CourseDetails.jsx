const CourseDetails = ({ courseData, setCourseData }) => {
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleThumbnailUpload = (e) => {
    setCourseData({ ...courseData, thumbnail: e.target.files[0] });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Course Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Course Title"
          required
        />
        <input
          type="text"
          name="category"
          value={courseData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Category"
          required
        />
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Price"
          required
        />
        <input
          type="number"
          name="duration"
          value={courseData.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Duration (Hours)"
          required
        />
      </div>

      <textarea
        name="description"
        value={courseData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mt-4 h-24"
        placeholder="Write a course description..."
        required
      ></textarea>

      {/* ✅ Thumbnail Upload */}
      <label className="block text-sm font-semibold mt-4">
        Upload Thumbnail
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailUpload}
        className="w-full border p-2 rounded mt-1"
        required
      />
    </div>
  );
};

export default CourseDetails;

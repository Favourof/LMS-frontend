const validateCourseData = (courseData) => {
  const errors = [];

  if (!courseData.title.trim()) errors.push("Title is required");
  if (!courseData.description.trim()) errors.push("Description is required");
  if (!courseData.category.trim()) errors.push("Category is required");
  if (!courseData.price || courseData.price <= 0)
    errors.push("Price must be greater than 0");
  if (!courseData.duration || courseData.duration <= 0)
    errors.push("Duration must be greater than 0");
  if (!courseData.thumbnail) errors.push("Thumbnail is required");

  if (courseData.modules.length === 0) {
    errors.push("At least one module must be added");
  } else {
    courseData.modules.forEach((mod, index) => {
      if (!mod.title.trim())
        errors.push(`Module ${index + 1} title is required`);
      if (!mod.file) errors.push(`Module ${index + 1} file is required`);
    });
  }

  return errors;
};

export default validateCourseData;

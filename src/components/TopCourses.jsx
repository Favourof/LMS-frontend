import icons from "../assets/Icon";

const courses = [
  {
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    price: "$149.9",
    ratings: "1200 Ratings",
    totalHours: "22 Total Hours",
    image: icons.topcurses,
  },
  {
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    price: "$149.9",
    ratings: "1200 Ratings",
    totalHours: "22 Total Hours",
    image: icons.topcurses,
  },
  {
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    price: "$149.9",
    ratings: "1200 Ratings",
    totalHours: "22 Total Hours",
    image: icons.topcurses,
  },
  {
    title: "Beginner's Guide to Design",
    instructor: "Ronald Richards",
    price: "$149.9",
    ratings: "1200 Ratings",
    totalHours: "22 Total Hours",
    image: icons.topcurses,
  },
];

const TopCourses = () => {
  return (
    <section className="py-10 bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Courses</h2>
          <a href="#" className="text-blue-500">
            See All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={course.image}
                alt="Course"
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
              <p className="text-gray-500">By {course.instructor}</p>
              <p className="text-gray-700 font-bold">{course.price}</p>
              <p className="font-light text-sm">⭐⭐⭐⭐⭐{course.ratings}</p>
              <p className="text-gray-500">{course.totalHours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCourses;

import icons from "../assets/Icon";

const instructors = [
  {
    name: "Ronald Richards",
    profession: "UI/UX Designer",
    students: "2400 Students",
    image: icons.instructor,
  },
  {
    name: "Ronald Richards",
    profession: "UI/UX Designer",
    students: "2400 Students",
    image: icons.instructor,
  },
  {
    name: "Ronald Richards",
    profession: "UI/UX Designer",
    students: "2400 Students",
    image: icons.instructor,
  },
  {
    name: "Ronald Richards",
    profession: "UI/UX Designer",
    students: "2400 Students",
    image: icons.instructor,
  },
];

const TopInstructors = () => {
  return (
    <section id="intructor" className="py-10 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Instructors</h2>
          <a href="#" className="text-blue-500">
            See All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <img
                src={instructor.image}
                alt="Instructor"
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{instructor.name}</h3>
              <p className="text-gray-500">{instructor.profession}</p>

              <p className="text-gray-700">{instructor.students}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;

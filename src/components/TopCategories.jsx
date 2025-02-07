import icons from "../assets/Icon";

const categories = [
  { title: "Astrology", courses: 11, icon: icons.astronant },
  { title: "Development", courses: 12, icon: icons.devlop },
  { title: "Marketing", courses: 12, icon: icons.marketing },
  { title: "Physics", courses: 14, icon: icons.Physics },
];

const TopCategories = () => {
  return (
    <section className="py-10 p-4">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Categories</h2>
          <a href="#" className="text-blue-500">
            See All
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 py-10 p-6 rounded-lg text-center shadow-md"
            >
              <div className="mb-4 w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <img
                  src={category.icon}
                  alt={category.title}
                  className="w-15  object-cover  mx-auto"
                ></img>
              </div>
              <p className="font-semibold">{category.title}</p>
              <p className="text-gray-500">{category.courses} Courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;

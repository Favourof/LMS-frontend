import { FaUserCircle } from "react-icons/fa";

const Reviews = ({ review }) => {
  if (!review || review.length === 0) return <p>No review enrolled yet.</p>;
  console.log(review);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Enrolled review</h2>
      <ul className="mt-4 space-y-2">
        {review.map((student) => (
          <li
            key={student._id}
            className="flex items-center gap-4 bg-black-100 p-3 rounded"
          >
            <FaUserCircle size={30} className="text-black" />
            <div>
              <h3 className="text-lg font-semibold">{student.user.name}</h3>
              <span className="text-gray-500">{student.comment}</span>
              <span className="text-gray-500" ml-10> Rating: {student.rating}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;

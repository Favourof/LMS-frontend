import { FaUserCircle } from "react-icons/fa";

const EnrolledStudents = ({ students }) => {
  if (!students || students.length === 0)
    return <p>No students enrolled yet.</p>;
  console.log(students);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Enrolled Students</h2>
      <ul className="mt-4 space-y-2">
        {students.map((student) => (
          <li
            key={student._id}
            className="flex items-center gap-4 bg-gray-100 p-3 rounded"
          >
            <FaUserCircle size={30} className="text-white" />
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-gray-500">{student.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledStudents;

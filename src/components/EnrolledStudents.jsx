const EnrolledStudents = ({ students }) => {
  if (!students || students.length === 0)
    return <p>No students enrolled yet.</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Enrolled Students</h2>
      <ul className="mt-4 space-y-2">
        {students.map((student) => (
          <li
            key={student._id}
            className="flex items-center gap-4 bg-gray-100 p-3 rounded"
          >
            <img
              src={student.profileImage || "/assets/default-user.jpg"}
              className="w-10 h-10 rounded-full"
              alt={student.name}
            />
            <div>
              <h3 className="text-lg font-semibold">
                {student.firstname} {student.lastname}
              </h3>
              <p className="text-gray-500">{student.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledStudents;

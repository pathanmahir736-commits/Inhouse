export default function CourseTable({ courses, onEdit, onDelete }) {
  if (courses.length === 0) {
    return (
      <p className="text-gray-500">
        No courses added yet.
      </p>
    );
  }

  return (
    <table className="w-full bg-white rounded shadow-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-3">Course</th>
          <th className="p-3">Degree</th>
          <th className="p-3">Duration</th>
          <th className="p-3">Seats</th>
          <th className="p-3">Fee</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {courses.map(course => (
          <tr key={course.id} className="border-b">
            <td className="p-3">{course.name}</td>
            <td className="p-3">{course.degreeType}</td>
            <td className="p-3">{course.duration}</td>
            <td className="p-3">
              {course.totalSeats - course.filledSeats} /{" "}
              {course.totalSeats}
            </td>
            <td className="p-3">
              ₹ {course.totalFee}
            </td>

            <td className="p-3 flex gap-3">
              <button
                className="text-blue-600 text-sm"
                onClick={() => onEdit(course)}
              >
                Edit
              </button>

              <button
                className="text-red-600 text-sm"
                onClick={() => onDelete(course)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

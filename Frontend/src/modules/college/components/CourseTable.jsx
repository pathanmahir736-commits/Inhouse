import SeatProgress from "./SeatProgress";

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {/* MOBILE VIEW */}
      <div className="block md:hidden space-y-4">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded shadow p-4 space-y-3"
          >
            <div>
              <h3 className="font-medium">{course.name}</h3>
            </div>

            <SeatProgress
              total={course.totalSeats}
              filled={course.filledSeats}
            />

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(course)}
                className="flex-1 border rounded py-1 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(course)}
                className="flex-1 border border-red-300 text-red-600 rounded py-1 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
        <table className="w-full bg-white rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Course</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-b">
                <td className="p-3 font-medium">
                  {course.name}
                </td>

                <td className="p-3">
                  <SeatProgress
                    total={course.totalSeats}
                    filled={course.filledSeats}
                  />
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => onEdit(course)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(course)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

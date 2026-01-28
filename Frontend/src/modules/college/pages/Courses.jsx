import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const [semesters, setSemesters] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);

const confirmDelete = async () => {
  if (!deleteCourse) return;

  setDeleteLoading(true);

  try {
    const res = await fetch(
      `http://localhost:5000/api/courses/${deleteCourse._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete course");
      setDeleteLoading(false);
      return;
    }
 
    setDeleteCourse(null);
    setDeleteLoading(false);
    loadCourses();
  } catch {
    alert("Server error");
    setDeleteLoading(false);
  }
};


  const token = localStorage.getItem("token");

  const loadCourses = () => {
    fetch("http://localhost:5000/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setCourses);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // 🔥 OPEN EDIT MODAL
  const openEditModal = course => {
    setEditingCourse(course);
    setName(course.name);
    setFees(course.fee);
    setSemesters(course.semesters);
    setTotalSeats(course.totalSeats);
    setShowForm(true);
  };

  // 🔥 CREATE / UPDATE COURSE
  const submitCourse = async e => {
    e.preventDefault();

    const isEdit = Boolean(editingCourse);

    const url = isEdit
      ? `http://localhost:5000/api/courses/${editingCourse._id}`
      : "http://localhost:5000/api/courses";

    const method = isEdit ? "PATCH" : "POST";

    try {
      if (Number(semesters) <= 0) {
  alert("Semesters must be at least 1");
  return;
}

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
  name,
  fees: Number(fees),
  semesters: Number(semesters),
  totalSeats: Number(totalSeats),
}),

      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to save course");
        return;
      }

      // reset
      setName("");
      setFees("");
      setSemesters("");
      setTotalSeats("");
      setEditingCourse(null);
      setShowForm(false);
      loadCourses();
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage programs, fees and seat availability
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            setName("");
            setFees("");
            setSemesters("");
            setTotalSeats("");
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Course
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingCourse(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h3>

            <form onSubmit={submitCourse} className="space-y-4">
              <input
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Course name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />

              <input
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Total seats"
                type="number"
                value={totalSeats}
                onChange={e => setTotalSeats(e.target.value)}
                required
              />
              <input
  className="w-full border rounded-lg px-4 py-2"
  placeholder="Number of semesters"
  type="number"
  value={semesters}
  onChange={e => setSemesters(e.target.value)}
  required
/>

              <input
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Fee amount (₹)"
                type="number"
                value={fees}
                onChange={e => setFees(e.target.value)}
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {editingCourse ? "Update Course" : "Save Course"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* COURSE CARDS */}
      {courses.length === 0 ? (
        <p className="text-gray-500 text-sm">No courses added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            const isFull = course.availableSeats === 0;
            const filled = course.totalSeats - course.availableSeats;
            const percent =
              Math.round((filled / course.totalSeats) * 100) || 0;
               const hasAdmissions =  
    course.totalSeats !== course.availableSeats;

            return (
              <div
                key={course._id}
                className={`relative bg-white rounded-2xl  p-6 transition ${
                  isFull ? "opacity-70" : "hover:shadow-xl"
                }`}
              >
                <span
                  className={`absolute top-4 right-4 text-xs px-3  py-1 rounded-full ${
                    isFull
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isFull ? "Seats Full" : "Active"}
                </span>

                <h4 className="text-xl font-semibold">{course.name}</h4>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  ₹{course.fees.toLocaleString()}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Seats</span>
                    <span>
                      {filled}/{course.totalSeats}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className={`h-2 rounded ${
                        isFull ? "bg-red-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

               <div className="mt-5 flex justify-between">
  <button
  onClick={() => openEditModal(course)}
  disabled={isFull}
  className={`text-sm ${
    isFull
      ? "text-gray-400 cursor-not-allowed"
      : "text-blue-600 hover:underline"
  }`}
>
  Edit
</button>


<button
  onClick={() => !isFull && setDeleteCourse(course)}
  disabled={isFull}
  className={`text-sm ${
    isFull
      ? "text-gray-400 cursor-not-allowed"
      : "text-red-600 hover:underline"
  }`}
>
  Delete
</button>


</div>

              </div>
            );
          })}
        </div>
      )}
      {deleteCourse && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Delete Course
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Are you sure you want to delete{" "}
        <strong>{deleteCourse.name}</strong>?
        <br />
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setDeleteCourse(null)}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          disabled={deleteLoading}
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          disabled={deleteLoading}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

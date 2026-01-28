import { useEffect, useState } from "react";

export default function CourseModal({ onClose, onSave, course }) {
  const [form, setForm] = useState({
    name: "",
    degreeType: "",
    seat:"",
    duration: "",
    totalSeats: "",
    totalFee: "",
    semesterFees: [],
  });

  const [showFees, setShowFees] = useState(false);

  useEffect(() => {
    if (course) {
      setForm(course);
    }
  }, [course]);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function generateSemesters(duration, totalFee) {
    if (!duration || !totalFee) return;

    let semesters = duration.includes("Year")
      ? parseInt(duration) * 2
      : parseInt(duration);

    if (!semesters) return;

    const perSemesterFee = Math.floor(totalFee / semesters);

    const fees = Array.from({ length: semesters }, (_, i) => ({
      semester: i + 1,
      amount: perSemesterFee,
    }));

    setForm(prev => ({
      ...prev,
      semesterFees: fees,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded flex flex-col max-h-[85vh]"
      >
        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            {course ? "Edit Course" : "Add Course"}
          </h2>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="degreeType"
            value={form.degreeType}
            onChange={handleChange}
            placeholder="Degree / Diploma"
            className="w-full border p-2 rounded"
          />
          <input
            name="Seat"
            value={form.seat}
            onChange={handleChange}
            placeholder="Seat"
            className="w-full border p-2 rounded"
          />
          <input
            name="duration"
            value={form.duration}
            onChange={e => {
              handleChange(e);
              generateSemesters(e.target.value, form.totalFee);
            }}
            placeholder="Duration (e.g. 4 Years)"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="totalFee"
            value={form.totalFee}
            onChange={e => {
              handleChange(e);
              generateSemesters(form.duration, e.target.value);
            }}
            placeholder="Total Fee"
            className="w-full border p-2 rounded"
          />

          {/* TOGGLE BUTTON */}
          {form.semesterFees.length > 0 && (
            <button
              type="button"
              onClick={() => setShowFees(!showFees)}
              className="text-sm text-blue-600"
            >
              {showFees ? "Hide Semester Fees" : "View Semester Fees"}
            </button>
          )}

          {/* SEMESTER FEES */}
          {showFees && (
            <div className="border rounded p-3 space-y-2">
              <p className="text-sm font-medium mb-2">
                Semester-wise Fee
              </p>

              {form.semesterFees.map((s, i) => (
                <div key={s.semester} className="flex items-center gap-2">
                  <span className="text-sm w-24">
                    Sem {s.semester}
                  </span>

                  <input
                    type="number"
                    value={s.amount}
                    onChange={e => {
                      const updated = [...form.semesterFees];
                      updated[i].amount = Number(e.target.value);
                      setForm(prev => ({
                        ...prev,
                        semesterFees: updated,
                      }));
                    }}
                    className="flex-1 border p-1 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FIXED FOOTER */}
        <div className="p-4 border-t flex justify-end gap-2 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

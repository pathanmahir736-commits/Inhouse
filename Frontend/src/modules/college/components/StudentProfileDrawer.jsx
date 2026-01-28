export default function StudentProfileDrawer({ admission, onClose }) {
  if (!admission) return null;

  const profile = admission.studentProfile || {};

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-md bg-white p-6 shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Student Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{admission.studentName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{admission.email}</p>
          </div>

          <hr />

          <div>
            <p className="text-gray-500">10th Marks</p>
            <p className="font-medium">{profile.tenthMarks ?? "Not provided"}</p>
          </div>

          <div>
            <p className="text-gray-500">12th Marks</p>
            <p className="font-medium">{profile.twelfthMarks ?? "Not provided"}</p>
          </div>

          <div>
            <p className="text-gray-500">School</p>
            <p className="font-medium">{profile.schoolName ?? "Not provided"}</p>
          </div>

          <div>
            <p className="text-gray-500">Board</p>
            <p className="font-medium">{profile.board ?? "Not provided"}</p>
          </div>

          <div>
            <p className="text-gray-500">Year of Passing</p>
            <p className="font-medium">{profile.yearOfPassing ?? "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

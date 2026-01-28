import AdmissionRow from "./AdmissionRow";

export default function AdmissionTable({
  admissions = [],
  courses = [],
  collegeStatus,
  onConfirm,
}) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Fee</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {admissions.map(admission => (
            <AdmissionRow
              key={admission.id}
              admission={admission}
              courses={courses}
              collegeStatus={collegeStatus}
              onConfirm={onConfirm}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

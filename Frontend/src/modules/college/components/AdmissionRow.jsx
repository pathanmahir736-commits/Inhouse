import StatusBadge from "./StatusBadge";
import AdmissionActions from "./AdmissionActions";

export default function AdmissionRow({
  admission,
  courses,
  collegeStatus,
  onApprove,
  onReject,
  onConfirm,
  mobile = false,
}) {
  const course = courses?.find(
    c => c.id === admission.course.id
  );

  const seatsLeft = course
    ? course.totalSeats - course.filledSeats
    : 0;

  if (mobile) {
    return (
      <div className="border rounded p-3 space-y-2">
        <div>
          <p className="font-medium">
            {admission.student.name}
          </p>
          <p className="text-xs text-gray-500">
            {admission.student.email}
          </p>
        </div>

        <div className="text-sm">
          {admission.course.name}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            ₹ {admission.fee.toLocaleString()}
          </span>
          <StatusBadge status={admission.status} />
        </div>

        <AdmissionActions
          admission={admission}
          seatsLeft={seatsLeft}
          collegeStatus={collegeStatus}
          onApprove={onApprove}
          onReject={onReject}
          onConfirm={onConfirm}
        />
      </div>
    );
  }

  return (
    <tr className="border-b">
      <td className="p-3">
        <div className="font-medium">
          {admission.student.name}
        </div>
        <div className="text-xs text-gray-500">
          {admission.student.email}
        </div>
      </td>

      <td className="p-3">
        {admission.course.name}
      </td>

      <td className="p-3">
        ₹ {admission.fee.toLocaleString()}
      </td>

      <td className="p-3">
        <StatusBadge status={admission.status} />
      </td>

      <td className="p-3">
        <AdmissionActions
          admission={admission}
          seatsLeft={seatsLeft}
          collegeStatus={collegeStatus}
          onApprove={onApprove}
          onReject={onReject}
          onConfirm={onConfirm}
        />
      </td>
    </tr>
  );
}

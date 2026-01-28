export default function AdmissionActions({
  admission,
  collegeStatus,
  seatsLeft = 0,
  onApprove,
  onReject,
  onConfirm,
}) {
  if (collegeStatus !== "APPROVED") {
    return (
      <span className="text-xs text-gray-400">
        Locked
      </span>
    );
  }

  if (admission.status === "confirmed") {
    return (
      <span className="text-green-600 text-sm font-medium">
        Confirmed
      </span>
    );
  }

  if (admission.status === "rejected") {
    return (
      <span className="text-red-600 text-sm font-medium">
        Rejected
      </span>
    );
  }

  if (admission.status === "pending") {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onApprove(admission.id)}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(admission.id)}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Reject
        </button>
      </div>
    );
  }

  if (
    admission.status === "approved" &&
    admission.paymentStatus === "paid"
  ) {
    const disabled = seatsLeft <= 0;

    return (
      <button
        disabled={disabled}
        onClick={() => onConfirm(admission.id)}
        title={disabled ? "No seats available" : ""}
        className={`px-3 py-1 rounded text-sm transition ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {disabled ? "No seats left" : "Confirm Admission"}
      </button>
    );
  }

  return (
    <span className="text-sm text-gray-500">
      Waiting for payment
    </span>
  );
}

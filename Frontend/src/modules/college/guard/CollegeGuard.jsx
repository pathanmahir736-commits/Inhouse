export default function CollegeGuard({ status, children }) {
  if (status === "PENDING") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">
            College Approval Pending
          </h2>
          <p className="text-sm text-gray-600">
            Your college is under admin review.
            You’ll get full access once approved.
          </p>
        </div>
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Application Rejected
          </h2>
          <p className="text-sm text-gray-600">
            Please contact support for clarification.
          </p>
        </div>
      </div>
    );
  }

  return children; // APPROVED
}

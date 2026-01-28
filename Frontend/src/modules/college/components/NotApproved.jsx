export default function NotApproved() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-semibold">
          Account not activated
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Your college account will be created after admin approval.
          You will receive login credentials via email.
        </p>
      </div>
    </div>
  );
}

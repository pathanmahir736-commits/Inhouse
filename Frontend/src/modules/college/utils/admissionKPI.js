export function calculateAdmissionKPIs(admissions = []) {
  const totalAdmissions = admissions.length;

  const confirmedAdmissions = admissions.filter(
    a => a.status === "confirmed"
  ).length;

  const totalPaidAmount = admissions
    .filter(a => a.paymentStatus === "paid")
    .reduce((sum, a) => sum + (a.fee || 0), 0);

  const pendingPayments = admissions.filter(
    a => a.paymentStatus !== "paid"
  ).length;

  return {
    totalAdmissions,
    confirmedAdmissions,
    totalPaidAmount,
    pendingPayments,
  };
}

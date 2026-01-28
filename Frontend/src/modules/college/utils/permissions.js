export function canApproveAdmission(status) {
  return status === "APPROVED";
}

export function canEditCourses(status) {
  return status === "APPROVED";
}

export function canDeleteCourses(status) {
  return status === "APPROVED";
}

export function canConfirmAdmission(status) {
  return status === "APPROVED";
}

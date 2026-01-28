export function getSeatsLeft(courseId, courses = []) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;

  return course.totalSeats - course.filledSeats;
}

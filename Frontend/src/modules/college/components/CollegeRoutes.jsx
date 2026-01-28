import CollegeRouteGuard from "./CollegeRouteGuard";
import Admissions from "./pages/Admissions";

export default function CollegeRoutes() {
  return (
    <CollegeRouteGuard>
      <Admissions />
    </CollegeRouteGuard>
  );
}

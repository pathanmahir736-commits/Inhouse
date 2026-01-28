import { useState } from "react";
import VisitCard from "../components/VisitCard";

export default function Visits() {
  const [visits, setVisits] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      course: "B.Tech CSE",
      slot: "Mon 11 AM",
      status: "PENDING",
      coordinator: "Mr. Verma"
    },
    {
      id: 2,
      studentName: "Anjali Patel",
      course: "MBA",
      slot: "Wed 2 PM",
      status: "APPROVED",
      coordinator: "Ms. Neha"
    }
  ]);

  function approveVisit(visit) {
    setVisits(prev =>
      prev.map(v =>
        v.id === visit.id
          ? { ...v, status: "APPROVED" }
          : v
      )
    );
  }

  function rejectVisit(visit) {
    setVisits(prev =>
      prev.map(v =>
        v.id === visit.id
          ? { ...v, status: "REJECTED" }
          : v
      )
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Physical Visit Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visits.map(visit => (
          <VisitCard
            key={visit.id}
            visit={visit}
            onApprove={approveVisit}
            onReject={rejectVisit}
          />
        ))}
      </div>
    </div>
  );
}

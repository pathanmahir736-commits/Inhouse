// later: replace BASE_URL with env
const BASE_URL = "http://localhost:5000/api";

export async function fetchAdmissions() {
  // MOCK for now
  return [
    {
      id: "A1",
      student: { name: "Rahul Sharma", email: "rahul@gmail.com" },
      course: { id: "C001", name: "B.Tech Computer Engineering" },
      fee: 120000,
      status: "pending",
    },
  ];

  // REAL API (uncomment later)
  // const res = await fetch(`${BASE_URL}/admissions`);
  // return res.json();
}

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      appointmentId: "A1234",
      memberId: "M001",
      date: "2024-03-15",
      time: "10:00 AM",
      reasonForVisit: "Wellness Checkup",
      status: "Completed",
    },
    {
      appointmentId: "B5678",
      memberId: "M002",
      date: "2024-03-18",
      time: "1:30 PM",
      reasonForVisit: "Vaccination Booster",
      status: "Scheduled",
    },
    {
      appointmentId: "C9101",
      memberId: "M003",
      date: "2024-03-22",
      time: "3:00 PM",
      reasonForVisit: "Dental Cleaning",
      status: "Pending",
    },
    // ...
  ];
}

export default function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Appointment
      </h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

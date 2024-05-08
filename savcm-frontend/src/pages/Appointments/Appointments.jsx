import { getAppointments } from "@/lib/supabase/appointment-service";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Appointments() {
  const [data, setData] = useState([]);

  const getData = async () => {
    // use function getMembers() from src/lib/supabase/members.jsx
    const appointments = await getAppointments();
    // only parse and set data when it returns a non-empty response
    if (appointments && appointments !== "") {
      const parsedAppointments = JSON.parse(appointments);
      // in each member object, convert the created_at field to a human-readable date
      parsedAppointments.forEach((appointment) => {
        if (appointment.created_at) {
          const date = new Date(appointment.created_at);
          appointment.created_at = date.toDateString();
        }
      });
      setData(parsedAppointments);
      // console.log(parsedMembers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Appointments
      </h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

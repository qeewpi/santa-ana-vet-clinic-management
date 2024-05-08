import { useEffect, useState } from "react";
import { columns } from "./staff-columns";
import { StaffDataTable } from "./staff-data-table";
import { Lasso } from "lucide-react";
async function getData() {
  // Fetch data from your API here.
  return [
    {
      veterinarianId: "1",
      firstName: "John",
      lastName: "Doe",
      specialization: "General Practice",
    },
    {
      veterinarianId: "2",
      firstName: "Jane",
      lastName: "Smith",
      specialization: "Dentistry",
    },
    {
      veterinarianId: "3",
      firstName: "Alice",
      lastName: "Johnson",
      specialization: "Surgery",
    },

    // ...
  ];
}

export default function Staff() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Staff
      </h2>
      <StaffDataTable columns={columns} data={data} />
    </div>
  );
}

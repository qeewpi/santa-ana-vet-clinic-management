import { useEffect, useState } from "react";
import { columns } from "./medications-columns";
import { MedicationsDataTable } from "./medications-data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      medicationId: "1",
      name: "Amoxicillin",
      description: "Monthly preventative",
      unitPrice: "5.00",
      dosageForm: "Chewable",
    },

    // ...
  ];
}

export default function Medications() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Medications
      </h2>
      <MedicationsDataTable columns={columns} data={data} />
    </div>
  );
}

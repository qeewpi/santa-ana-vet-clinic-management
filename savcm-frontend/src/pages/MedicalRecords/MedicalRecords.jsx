import { useEffect, useState } from "react";
import { columns } from "./medicalrecords-columns";
import { MedicalRecordsDataTable } from "./medicalrecords-data-table";
import { record } from "zod";
async function getData() {
  // Fetch data from your API here.
  return [
    {
      recordId: "R1234",
      petId: "P001",
      appointmentId: "A1234",
      visitnotes: "Buddy is a very good dog",
      diagnosis: "Healthy",
      medicationsAdministered: "None",
      serviceProvided: "Annual Checkup",
    },
    {
      recordId: "R5678",
      petId: "P002",
      appointmentId: "B5678",
      visitnotes: "Rover is a very good dog",
      diagnosis: "Healthy",
      medicationsAdministered: "None",
      serviceProvided: "Annual Checkup",
    },
    {
      recordId: "R9101",
      petId: "P003",
      appointmentId: "C9101",
      visitnotes: "Morgana is a very good cat",
      diagnosis: "Healthy",
      medicationsAdministered: "None",
      serviceProvided: "Annual Checkup",
    },
    // ...
  ];
}

export default function MedicalRecords() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Medical Records
      </h2>
      <MedicalRecordsDataTable columns={columns} data={data} />
    </div>
  );
}

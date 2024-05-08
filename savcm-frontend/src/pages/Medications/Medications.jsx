import { useEffect, useState } from "react";
import { columns } from "./medications-columns";
import { MedicationsDataTable } from "./medications-data-table";
import { getMedications } from "@/lib/supabase/medications-service";

export default function Medications() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const medications = await getMedications();
    // only parse and set data when it returns a non-empty response
    if (medications && medications !== "") {
      const parsedMedications = JSON.parse(medications);
      [parsedMedications].forEach((medication) => {
        if (medication.birthdate && medication.created_at) {
          medication.birthdate = new Date(medication.birthdate).toDateString();
          medication.created_at = new Date(
            medication.created_at
          ).toDateString();
        }
      });
      setData(parsedMedications);
    }
  };

  useEffect(() => {
    // Call getData directly here, no need for async arrow function
    getData();
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

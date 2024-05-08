import { getVeterinarians } from "@/lib/supabase/veterinarian-service";
import { useEffect, useState } from "react";
import { columns } from "./staff-columns";
import { StaffDataTable } from "./staff-data-table";

export default function Staff() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const veterinarians = await getVeterinarians();
    // only parse and set data when it returns a non-empty response
    if (veterinarians && veterinarians !== "") {
      const parsedVeterinarians = JSON.parse(veterinarians);
      parsedVeterinarians.forEach((veterinarian) => {
        if (veterinarian.birthdate && veterinarian.created_at) {
          veterinarian.birthdate = new Date(
            veterinarian.birthdate
          ).toDateString();
          veterinarian.created_at = new Date(
            veterinarian.created_at
          ).toDateString();
        }
      });
      setData(parsedVeterinarians);
    }
  };

  useEffect(() => {
    // Call getData directly here, no need for async arrow function
    getData();
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Veterinarian
      </h2>
      <StaffDataTable
        columns={columns(getData, data)}
        data={data}
        getData={getData}
      />
    </div>
  );
}

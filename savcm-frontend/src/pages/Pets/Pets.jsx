import { getPets } from "@/lib/supabase/pet-service";
import { getUserSession } from "@/lib/supabase/session";
import { useEffect, useState } from "react";
import { columns } from "./pet-columns";
import { PetDataTable } from "./pet-data-table";

export default function Pets() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const session = await getUserSession();
        // console.log("User session:", session);
        setRole(session.role);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  const getData = async () => {
    const pets = await getPets();
    // only parse and set data when it returns a non-empty response
    if (pets && pets !== "") {
      const parsedPets = JSON.parse(pets);
      parsedPets.forEach((pet) => {
        if (pet.birthdate && pet.created_at) {
          pet.birthdate = new Date(pet.birthdate).toDateString();
          pet.created_at = new Date(pet.created_at).toDateString();
        }
      });
      setData(parsedPets);
    }
  };

  useEffect(() => {
    // Call getData directly here, no need for async arrow function
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or replace with a loading spinner
  }

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Pets
      </h2>
      <PetDataTable
        columns={columns(getData, data, role)}
        data={data}
        getData={getData}
        role={role}
      />
    </div>
  );
}

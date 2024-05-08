import { getServices } from "@/lib/supabase/services-service";
import { useEffect, useState } from "react";
import { columns } from "./service-columns";
import { ServiceDataTable } from "./service-data-table";

export default function Services() {
  const [data, setData] = useState([]);

  const getData = async () => {
    // use function getMembers() from src/lib/supabase/members.jsx
    const services = await getServices();
    // only parse and set data when it returns a non-empty response
    if (services && services !== "") {
      const parsedServices = JSON.parse(services);
      // in each member object, convert the created_at field to a human-readable date
      parsedServices.forEach((service) => {
        if (service.created_at) {
          const date = new Date(service.created_at);
          service.created_at = date.toDateString();
        }
      });
      setData(parsedServices);
      // console.log(parsedMembers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Services
      </h2>
      <ServiceDataTable columns={columns} data={data} />
    </div>
  );
}

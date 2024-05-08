import { useEffect, useState } from "react";
import { columns } from "./service-columns";
import { ServiceDataTable } from "./service-data-table";
async function getData() {
  // Fetch data from your API here.
  return [
    {
      serviceId: "1",
      name: "Consultation",
      description: "Initial consultation",
    },
    {
      serviceId: "2",
      name: "Vaccination",
      description: "Vaccination",
    },
    {
      serviceId: "3",
      name: "Surgery",
      description: "Surgery",
    },

    // ...
  ];
}

export default function Services() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
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

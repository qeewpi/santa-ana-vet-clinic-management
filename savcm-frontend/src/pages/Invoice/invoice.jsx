import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import InvoiceComputation from "./invoice-computation";
import { getInvoices } from "@/lib/supabase/invoice-service";

export default function Invoice() {
  const [data, setData] = useState([]);

  const getData = async () => {
    // use function getMembers() from src/lib/supabase/members.jsx
    const invoices = await getInvoices();
    // only parse and set data when it returns a non-empty response
    if (invoices && invoices !== "") {
      const parsedInvoices = JSON.parse(invoices);
      // in each member object, convert the created_at field to a human-readable date
      parsedInvoices.forEach((invoice) => {
        if (invoice.created_at) {
          const date = new Date(invoice.created_at);
          invoice.created_at = date.toDateString();
        }
      });
      setData(parsedInvoices);
      // console.log(parsedMembers);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Invoice
      </h2>
      <DataTable
        columns={columns(getData, data)}
        data={data}
        getData={getData}
      />

      <InvoiceComputation className="" />
    </div>
  );
}

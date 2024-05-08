import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import InvoiceComputation from "./invoice-computation";
async function getData() {
  return [
    {
      invoiceId: "1234",
      appointmentId: "A1234",
      memberId: "M001",
      date: "2024-03-15",
      totalAmount: "$100.00",
      paymentStatus: "Completed",
    },
    {
      invoiceId: "1235",
      appointmentId: "B1234",
      memberId: "M002",
      date: "2024-03-15",
      totalAmount: "$100.00",
      paymentStatus: "Completed",
    },
    {
      invoiceId: "1236",
      appointmentId: "C1234",
      memberId: "M003",
      date: "2024-03-15",
      totalAmount: "$100.00",
      paymentStatus: "Pending",
    },
  ];
}

export default function Invoice() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Invoice
      </h2>
      <DataTable columns={columns} data={data} />

      <InvoiceComputation className="" />
    </div>
  );
}

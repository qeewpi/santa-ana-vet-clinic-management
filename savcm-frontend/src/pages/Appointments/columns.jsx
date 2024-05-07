"use client";

import { Delete, Edit, Eye } from "lucide-react";

export const columns = [
  {
    accessorKey: "appointmentId",
    header: "ID",
  },
  {
    accessorKey: "memberId",
    header: "Member",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "reasonForVisit",
    header: "Reason for Visit",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex flex-row gap-2">
          <Eye className="h-5 w-5" />
          <Edit className="h-5 w-5" />
          <Delete className="h-5 w-5" />
        </div>
      );
    },
  },

  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
];

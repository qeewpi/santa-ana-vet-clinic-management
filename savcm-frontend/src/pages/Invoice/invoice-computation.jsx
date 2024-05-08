import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const InvoiceComputation = () => {
  const [rows, setRows] = useState([
    {
      type: "",
      description: "",
      quantity: "",
      rate: "",
      totalPrice: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        type: "",
        description: "",
        quantity: "",
        rate: "",
        totalPrice: "",
      },
    ]);
  };

  return (
    <div className="min-w-full min-h-screen ">
      <div className="flex "></div>
      <Card className="">
        <CardHeader>
          <CardTitle>Invoice Computation</CardTitle>
          <CardDescription>Calculation</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-10">
          <div className="grid grid-cols-5 gap-2">
            <h1 className="font-bold text-lg">Type</h1>
            <h1 className="font-bold text-lg">Description</h1>
            <h1 className="font-bold text-lg">Quantity</h1>
            <h1 className="font-bold text-lg">Rate</h1>
            <h1 className="font-bold text-lg">Total Price</h1>
          </div>

          {rows.map((row, index) => (
            <div key={index} className="flex space-x-4 pb-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="apple">Medication</SelectItem>
                    <SelectItem value="banana">Service</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input className="flex-1" type="text" placeholder="Description" />
              <Input className="flex-1" type="number" placeholder="Quantity" />
              <Input className="flex-1" type="number" placeholder="Rate" />
              <Input
                className="flex-1"
                type="number"
                placeholder="Total Price"
              />
            </div>
          ))}

          <Button onClick={addRow} className="mt-4  px-4 py-2">
            Add Row
          </Button>
        </CardContent>{" "}
        <Separator />
        <CardFooter>
          <Button className="mx-4 my-4 w-1/4">Calculate</Button>{" "}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvoiceComputation;

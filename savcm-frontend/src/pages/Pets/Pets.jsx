import { useState, useEffect } from 'react'
import { PetDataTable } from "./pet-data-table";
import { columns } from './pet-columns';
async function getData() {
  // Fetch data from your API here.
  return [
    {
      appointmentId: "A1234",
      memberId: "M001",
      name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      color: "Golden",
      birthdate: "2018-01-01",
    },
    {
      appointmentId: "B5678",
      memberId: "M002",
      name: "Rover",
      species: "Dog",
      breed: "German Shepard",
      color: "black/brown",
      birthdate: "2019-01-01",
    },
    {
      appointmentId: "C9101",
      memberId: "M003",
      name: "Morgana",
      species: "Cat",
      breed: "Persian",
      color: "Calico",
      birthdate: "2020-01-01",
    },
    // ...
  ];
}

export default function Pets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
      <div className="container mx-auto py-10">
        <PetDataTable columns={columns} data={data} />
      </div>
  )
}
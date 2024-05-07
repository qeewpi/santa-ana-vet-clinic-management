import { getMembers } from "@/lib/supabase/members";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Clients({ role }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    // use function getMembers() from src/lib/supabase/members.jsx
    const members = await getMembers();
    // only parse and set data when it returns a non-empty response
    if (members && members !== "") {
      const parsedMembers = JSON.parse(members);
      // in each member object, convert the created_at field to a human-readable date
      parsedMembers.forEach((member) => {
        if (member.created_at) {
          const date = new Date(member.created_at);
          member.created_at = date.toDateString();
        }
      });
      setData(parsedMembers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

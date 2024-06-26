import { getMembers } from "@/lib/supabase/member-service";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Clients() {
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
      // console.log(parsedMembers);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-w-full px-[2rem] py-[2rem]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Members
      </h2>
      <DataTable
        columns={columns(getData, data)}
        data={data}
        getData={getData}
      />
    </div>
  );
}

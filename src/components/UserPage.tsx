import React, { useEffect, useState } from "react";
import BeforeUserTable from "@/components/BeforeUserTable";
import AfterUserTable from "@/components/AfterUserTable";
import { User } from "./User";
import type { JsonUser } from "./type";

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (res.ok) {
        const fetchedUser = (await res.json()) as JsonUser[];
        const userList = fetchedUser.map(
          (x) => new User(x.id, x.name, x.email, x.phone, x.website),
        );
        setInitialUsers(userList);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  //   return <BeforeUserTable initialUsers={initialUsers} />;
  return <AfterUserTable initialUsers={initialUsers} />;
};

export default UserPage;

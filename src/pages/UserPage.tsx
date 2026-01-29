import React, { useEffect, useState } from "react";
import BeforeUserTable from "@/components/BeforeUserTable";
import AfterUserTable from "@/components/AfterUserTable";
import { User } from "@/domains/User";

interface JsonUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

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

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <AfterUserTable initialUsers={initialUsers} />
    </div>
  );
};

export default UserPage;

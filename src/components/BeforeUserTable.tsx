import { useEffect, useRef, useState } from "react";
import { User } from "./User";
import type { JsonUser } from "./type";

const BeforeUserTable = () => {
  const initialUsers = useRef<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCondition, setFilterCondition] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (res.ok) {
        const fetchedUser = (await res.json()) as JsonUser[];
        const userList = fetchedUser.map(
          (x) => new User(x.id, x.name, x.email, x.phone, x.website),
        );
        initialUsers.current = userList;
        setUsers(userList);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (filterCondition === "") {
      setUsers(initialUsers.current);
      return;
    }

    const filteredUsers = initialUsers.current.filter((x) => {
      const val = filterCondition.toLocaleLowerCase();
      const isPass =
        x.name.toLowerCase().includes(val) ||
        x.email.toLowerCase().includes(val) ||
        x.phone.toLowerCase().includes(val) ||
        x.website.toLowerCase().includes(val);
      return isPass;
    });
    setUsers(filteredUsers);
  }, [filterCondition]);

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  return (
    <div>
      <label htmlFor="filterCondition">検索条件</label>
      <input
        id="filterCondition"
        type="text"
        onChange={(e) => setFilterCondition(e.target.value)}
        value={filterCondition}
      />
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.phone}</td>
              <td>{x.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeforeUserTable;

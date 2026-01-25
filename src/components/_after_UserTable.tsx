import { useEffect, useRef, useState } from "react";
import { Users } from "./Users";
import { User } from "./User";
import { create } from "./UsersFactory";

const UserTable = () => {
  const usersRef = useRef<Users | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filterCondition, setFilterCondition] = useState<string>("");

  useEffect(() => {
    (async () => {
      usersRef.current = await create();
      setUsers(usersRef.current.initialUsers);
    })();
  }, []);

  useEffect(() => {
    if (!usersRef.current) return;
    const condition = filterCondition.toLocaleLowerCase();
    const filteredUsers = usersRef.current.filterUsers(condition);
    setUsers(filteredUsers);
  }, [filterCondition]);

  return (
    <div>
      <input
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

export default UserTable;

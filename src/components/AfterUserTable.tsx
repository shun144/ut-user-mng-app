import { useEffect, useRef, useState, type FC } from "react";
import { User } from "../domains/User";
import { Users } from "../domains/Users";
// import "./table.css";

interface Props {
  initialUsers: User[];
}

const UserTable: FC<Props> = ({ initialUsers }) => {
  const usersRef = useRef<Users | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filterCondition, setFilterCondition] = useState<string>("");

  useEffect(() => {
    usersRef.current = new Users(initialUsers);
    setUsers(initialUsers);
  }, []);

  useEffect(() => {
    if (!usersRef.current) return;
    const val = filterCondition.toLocaleLowerCase();
    const filteredUsers = usersRef.current.filterUsers(val);
    setUsers(filteredUsers);
  }, [filterCondition]);

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

export default UserTable;

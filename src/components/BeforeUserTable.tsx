import { useEffect, useState, type FC } from "react";
import { User } from "../domains/User";
import "./table.css";

interface Props {
  initialUsers: User[];
}

const BeforeUserTable: FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterCondition, setFilterCondition] = useState<string>("");

  useEffect(() => {
    if (filterCondition === "") {
      setUsers(initialUsers);
      return;
    }
    const val = filterCondition.toLocaleLowerCase();
    const filteredUsers = initialUsers.filter((x) => {
      return (
        x.name.toLowerCase().includes(val) ||
        x.email.toLowerCase().includes(val) ||
        x.phone.toLowerCase().includes(val) ||
        x.website.toLowerCase().includes(val)
      );
    });
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

export default BeforeUserTable;

import { useEffect, useState, type FC } from "react";
import { User } from "@/domains/User";

interface Props {
  initialUsers: User[];
}

type UserWithColor = User & {
  color?: string;
};

const cols = ["name", "email", "phone", "website"] as const;

const BeforeUserTable: FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<UserWithColor[]>([]);
  const [filterCondition, setFilterCondition] = useState<string>("");

  useEffect(() => {
    if (filterCondition === "") {
      setUsers(initialUsers);
      return;
    }
    const keyword = filterCondition.toLocaleLowerCase();
    const filteredUsers: UserWithColor[] = initialUsers.flatMap((x) => {
      if (x.name.toLowerCase().includes(keyword))
        return { ...x, color: "#FFEAEA" };
      if (x.email.toLowerCase().includes(keyword))
        return { ...x, color: "#D3E0F9" };
      if (x.phone.toLowerCase().includes(keyword))
        return { ...x, color: "#D7F8E6" };
      if (x.website.toLowerCase().includes(keyword))
        return { ...x, color: "#FFF0E0" };
      return [];
    });

    setUsers(filteredUsers);
  }, [filterCondition]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-600 text-center">
          ユーザ一覧テーブル
        </h1>

        <div className="flex gap-2 mb-6">
          <label
            htmlFor="filterCondition"
            className="flex items-center text-gray-500 text-md"
          >
            検索条件
          </label>
          <input
            id="filterCondition"
            type="text"
            onChange={(e) => setFilterCondition(e.target.value)}
            value={filterCondition}
            placeholder="キーワード入力"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
          />
        </div>

        <div className="relative overflow-x-auto  shadow-xs rounded-lg border border-gray-300">
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-gray-100 border-b rounded-lg border-gray-300">
              <tr>
                {cols.map((col) => (
                  <th scope="col" key={col} className="px-6 py-3 font-medium ">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  className={`${index === users.length - 1 ? "" : "border-b border-gray-300"}`}
                  style={{ background: user?.color ?? "white" }}
                  key={user.id}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeforeUserTable;

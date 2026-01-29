import { useEffect, useState, type FC } from "react";
import { User } from "@/domains/User";

interface Props {
  initialUsers: User[];
}

const cols = ["name", "email", "phone", "website"] as const;

const BeforeUserTable: FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword === "") {
      setUsers(initialUsers);
      return;
    }
    const setHighlight = (val: string) => {
      return `${val.replace(keyword, `<span style="background:#FFB3BF;">${keyword}</span>`)}`;
    };

    const filteredUsers: User[] = initialUsers.flatMap((x) => {
      let isHit = false;
      let name = x.name;
      let email = x.email;
      let phone = x.phone;
      let website = x.website;
      if (x.name.includes(keyword)) name = setHighlight(x.name);
      isHit = true;
      if (x.email.includes(keyword)) email = setHighlight(x.email);
      isHit = true;
      if (x.phone.includes(keyword)) phone = setHighlight(x.phone);
      isHit = true;
      if (x.website.includes(keyword)) website = setHighlight(x.website);
      isHit = true;

      if (!isHit) return [];
      return { ...x, name, email, phone, website };
    });

    setUsers(filteredUsers);
  }, [keyword]);

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
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
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
                  key={user.id}
                >
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: user.name }}
                  />
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: user.email }}
                  />
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: user.phone }}
                  />
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: user.website }}
                  />
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

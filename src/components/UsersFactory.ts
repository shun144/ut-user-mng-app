import { User } from "./User";
import { Users } from "./Users";
import type { JsonUser } from "./type";

export const create = async (): Promise<Users> => {
  const users = new Users();
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  users.initialUsers = ((await res.json()) as JsonUser[]).map(
    (x) => new User(x.id, x.name, x.email, x.phone, x.website),
  );
  return users;
};

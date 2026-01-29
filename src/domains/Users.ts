import { User } from "./User";

export type UserWithCol = User & {
  col?: string;
};

export class Users {
  initialUsers: User[];

  constructor(initialUsers: User[]) {
    this.initialUsers = initialUsers;
  }

  // filterUsers(filterValue?: string) {
  //   if (!filterValue) return this.initialUsers;

  //   return this.initialUsers.filter(
  //     (x) =>
  //       x.name.toLowerCase().includes(filterValue) ||
  //       x.email.toLowerCase().includes(filterValue) ||
  //       x.phone.toLowerCase().includes(filterValue) ||
  //       x.website.toLowerCase().includes(filterValue),
  //   );
  // }

  filterUsers(keyword?: string): UserWithCol[] {
    if (!keyword) return this.initialUsers;

    const filteredUsers: UserWithCol[] = this.initialUsers.flatMap((x) => {
      if (x.name.toLowerCase().includes(keyword)) return { ...x, col: "name" };
      if (x.email.toLowerCase().includes(keyword))
        return { ...x, col: "email" };
      if (x.phone.toLowerCase().includes(keyword))
        return { ...x, col: "phone" };
      if (x.website.toLowerCase().includes(keyword))
        return { ...x, col: "website" };
      return [];
    });
    return filteredUsers;
  }
}

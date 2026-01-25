import { User } from "./User";

export class Users {
  initialUsers: User[];

  constructor(initialUsers: User[]) {
    this.initialUsers = initialUsers;
  }

  filterUsers(filterValue?: string) {
    if (!filterValue) return this.initialUsers;

    return this.initialUsers.filter(
      (x) =>
        x.name.toLowerCase().includes(filterValue) ||
        x.email.toLowerCase().includes(filterValue) ||
        x.phone.toLowerCase().includes(filterValue) ||
        x.website.toLowerCase().includes(filterValue),
    );
  }
}

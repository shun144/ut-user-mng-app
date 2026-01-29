import { User } from "./User";

export class Users {
  initialUsers: User[];

  constructor(initialUsers: User[]) {
    this.initialUsers = initialUsers;
  }

  #setHighlight(val: string, keyword: string) {
    return `${val.replace(keyword, `<span style="background:#FFB3BF;">${keyword}</span>`)}`;
  }

  filterUsers(keyword?: string) {
    if (!keyword) return this.initialUsers;
    return this.initialUsers.filter(
      (x) =>
        x.name.includes(keyword) ||
        x.email.includes(keyword) ||
        x.phone.includes(keyword) ||
        x.website.includes(keyword),
    );
  }

  filterUsersWithHighlight(keyword?: string) {
    return this.filterUsers(keyword).map((x) => ({
      ...x,
      name: this.#setHighlight(x.name, keyword!),
      email: this.#setHighlight(x.email, keyword!),
      phone: this.#setHighlight(x.phone, keyword!),
      website: this.#setHighlight(x.website, keyword!),
    }));
  }
}

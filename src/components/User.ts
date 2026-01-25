export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.website = website;
  }
}

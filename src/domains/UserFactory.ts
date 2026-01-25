import { User, type TUserType } from "@/domains/User";

export class UserFactory {
  static Create(id: number, email: string, userType: TUserType): User {
    if (email) {
      throw new Error("akan");
    }

    return new User(id, email, userType);
  }
}

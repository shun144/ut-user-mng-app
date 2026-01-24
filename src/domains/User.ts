import {
  UserType,
  GetUserById,
  GetCompany,
  SaveUser,
  SaveCompany,
} from "@/libs/Database";
import { SendEmailChangedMessage } from "@/libs/MessageBus";

export class User {
  static changeEmail(userId: number, newEmail: string) {
    const userData = GetUserById(userId)!;
    const email = userData.email;
    const userType = userData.userType;

    if (email === newEmail) return;

    const companyData = GetCompany();
    const companyDomainName = companyData.domainName;
    const numberOfEmployees = companyData.numberOfEmployees;

    const emailDomain = newEmail.split("@")[1];
    const isEmailCorporate = emailDomain === companyDomainName;

    const newUserType = isEmailCorporate
      ? UserType.Employee
      : UserType.Customer;

    if (userType !== newUserType) {
      const delta = newUserType === UserType.Employee ? 1 : -1;
      const newNumber = numberOfEmployees + delta;

      SaveCompany(newNumber);
    }

    const newUser = {
      id: userId,
      email: newEmail,
      userType: newUserType,
    };

    SaveUser(newUser);
    SendEmailChangedMessage(userId, newEmail);
  }
}

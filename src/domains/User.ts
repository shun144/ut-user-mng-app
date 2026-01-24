export const UserType = {
  Customer: "Customer",
  Employee: "Employee",
  None: "None",
} as const;

export type TUserType = keyof typeof UserType;

// Userクラスは外部プロセス（DBやMessageBusとの通信がなくなった）
export class User {
  id: number;
  email: string;
  userType: TUserType;

  constructor(id: number, email: string, userType: TUserType) {
    this.id = id;
    this.email = email;
    this.userType = userType;
  }

  changeEmail(
    newEmail: string,
    companyDomainName: string,
    numberOfEmployees: number,
  ) {
    if (this.email === newEmail) return numberOfEmployees;

    const emailDomain = newEmail.split("@")[1];
    const isEmailCorporate = emailDomain === companyDomainName;

    const newUserType = isEmailCorporate
      ? UserType.Employee
      : UserType.Customer;

    this.email = newEmail;

    if (this.userType == newUserType) return numberOfEmployees;

    this.userType = newUserType;
    return numberOfEmployees + (newUserType === UserType.Employee ? 1 : -1);
  }
}

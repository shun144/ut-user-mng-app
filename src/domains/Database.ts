import { UserType } from "@/domains/User";

export class Database {
  private _userDataList = [
    { id: 1, email: "one@aaacompany.co.jp", userType: UserType.Employee },
  ];

  private _companyDataList = [
    {
      domainName: "aaacompany.co.jp",
      numberOfEmployees: 10,
    },
  ];

  GetUserById(userId: number) {
    return this._userDataList.find((x) => x.id === userId);
  }

  SaveUser(newUser: any) {
    console.log(newUser);
  }

  GetCompany() {
    return this._companyDataList[0];
  }

  SaveCompany(newNumber: number) {
    console.log(newNumber);
  }
}

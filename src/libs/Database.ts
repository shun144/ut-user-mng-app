import { UserType } from "@/domains/User";

const UserDataList = [
  { id: 1, email: "one@aaacompany.co.jp", userType: UserType.Customer },
];

const CompanyDataList = [
  {
    domainName: "aaacompany.co.jp",
    numberOfEmployees: 10,
  },
];

export const GetUserById = (userId: number) => {
  return UserDataList.find((x) => x.id === userId);
};

export const SaveUser = (newUser: any) => {
  console.log(newUser);
};

export const GetCompany = () => {
  return CompanyDataList[0];
};

export const SaveCompany = (newNumber: number) => {
  console.log(newNumber);
};

import { Database } from "@/domains/Database";
import { MessageBus } from "@/domains/MessageBus";
import { User } from "./User";
import { UserFactory } from "@/domains/UserFactory";

// ドメインモデルとプロセス外依存との連携を指揮するだけ
export class UserController {
  // 協力オブジェクト
  private static _database = new Database();
  private static _messageBus = new MessageBus();

  static changeEmail(userId: number, newEmail: string) {
    const userData = this._database.GetUserById(userId)!;
    const email = userData.email;
    const userType = userData.userType;

    const user = UserFactory.Create(userId, email, userType);

    const companyData = this._database.GetCompany();
    const companyDomainName = companyData.domainName;
    const numberOfEmployees = companyData.numberOfEmployees;

    const newNumberOfEmployees = user.changeEmail(
      newEmail,
      companyDomainName,
      numberOfEmployees,
    );

    this._database.SaveCompany(newNumberOfEmployees);
    this._database.SaveUser(user);
    this._messageBus.SendEmailChangedMessage(userId, newEmail);
  }
}

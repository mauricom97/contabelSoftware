import { CompanyInterface } from "./CompanyInterface";
import { UserInterface } from "./UserInterface";
interface UserCompanyInterface {
  idUser: number;
  idCompany: number;
  permission: number;
  defaultCompany: boolean;
  Company: CompanyInterface;
  User: UserInterface;
}

export { UserCompanyInterface };

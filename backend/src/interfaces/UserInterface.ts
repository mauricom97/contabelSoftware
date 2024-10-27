import { UserCompanyInterface } from "./UserCompanyInterface";
interface UserInterface {
  id: number;
  email: string;
  birthdate: Date;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  UserCompany: UserCompanyInterface[];
}

export { UserInterface };

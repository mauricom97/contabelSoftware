import { BillsToPay } from "./BillsToPayInterface";
import { CompanyEntityInterface } from "./CompanyEntityInterface";
import { UserCompanyInterface } from "./UserCompanyInterface";
interface CompanyInterface {
  id: number;
  sampleName: string;
  registerName: string;
  cnpj: string;
  ie?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  billsToPay: BillsToPay[];
  CompanyEntity: CompanyEntityInterface[];
  UserCompany: UserCompanyInterface[];
  defaultCompany: boolean;
}

export { CompanyInterface };

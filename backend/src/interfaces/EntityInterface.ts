import { SupplierInterface } from "./SupplierInterface";
import { CompanyEntityInterface } from "./CompanyEntityInterface";
import { ClientInterface } from "./ClientInterface";

interface EntityInterface {
  id: number;
  ie?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  cpfCnpj: string;
  registerName: string;
  sampleName: string;
  type: string;
  cep?: string;
  complement?: string;
  neighborhood?: string;
  number?: number;
  observation?: string;
  Client?: ClientInterface;
  CompanyEntity: CompanyEntityInterface[];
  Supplier?: SupplierInterface;
}

export { EntityInterface };

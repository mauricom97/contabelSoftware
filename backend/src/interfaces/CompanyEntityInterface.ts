import { CompanyInterface } from "./CompanyInterface";
import { EntityInterface } from "./EntityInterface";
interface CompanyEntityInterface {
  idCompany: number;
  idEntity: number;
  Company: CompanyInterface;
  Entity: EntityInterface;
}
export { CompanyEntityInterface };

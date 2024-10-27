import { CompanyInterface } from "./CompanyInterface";
import { SupplierInterface } from "./SupplierInterface";
interface BillsToPay {
  id: number;
  description?: string;
  dueDate: Date;
  value: number;
  status: number;
  companyId: number;
  idSupplier: number;
  Company: CompanyInterface;
  Supplier: SupplierInterface;
}
export { BillsToPay };

import { BillsToPay } from "./BillsToPayInterface";
import { EntityInterface } from "./EntityInterface";

interface SupplierInterface {
  idEntity: number;
  BillsToPay: BillsToPay[];
  Entity: EntityInterface;
}

export { SupplierInterface };

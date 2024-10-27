import { Request, Response } from "express";
import * as XLSX from "xlsx";
import path from "path";
import PlanilhaBillsToPay from "../../interfaces/PlanilhaBillsToPayInterface";

export default async (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, "template_importacao.xlsx");
  const dados = readXlsxFile(filePath);
  console.log(dados);
  return;
};

// Função para ler o arquivo XLSX
function readXlsxFile(filePath: string): PlanilhaBillsToPay[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: PlanilhaBillsToPay[] = XLSX.utils.sheet_to_json(sheet);
  return data;
}

// import { uploadFilesDrive } from "../../utils/google/drive/gdrive";
import { Request, Response } from "express";
import path from "path";
// import fs from "fs";
import * as XLSX from "xlsx";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";

const sheetFiles = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }
    const filePath = path.resolve(
      __dirname,
      "../../files/sheets",
      req.file.filename
    );
    const data = readXlsxFile(filePath);
    console.log(data);
    await sendMessages(data);
    return res.send("Arquivo enviado e processado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar o arquivo.");
  }
};

const QUEUE_NAME = "accounts_payable";

interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
}

const readXlsxFile = (filePath: string): AccountPayable[] => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData: AccountPayable[] = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
};

const sendMessages = async (data: AccountPayable[]) => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  data.forEach((account) => {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(account)), {
      persistent: true,
    });
    console.log("Sent:", account);
  });
};

export default sheetFiles;

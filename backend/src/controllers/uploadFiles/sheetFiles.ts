// import { uploadFilesDrive } from "../../utils/google/drive/gdrive";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";
import sendMail from "../../utils/email/services/sendMail";

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
    fs.unlinkSync(filePath);
    const company = req.company;
    await sendMessages(data, company);
    const mailToConfig = {
      userName: req.user.firstname,
      from: '"Jacynthe 👻" <jacynthe.kihn66@ethereal.email>',
      to: req.user.email,
      subject: "Recebemos seu arquivo! 🎉",
      template: "success-import-bills-to-pay"
    };
    await sendMail(mailToConfig)
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
  idCompany: string;
  supplierId: string;
}

const readXlsxFile = (filePath: string): AccountPayable[] => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData: AccountPayable[] = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
};

const sendMessages = async (data: AccountPayable[], company: any) => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  data.forEach((account: any) => {
    account.company = parseInt(company);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(account)), {
      persistent: true,
    });
    console.log("Sent:", account);
  });
};

export default sheetFiles;

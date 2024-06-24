// import { uploadFilesDrive } from "../../utils/google/drive/gdrive";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";

const sheetFiles = async (req: any, res: Response) => {
  const { channel, connection } = await connectRabbitMQ();
  try {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }
    const filePath = path.resolve(
      __dirname,
      "../../files/sheets",
      req.file.filename
    );
    let data = readXlsxFile(filePath);
    fs.unlinkSync(filePath);
    data = data.map((account: any) => {
      account.company = parseInt(req.company);
      account.user = req.user
      return account;
    });
    
    await sendBillsToPayForQueue(data, channel);
    const rabbitmqConfig = {
      channel, 
      connection
    }

    const notificationMessage = {
      type: 'IMPORT_COMPLETE',
      user: req.user
    };


    await sendNotificationToRabbitMQ(rabbitmqConfig, notificationMessage)
    return res.send("Arquivo enviado e processado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar o arquivo.");
  }
  
};
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

const sendBillsToPayForQueue = async (data: AccountPayable[], channel: any) => {
const QUEUE_NAME = "accounts_payable";
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  data.forEach((account: any) => {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(account)), {
      persistent: true,
    });
    console.log("Sent:", account);
  });
};

const sendNotificationToRabbitMQ = async (rabbitmqConfig: any, notificationMessage: any) => {
  const { channel, connection } = rabbitmqConfig;
  const notificationQueue = 'notifications';
  await channel.assertQueue(notificationQueue, {
    durable: true
  });

  channel.sendToQueue(notificationQueue, Buffer.from(JSON.stringify(notificationMessage)), {
    persistent: true
  });

  setTimeout(() => {
    connection.close();
  }, 500)
}

export default sheetFiles;

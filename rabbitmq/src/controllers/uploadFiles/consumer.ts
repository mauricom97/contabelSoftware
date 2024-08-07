import express from "express";
const app = express()
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3988;
import { ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";
import { getCpfCnpj } from "../entity/utils/getCpfCnpj";
import createEntity from "../entity/service/create";
import createSupplier from "../suppliers/service/create"
import createEntityCompany from "../companyEntity/services/create"
import getCompany from "../entity/service/get"
import sendMessage from "../../utils/slack/services/sendMessage"
import sendEmail from "../../utils/email/services/sendMail"
import prisma from "../../middlewares/connPrisma"

const main = async () => {
  try {
    const queue_accounts_payable = "accounts_payable";
    const queue_notifications = "notifications";
    await consumer(queue_accounts_payable);
    await consumer(queue_notifications);
    return;
  } catch (error) {
    console.log(error);
    await sendMessage({ text: `Erro ao importar contas a pagar:\n${JSON.stringify(error)}` }, "bugs");
  }
};

main();

async function consumer(queue_name: string) {
  try {
    const { channel } = await connectRabbitMQ();
    await channel.assertQueue(queue_name, { durable: true });
    channel.consume(queue_name, (msg) => {
      processMessage(msg);
      if (msg) {
        channel.ack(msg);
      }
    });

  } catch (error) {
    throw new Error(`Erro ao consumir a fila ${queue_name}`)
  }
};

const processMessage = async (msg: ConsumeMessage | null) => {
  try {
    if (msg) {
      const content = msg.content.toString();
      let account = JSON.parse(content);
      if (account.type === 'IMPORT_COMPLETE') {
        const mailToConfig = {
          from: process.env.EMAIL_USER,
          to: account.user.email,
          subject: "Importação de contas concluída 🎊🎉",
          userName: account.user.firstname,
          template: "success-upload-file-bills-to-pay"
        }
        await sendEmail(mailToConfig);
      } else {
        account = await formatAccount(account);
        const accountCreated = await prisma.billsToPay.create({
          data: account
        })
      }
    }
  } catch (error) {
    throw new Error("Erro ao processar mensagem na importacao de contas");
  }
};

const formatAccount = async (account: any) => {

  try {
    const statusValues: any = {
      "Em aberto": 1,
      "Parcialmente pago": 2,
      "Pago": 3,
    };

    let entity = await getCompany({ cpfCnpj: account["CPF/CNPJ"].replace(/\D/g, '') });
    let supplier: any = {}
    if (entity) {
      supplier.idEntity = entity.id;
    } else {
      entity = await getCpfCnpj(account["CPF/CNPJ"].replace(/\D/g, ''));
      const entityFormatted = formatEntity(entity);
      const entityCreated = await createEntity(entityFormatted);
      supplier = await createSupplier(entityCreated);
      const entityCompany = {
        idCompany: account.company,
        idEntity: supplier.idEntity
      }
      await createEntityCompany(entityCompany);
    }

    return {
      description: account["DESCRIÇÃO"],
      value: account["VALOR"],
      status: statusValues[account["STATUS"]],
      companyId: account.company,
      idSupplier: supplier.idEntity,
      dueDate: account.dueDate
    };

  } catch (error) {
    throw new Error("Erro ao formatar contas na importacao de contas");
  }

};

function formatEntity(entity: any) {
  try {
    return {
      "ie": "",
      "phone": entity.telefone1,
      "email": entity.email,
      "address": entity.endereco.logradouro,
      "city": entity.endereco.municipio,
      "state": entity.endereco.uf,
      "cpfCnpj": entity.cnpj,
      "registerName": entity.razao_social,
      "sampleName": entity.nome_fantasia ? entity.nome_fantasia : entity.razao_social,
      "type": entity.cnpj > 10 ? "J" : "F",
      "cep": entity.endereco.cep,
      "complement": entity.endereco.complemento,
      "neighborhood": entity.endereco.bairro,
      "number": entity.endereco.numero ? parseInt(entity.endereco.numero) : null,
      "observation": entity.endereco.observacao ? entity.endereco.observacao : ""
    }
  } catch (error) {
    throw new Error("Erro ao formatar entidade na importacao de contas a pagar")
  }
}

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
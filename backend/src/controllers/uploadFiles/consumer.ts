import { Channel, ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";
import { getCpfCnpj } from "../entity/utils/getCpfCnpj";
import createEntity from "../entity/service/create";

import prisma from "../../middlewares/connPrisma"
const QUEUE_NAME = "accounts_payable";

const processMessage = async (msg: ConsumeMessage | null) => {
  if (msg) {
    const content = msg.content.toString();
    let account = JSON.parse(content);
    console.log("Received:", account);
    account = formatAccount(account);
    await prisma.billsToPay.create({
      data: account
    })
  }
};

const formatAccount = async (account: any) => {
  const statusValues: any = {
    "Em aberto": 1,
    "Parcialmente pago": 2,
    "Pago": 3,
  };

  console.log(account["CPF/CNPJ"].replace(/\D/g, ''))

  const entity = await getCpfCnpj(account["CPF/CNPJ"].replace(/\D/g, ''));
  const entityFormatted = formatEntity(entity);
  const entityCreated = await createEntity(entityFormatted);

  return {
    description: account["DESCRIÇÃO"],
    value: account["VALOR"],
    status: statusValues[account["STATUS"]],
    companyId: account.companyId ?? 1,
    idSupplier: account.idSupplier ?? 1,
    dueDate: new Date(account["VENCIMENTO"] ?? new Date()).toISOString()
  };
};

function formatEntity(entity: any) {
  return {
    "ie": "",
    "phone": entity.telefone1,
    "email": entity.email,
    "address": entity.endereco.logradouro,
    "city": entity.endereco.municipio,
    "state": entity.endereco.uf,
    "cpfCnpj": entity.cnpj,
    "registerName": entity.razao_social,
    "sampleName": entity.nome_fantasia,
    "type": entity.cnpj > 10 ? "J" : "F",
    "cep": entity.endereco.cep,
    "complement": entity.endereco.complemento,
    "neighborhood": entity.endereco.bairro,
    "number": entity.endereco.numero,
    "observation": entity.endereco.observacao ? entity.endereco.observacao : ""
  }
}

const main = async () => {
  try {
    const channel: Channel = await connectRabbitMQ();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.consume(QUEUE_NAME, (msg) => {
      processMessage(msg);
      if (msg) {
        channel.ack(msg);
      }
    });
    console.log("Waiting for messages...");
  } catch (error) {
    console.error("Error in consuming messages", error);
  }
};

main();

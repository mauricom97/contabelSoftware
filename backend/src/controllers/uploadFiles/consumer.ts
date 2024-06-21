import { Channel, ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";
import { getCpfCnpj } from "../entity/utils/getCpfCnpj";
import createEntity from "../entity/service/create";
import createSupplier from "../suppliers/service/create"
import createEntityCompany from "../companyEntity/services/create"
import getCompany from "../entity/service/get"
import sendMessage from "../../utils/slack/services/sendMessage"

import prisma from "../../middlewares/connPrisma"
const QUEUE_NAME = "accounts_payable";
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
  } catch (error) {
    await sendMessage({text: `Erro ao consumir a fila ${QUEUE_NAME}`}, "bugs");
    console.error(error);
  }
};

main();

const processMessage = async (msg: ConsumeMessage | null) => {
  try {
    if (msg) {
      const content = msg.content.toString();
      let account = JSON.parse(content);    
      account = await formatAccount(account);    
      await prisma.billsToPay.create({
        data: account
      })
    }
  } catch (error) {
    console.log("Error in processing message", error);
    throw new Error("Error in processing message");
  }
};

const formatAccount = async (account: any) => {

  try {
    const statusValues: any = {
      "Em aberto": 1,
      "Parcialmente pago": 2,
      "Pago": 3,
    };
  
    let entity = await getCompany({cpfCnpj: account["CPF/CNPJ"].replace(/\D/g, '')});
    let supplier:any = {}
    if(entity) {
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
      dueDate: new Date(account["VENCIMENTO"] ?? new Date()).toISOString()
    };
    
  } catch (error) {
    console.log("Error in formatting account", error);
    throw new Error("Error in formatting account");
  }

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
    "sampleName": entity.nome_fantasia ? entity.nome_fantasia : entity.razao_social,
    "type": entity.cnpj > 10 ? "J" : "F",
    "cep": entity.endereco.cep,
    "complement": entity.endereco.complemento,
    "neighborhood": entity.endereco.bairro,
    "number": entity.endereco.numero ? parseInt(entity.endereco.numero) : null,
    "observation": entity.endereco.observacao ? entity.endereco.observacao : ""
  }
}


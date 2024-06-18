import { Channel, ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";

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

const formatAccount = (account: any) => {
  const statusValues: any = {
    "Em aberto": 1,
    "Parcialmente pago": 2,
    "Pago": 3,
  };

  return {
    description: account["DESCRIÇÃO"],
    value: account["VALOR"],
    status: statusValues[account["STATUS"]],
    companyId: account.companyId ?? 1,
    idSupplier: account.idSupplier ?? 1,
    dueDate: new Date(account["VENCIMENTO"] ?? new Date()).toISOString()
  };
};


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

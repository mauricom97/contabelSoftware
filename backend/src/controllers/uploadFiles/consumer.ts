import { Channel, ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "../../rabbitmq/RabbitMQ";

const QUEUE_NAME = "accounts_payable";

const processMessage = (msg: ConsumeMessage | null) => {
  if (msg) {
    const content = msg.content.toString();
    const account = JSON.parse(content);
    console.log("Received:", account);
    // Adicione a lógica para salvar no banco de dados ou processar a mensagem
  }
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

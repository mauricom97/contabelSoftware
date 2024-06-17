import amqp, { Channel, Connection } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

export const connectRabbitMQ = async (): Promise<Channel> => {
  try {
    const connection: Connection = await amqp.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
};

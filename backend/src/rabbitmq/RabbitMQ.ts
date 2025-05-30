import amqp, { Channel } from "amqplib";
import dotenv from "dotenv";
dotenv.config();
const RABBITMQ_URL = "amqps://boraehzx:m2Oo3r5clrM2AtpRsMm1LwUnjL1fS261@shrimp.rmq.cloudamqp.com/boraehzx"

export const connectRabbitMQ = async (): Promise<{ connection: any, channel: Channel }> => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    return {connection, channel};
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
};

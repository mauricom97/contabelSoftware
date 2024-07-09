import amqp, { Channel, Connection } from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const RABBITMQ_URL = !process.env.NODE_ENV || process.env.NODE_ENV === "prodcution" ? process.env.NODE_ENV as string : "amqp://localhost"

export const connectRabbitMQ = async (): Promise<{ connection: Connection, channel: Channel }> => {
  try {
    const connection: Connection = await amqp.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    return {connection, channel};
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
};

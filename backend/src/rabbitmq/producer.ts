import * as amqp from "amqplib/callback_api";
import path from "path";

interface FileMessage {
  filePath: string;
}

const producerRabbitMQ = async (nameFile: string) => {
  try {
    amqp.connect(
      "amqp://mauricio:123456@localhost:15672",
      (error0, connection) => {
        if (error0) {
          throw error0;
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }

          const queue = "file_upload";

          channel.assertQueue(queue, {
            durable: true,
          });

          const filePath = path.resolve(
            __dirname,
            "../../files/sheets",
            nameFile
          );

          const message: { filePath: string } = { filePath: filePath };

          channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
          });

          console.log(" [x] Sent %s", JSON.stringify(message));
        });
      }
    );
  } catch (error) {
    console.log("Failed to connect to RabbitMQ", error);
  }
};

export default producerRabbitMQ;

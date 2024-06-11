import * as amqp from 'amqplib/callback_api';

interface FileMessage {
  filePath: string;
}

const producerRabbitMQ = async (filePath: string) => {

    amqp.connect('amqp://mauricio:123456@localhost:5672', (error0, connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        const queue = 'file_upload';
    
        channel.assertQueue(queue, {
          durable: true
        });
    
        const message: FileMessage = { filePath: filePath };
    
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
          persistent: true
        });
    
        console.log(" [x] Sent %s", JSON.stringify(message));
      });
    });
};

export default producerRabbitMQ;
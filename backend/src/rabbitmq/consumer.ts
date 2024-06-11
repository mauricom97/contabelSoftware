import * as amqp from 'amqplib/callback_api';
import * as XLSX from 'xlsx';
import * as path from 'path';

interface FileMessage {
  filePath: string;
}

interface ContasAPagar {
  Fornecedor: string;
  Valor: number;
  Vencimento: string;
}

amqp.connect('amqp://localhost:8080', (error0, connection) => {
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

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const content: FileMessage = JSON.parse(msg.content.toString());
        console.log(" [x] Received %s", content.filePath);

        const workbook = XLSX.readFile(content.filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json<ContasAPagar>(workbook.Sheets[sheetName]);

        for (const row of worksheet) {
        //   await client.query(
        //     'INSERT INTO contas_a_pagar (fornecedor, valor, vencimento) VALUES ($1, $2, $3)', 
        //     [row.Fornecedor, row.Valor, row.Vencimento]
        //   );
            console.log(row);
        }

        console.log(" [x] Done processing file");
        channel.ack(msg);
      }
    }, {
      noAck: false
    });
  });
});

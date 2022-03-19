import amqp from 'amqplib/callback_api';

const connectionUrl = process.env.QUEUE_URL
const queueName = process.env.QUEUE_NAME

let ch: amqp.Channel = null;
amqp.connect('amqp://'+connectionUrl, (error0, conn) => {
    if (error0) {
        throw error0;
    }

    conn.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        console.log("Open Producer Channel")
        ch = channel;

        ch.assertQueue(queueName, { durable: true });

    });
});

export const publishToQueue = async (data: string) => {
    ch.assertQueue(queueName, { durable: true });
    ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
}

process.on('exit', (code) => {
    console.log(code)

    ch.close((error2) => {
        console.log(error2);
    });
});

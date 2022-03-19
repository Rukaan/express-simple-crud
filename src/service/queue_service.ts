import { Inject, Service } from 'typedi';
import Logger from "@instance/logger";
import amqp from 'amqplib/callback_api';

@Service()
export default class QueueService {

    @Inject()
    logger: Logger;

    private connectionUrl : string;
    private queueName : string;

    constructor() {
        this.connectionUrl = process.env.QUEUE_URL;
        this.queueName = process.env.QUEUE_NAME;
    }

    public async consumeQueue() {
        let ch: amqp.Channel = null;

        amqp.connect('amqp://'+this.connectionUrl, (error0, conn) => {
            if (error0) {
                throw error0;
            }

            conn.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
                console.log("Open Consumer Channel")
                ch = channel;

                ch.assertQueue(this.queueName, { durable: true });

                ch.consume(this.queueName, (message) => {
                    console.log(message.content.toString());
                }, { noAck: true });
            });
        });
    }
}

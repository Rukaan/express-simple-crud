import { Router, Request, Response } from "express"
import { Inject, Service } from "typedi";
import Logger from "@instance/logger";
import { publishToQueue } from "@instance/mq-producer";

@Service()
export default class QueueController {
    @Inject()
	private logger: Logger;

    public router = Router()
	constructor() {
		this.initializeRouter();
	}

	public initializeRouter() {
        this.router.post('/send', this.send.bind(this));
	}

    private async send(req: Request, res: Response) {
        publishToQueue(JSON.stringify(req.body)).then(() => {
            res.status(200).json({
                message: 'OK',
            });
        });
    }
}
import { Router } from "express"
import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import Logger from "@instance/logger";
import Test from '@model/test';
import TestService from "@service/test_service";

@Service()
export default class TestController {
	@Inject()
	private logger: Logger;

	@Inject()
	testService: TestService;

	public router = Router()
	constructor() {
		this.initializeRouter();
	}

	public initializeRouter() {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findOne.bind(this));
        this.router.post('/', this.create.bind(this));
        this.router.post('/update/:id', this.update.bind(this));
        this.router.post('/delete/:id', this.remove.bind(this));
	}

	private async findAll(req: Request, res: Response) {
		this.testService.findAll().then((tests : Test[]) => {
			res.status(200).json({
				message: 'OK',
				result: tests
			});
		})
	}

	private async findOne(req: Request, res: Response) {
		const { id } = req.params;
		this.testService.findOneById(id).then((test : Test) => {
			res.status(200).json({
				message: 'OK',
				result: test
			});
		})
	}

	private async create(req: Request, res: Response) {
		const testToCreate:Partial<Test>= {
			name: req.body.name
		}

		this.testService.create(testToCreate).then((test : Test) => {
			res.status(200).json({
				message: 'OK',
				result: test
			});
		})
	}

	private async update(req: Request, res: Response) {
		const { id } = req.params;

		const testToUpdate:Partial<Test>= {
			name: req.body.name
		}

		this.testService.updateBy(id, testToUpdate).then(() => {
			res.status(200).json({
				message: 'OK'
			});
		})
	}

	private async remove(req: Request, res: Response) {
		const { id } = req.params;

		this.testService.delete(id).then(() => {
			res.status(200).json({
				message: 'OK'
			});
		})
	}
}

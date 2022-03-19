import "reflect-metadata";
import 'module-alias/register';
import 'dotenv/config'
import {Inject, Service} from "typedi";
import * as bodyParser from "body-parser"
import http from "http"
import express from "express"
import expressWinston from "express-winston"
import winston from "winston"
import cors from "cors"
import helmet from "helmet"
import Logger from "@instance/logger";
import SequelizeInstance from "@instance/sequelize"
// Model
import Models from "@model/index";
// Controller
import TestController from "@controller/test_controller";

const port = process.env.PORT || 3000

@Service()
export class App {
    @Inject()
    db: SequelizeInstance;
    @Inject()
    logger: Logger;

    @Inject()
    testController: TestController

    server: http.Server;
    _isShutingdown: boolean;

    setupServer() {
        const serviceName = process.env.SERVICE_NAME;
        const app = express()
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
        this.logger.info(`starting ${process.env.SERVICE_NAME} service`);
        app.use(cors())
        app.use(helmet())
        app.use(this.winstonLogger())

        app.get('/healthcheck', (req, res) => {
            res.send('HEALTHY')
        })
        app.use("/api/v1/test", this.testController.router)

        app.use(this.winstonErrorLogger());
        this.server = app.listen(port);
        this.logger.info(`${serviceName} is listening on port ${port}`);
    }

    async setupDatabase() {
        this.db.addModels(Models);
    }

    winstonLogger() {
        return expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}}",
            expressFormat: true,
            colorize: false,
        });
    }

    winstonErrorLogger() {
        return expressWinston.errorLogger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}}",
        });
    }

    onKillSignal() {
        process.setMaxListeners(0);
        process.on("exit", this.shutdown.bind(this, "exit"));
        process.on("SIGINT", this.shutdown.bind(this, "SIGINT"));
        process.on("SIGTERM", this.shutdown.bind(this, "SIGTERM"));
    }

    async start() {
        this.setupDatabase();
        this.onKillSignal();
        this.setupServer();
    }

    shutdown(signal: string) {
        if (this._isShutingdown) return;
        this.logger.info(`Received ${signal} signal`);
        this._isShutingdown = true;

        if (this.server.close) {
            this.server.close(() => {
                this.logger.info(`Shutting down express server`);
            })
        }

        if (this.db.close) {
            this.logger.info(`Shutting down database connection`);
            this.db.close();
        }

        this.logger.info(`Shutting down rabbitmq connection`);

        setTimeout(() => {
            process.exit(0);
        }, 3000);
    }
}

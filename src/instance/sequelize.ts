import {Sequelize} from "sequelize-typescript";
import { Service } from "typedi";

const host = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const port = +process.env.DB_PORT

function createInstance() {
	const sequelize = new SequelizeInstance({
		host,
		dialect: "mysql",
		port,
		database,
		username,
		password,
	});
	sequelize.authenticate()
	return sequelize;
}

@Service({ factory: createInstance })
export default class SequelizeInstance extends Sequelize{}

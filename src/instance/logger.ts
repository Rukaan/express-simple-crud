import moment from "moment";
import { Service } from "typedi";
import chalk from "chalk";
// tslint:disable-next-line:no-console
const log = console.log;

@Service()
export default class Logger {
	timestamp() {
		return moment().format("YYYY-MM-DD HH:mm:ss");
	}

	info(message: string) {
		log(`${this.timestamp()} - ${chalk.blue("INFO")} ${message}`);
	}

	warn(message: string) {
		log(`${this.timestamp()} - ${chalk.yellow("WARN")} ${message}`);
	}

	error(error: Error) {
		log(`${this.timestamp()} - ${chalk.red("ERROR")} ${error.stack}`);
	}
}

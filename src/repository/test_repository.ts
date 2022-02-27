import { Inject, Service } from 'typedi';
import Test from '@model/test';
import { Op, Sequelize } from 'sequelize';
import SequelizeInstance from '@instance/sequelize';
import Logger from "@instance/logger";

@Service()
export default class TestRepository {

@Inject()
  db: SequelizeInstance;
  @Inject()
  logger: Logger;
  async count() {
    return Test.count();
  }

  async findAll() {
    return Test.findAll();
  }

  async findOneById(id: string) {
    return Test.findOne({ where: { id } });
  }

  async create(test: Partial<Test>) {
    return Test.create(test);
  }

  async updateBy(_query: Partial<Test>, customer: Partial<Test>) {
    const query = _query as any;
    return Test.update(customer, { where: query });
  }

  async deleteBy(_query: Partial<Test>) {
    const query = _query as any;
    return Test.destroy({ where: query });
  }
}

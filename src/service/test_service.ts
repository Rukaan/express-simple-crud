import { Inject, Service } from 'typedi';
import Test from '@model/test';
import TestRepository from '@repository/test_repository';
import Logger from "@instance/logger";

@Service()
export default class TestService {

@Inject()
  @Inject()
  testRepository: TestRepository;
  @Inject()
  logger: Logger;

  async findAll() {
    return this.testRepository.findAll()
  }

  async findOneById(id : string) {
    return this.testRepository.findOneById(id)
  }

  async create(test: Partial<Test>) {
    return this.testRepository.create(test)
  }

  async updateBy(id: string, test: Partial<Test>) {
    this.testRepository.updateBy({id} , test)
  }

  async delete(id : string) {
    return this.testRepository.deleteBy({id})
  }

}

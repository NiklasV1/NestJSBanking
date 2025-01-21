import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      if (await this.customerRepository.exists({ where: { username: createCustomerDto.username } })) {
        throw new Error('Username already exists!')
      }

      var customer: Customer = new Customer()
      customer.first_name = createCustomerDto.first_name
      customer.last_name = createCustomerDto.last_name
      customer.address = createCustomerDto.address
      customer.username = createCustomerDto.username
      customer.password = createCustomerDto.password
      customer.accounts = []

      return this.customerRepository.save(customer)
    } catch {
      throw new Error('Customer creation failed!')
    }
  }

  findAll() {
    return this.customerRepository.find()
  }

  findOne(id: string) {
    return this.customerRepository.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.customerRepository.delete({ id: id })
  }
}

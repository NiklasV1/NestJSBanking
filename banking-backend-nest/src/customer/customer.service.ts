import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      if (await this.customerRepository.exists({where: {username: createCustomerDto.username} })) {
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
    return this.customerRepository.findOneBy({id: id})
  }

  remove(id: string) {
    return this.customerRepository.delete({id: id})
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const {customer_id, name} = createAccountDto

    console.log('1')

    const customer: Customer | null = await this.customerRepository.findOne(
      {
        where: {id: customer_id},
        relations: {accounts: true  
      }})
    if (!customer) {
      throw new Error('Customer does not exist!')
    }

    console.log('2')

    const account: Account = new Account()
    account.balance=0
    account.deposits=[]
    account.frozen=false
    account.name=name
    account.received_transactions=[]
    account.sent_transactions=[]
    account.withdrawals=[]

    customer.accounts.push(account)

    return this.customerRepository.save(customer)
  }
}

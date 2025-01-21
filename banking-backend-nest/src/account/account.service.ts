import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }

  async create(createAccountDto: CreateAccountDto) {
    const { customer_id, name } = createAccountDto

    const customer: Customer | null = await this.customerRepository.findOne(
      {
        where: { id: customer_id },
        relations: {
          accounts: true
        }
      })
    if (!customer) {
      throw new Error('Customer does not exist!')
    }

    const account: Account = new Account()
    account.owner = customer
    account.balance = 0
    account.frozen = false
    account.name = name
    account.received_transactions = []
    account.sent_transactions = []

    return this.accountRepository.save(account)
  }

  findAll() {
    return this.accountRepository.find()
  }

  findOne(id: string) {
    return this.accountRepository.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.accountRepository.delete(id)
  }

  async toggleFreeze(id: string) {
    const account: Account | null = await this.accountRepository.findOneBy({ id: id })
    if (!account) {
      throw new Error('Account does not exist!')
    }
    account.frozen = !account.frozen
    return this.accountRepository.save(account)
  }

  async viewAccounts(customer_id: string) {
    const customer: Customer | null = await this.customerRepository.findOne({
      where: { id: customer_id },
      relations: { accounts: true },
    })
    if (!customer) {
      throw new Error('Customer does not exist!')
    }

    return customer.accounts
  }

  async setBalance(accId: string, balance: number) {
    const account = await this.accountRepository.findOneBy({ id: accId })
    if (!account) {
      throw new Error("Account not found!")
    }
    account.balance = balance
    return this.accountRepository.save(account)
  }
}

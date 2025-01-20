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
  ) {}

  findAll() {
    return this.accountRepository.find()
  }

  findOne(id: string) {
    return this.accountRepository.findOneBy({id: id})
  }

  remove(id: string) {
    return this.accountRepository.delete(id)
  }

  async toggleFreeze(id: string) {
    const account: Account | null  = await this.accountRepository.findOneBy({id: id})
    if (!account) {
      throw new Error('Account does not exist!')
    }
    account.frozen = !account.frozen
    return this.accountRepository.save(account)
  }
}

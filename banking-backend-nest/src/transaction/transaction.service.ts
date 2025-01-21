import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    let { sender, receiver, message, amount } = createTransactionDto

    const senderAcc = await this.accountRepository.findOneBy({ id: sender })
    if (!senderAcc) {
      throw new Error("Invalid sender address!")
    }
    const receiverAcc = await this.accountRepository.findOneBy({ id: receiver })
    if (!receiverAcc) {
      throw new Error("Invalid receiver address!")
    }
    if (senderAcc.balance < amount) {
      throw new Error("Sender balance too low!")
    }

    const transaction: Transaction = new Transaction()
    transaction.amount = amount
    transaction.message = message

    senderAcc.balance -= amount
    receiverAcc.balance += amount

    senderAcc.sent_transactions.push(transaction)
    receiverAcc.received_transactions.push(transaction)

    this.accountRepository.save(senderAcc)
    this.accountRepository.save(receiverAcc)

    return 'This action adds a new transaction';
  }

  findAll() {
    return this.transactionRepository.find()
  }

  remove(id: string) {
    return this.transactionRepository.delete(id)
  }

  async getSent(accId: string) {
    const account = await this.accountRepository.findOneBy({ id: accId })
    if (!account) {
      throw new Error("Account not found!")
    }
    return account.sent_transactions
  }

  async getReceived(accId: string) {
    const account = await this.accountRepository.findOneBy({ id: accId })
    if (!account) {
      throw new Error("Account not found!")
    }
    return account.received_transactions
  }
}

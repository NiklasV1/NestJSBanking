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

    const senderAcc = await this.accountRepository.findOne({ where: { id: sender }, relations: { sent_transactions: true } })
    if (!senderAcc) {
      throw new Error("Invalid sender address!")
    }
    const receiverAcc = await this.accountRepository.findOne({ where: { id: receiver }, relations: { received_transactions: true } })
    if (!receiverAcc) {
      throw new Error("Invalid receiver address!")
    }
    if (senderAcc.balance < amount) {
      throw new Error("Sender balance too low!")
    }
    if (senderAcc.frozen) {
      throw new Error("Sender account is frozen!")
    }
    if (receiverAcc.frozen) {
      throw new Error("Receiver account is frozen!")
    }

    const transaction: Transaction = new Transaction()
    transaction.amount = amount
    transaction.message = message
    transaction.sender = senderAcc
    transaction.receiver = receiverAcc

    senderAcc.balance -= amount
    receiverAcc.balance += amount

    return this.transactionRepository.save(transaction)
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

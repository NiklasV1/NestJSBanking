import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account,Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}

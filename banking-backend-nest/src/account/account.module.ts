import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Deposit } from 'src/deposit/entities/deposit.entity';
import { Withdrawal } from 'src/withdrawal/entities/withdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Transaction, Deposit, Withdrawal]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

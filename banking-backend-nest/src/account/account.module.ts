import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Deposit } from 'src/deposit/entities/deposit.entity';
import { Withdrawal } from 'src/withdrawal/entities/withdrawal.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { DepositModule } from 'src/deposit/deposit.module';
import { WithdrawalModule } from 'src/withdrawal/withdrawal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Transaction, Deposit, Withdrawal]),
    TransactionModule,
    DepositModule,
    WithdrawalModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

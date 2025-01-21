import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Account, Transaction]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

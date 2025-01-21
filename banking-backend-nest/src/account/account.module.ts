import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Transaction]),
    TransactionModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

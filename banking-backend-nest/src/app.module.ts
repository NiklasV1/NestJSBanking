import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';

@Module({
  imports: [UserModule, AccountModule, TransactionModule, DepositModule, WithdrawalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('getAll')
  findAll() {
    return this.transactionService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}

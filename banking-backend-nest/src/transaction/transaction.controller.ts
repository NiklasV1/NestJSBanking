import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('create')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto)
  }

  @Get('getAll')
  findAll() {
    return this.transactionService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }

  @Get('getSent/:accId')
  getSent(@Param('accId', ParseUUIDPipe) id: string) {
    return this.transactionService.getSent(id)
  }
  @Get('getReceived/:accId')
  getReceived(@Param('accId', ParseUUIDPipe) id: string) {
    return this.transactionService.getReceived(id)
  }
}

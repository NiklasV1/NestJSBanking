import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Get('getAll')
  findAll() {
    return this.withdrawalService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.withdrawalService.remove(+id);
  }
}

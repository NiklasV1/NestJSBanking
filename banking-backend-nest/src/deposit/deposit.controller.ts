import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get('getAll')
  findAll() {
    return this.depositService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.depositService.remove(+id);
  }
}

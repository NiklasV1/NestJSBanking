import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('getAll')
  findAll() {
    return this.accountService.findAll();
  }

  @Get('view/:customerId')
  findOne(@Param('customerId') id: string) {
    return this.accountService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Post('toggleFreeze/:accId')
  toggleFreeze(@Param('accId') id: string) {
    return this.accountService.toggleFreeze(id)
  }
}

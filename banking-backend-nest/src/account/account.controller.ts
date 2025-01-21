import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('create')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto)
  }

  @Get('getAll')
  findAll() {
    return this.accountService.findAll();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Post('toggleFreeze/:accId')
  toggleFreeze(@Param('accId') id: string) {
    return this.accountService.toggleFreeze(id)
  }

  @Get('viewAccounts/:cusId')
  viewAccounts(@Param('cusId', ParseUUIDPipe) id: string) {
    return this.accountService.viewAccounts(id)
  }

  // TODO: REMOVE
  @Post('setBalance/:accId/:balance')
  setBalance(@Param('accId', ParseUUIDPipe) id: string, @Param('balance', ParseFloatPipe) balance: number) {
    return this.accountService.setBalance(id, balance)
  }
}

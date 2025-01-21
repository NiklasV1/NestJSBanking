import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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

  @Get('viewSentTransactions/:accId')
  viewSentTransactions(){
    //TODO
  }
  
  @Get('viewReceivedTransactions/:accId')
  viewReceivedTransactions(@Param('accId') id: string){
    //TODO
  }
}

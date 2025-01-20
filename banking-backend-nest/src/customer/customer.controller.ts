import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('getAll')
  findAll() {
    return this.customerService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  @Post('createAccount')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.customerService.createAccount(createAccountDto)
  }
}

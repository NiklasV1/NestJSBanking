import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('getAll')
  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.customerService.findAll()
    const returnValue: CustomerDto[] = []
    customers.forEach((customer) => {
      returnValue.push(new CustomerDto(
        customer.id,
        customer.username,
        customer.first_name,
        customer.last_name,
        customer.address
      ))
    })
    return returnValue
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CustomerDto> {
    const customer = await this.customerService.findOne(id)
    if (!customer) {
      throw new Error('Customer not found!')
    }
    return new CustomerDto(
      customer.id,
      customer.username,
      customer.first_name,
      customer.last_name,
      customer.address
    )
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.customerService.remove(id);
  }
}

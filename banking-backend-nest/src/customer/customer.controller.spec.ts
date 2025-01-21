import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let mockCustomerService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

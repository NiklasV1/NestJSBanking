import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;

  // Example of a mocked Repository
  const mockCustomerRepository = {
    // create: jest.fn().mockImplementation(customer => customer),

    exists: jest.fn().mockImplementation((input: { where: { username: string } }) => {
      if (input.where.username == "duplicate") {
        return true
      }
      return false
    }),

    save: jest.fn().mockImplementation(customer => Promise.resolve({
      id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
      ...customer
    })),

    find: jest.fn().mockImplementation(),

    findOneBy: jest.fn().mockImplementation(),

    delete: jest.fn().mockImplementation(id => Promise.resolve({
      raw: "test",
      affected: 1,
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, {
        provide: getRepositoryToken(Customer),
        useValue: mockCustomerRepository,
      }],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Example of using a mocked Repository
  // expects async return function to have been called
  it('should create a customer and return a Promise<Customer>', async () => {
    const newCustomer: CreateCustomerDto = new CreateCustomerDto(
      "N",
      "V",
      "Street",
      "nv1",
      "pw1"
    )
    expect(await service.create(newCustomer)).toEqual({
      id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
      ...newCustomer,
      accounts: [],
    })

    expect(mockCustomerRepository.exists).toHaveBeenCalled()
    expect(mockCustomerRepository.save).toHaveBeenCalled()
  })

  // Example of expecting an error
  it('should not allow duplicate usernames', async () => {
    const duplicateCustomer: CreateCustomerDto = new CreateCustomerDto(
      "N",
      "V",
      "Street",
      "duplicate",
      "pw1"
    )
    expect.assertions(2)
    try {
      await service.create(duplicateCustomer)
    } catch (error) {
      expect(error.name).toEqual('Error')
      expect(error.message).toEqual('Customer creation failed!')
    }
  })

  it('should return the right data when deleting and call the delete method', async () => {
    expect(await service.remove("")).toEqual({
      raw: "test",
      affected: 1,
    })

    expect(mockCustomerRepository.delete).toHaveBeenCalled()
  })
});

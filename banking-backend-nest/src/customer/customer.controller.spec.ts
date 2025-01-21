import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let mockCustomerService = {
    create: jest.fn((dto: CreateCustomerDto) => {
      return {
        id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
        first_name: dto.first_name,
        last_name: dto.last_name,
        address: dto.address,
        username: dto.username,
        password: dto.password,
      }
    }),
    findOne: jest.fn((id: string) => {
      return {
        id: id,
        first_name: "N",
        last_name: "V",
        address: "Street",
        username: "NV",
        password: "pw1",
      }
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: "aaaaaaaa-fc57-4e2e-91b3-176408d57756",
          first_name: "T",
          last_name: "M",
          address: "Street2",
          username: "TM",
          password: "pw1"
        },
        {
          id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
          first_name: "N",
          last_name: "V",
          address: "Street",
          username: "NV",
          password: "pw2"
        }
      ]
    }),
    remove: jest.fn((id: string) => {
      return {
        raw: "test",
        affected: 1,
      }
    })
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

  it('should create customer account and return user info', () => {
    expect(controller.create(new CreateCustomerDto("N", "V", "Street", "NV", "pw1"))).resolves.toEqual({
      id: expect.any(String),
      first_name: "N",
      last_name: "V",
      address: "Street",
      username: "NV",
    })

    expect(mockCustomerService.create).toHaveBeenCalled()
  })

  it('should get customer info without  leaking passwords', () => {
    expect(controller.findOne("fc2dc17f-fc57-4e2e-91b3-176408d57756")).resolves.toEqual({
      id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
      first_name: "N",
      last_name: "V",
      address: "Street",
      username: "NV",
    })

    expect(mockCustomerService.findOne).toHaveBeenCalled()
  })

  it('should get info of all customers in the correct format', () => {
    expect(controller.findAll()).resolves.toEqual([
      {
        id: "aaaaaaaa-fc57-4e2e-91b3-176408d57756",
        first_name: "T",
        last_name: "M",
        address: "Street2",
        username: "TM",
      },
      {
        id: "fc2dc17f-fc57-4e2e-91b3-176408d57756",
        first_name: "N",
        last_name: "V",
        address: "Street",
        username: "NV",
      }
    ])

    expect(mockCustomerService.findAll).toHaveBeenCalled()
  })

  it('should return the correct delete information', () => {
    expect(controller.remove("fc2dc17f-fc57-4e2e-91b3-176408d57756")).resolves.toEqual(
      "Success"
    )

    expect(mockCustomerService.remove).toHaveBeenCalled()
  })
});

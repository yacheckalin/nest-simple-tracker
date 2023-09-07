import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let modRef: TestingModule;
  let service: CustomersService;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useFactory: () => ({
            getAllCustomers: jest.fn(() => []),
            getCustomerById: jest.fn((id: number) => ({
              id,
              email: 'some@email.com',
            })),
            createCustomer: jest.fn((obj: CreateCustomerDto) => ({
              id: 1,
              email: obj.email,
            })),
          }),
        },
      ],
    }).compile();

    controller = modRef.get<CustomersController>(CustomersController);
    service = modRef.get<CustomersService>(CustomersService);
  });

  afterEach(async () => {
    await modRef.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getAllCustomers method', () => {
    controller.getAllCustomers();
    expect(service.getAllCustomers).toHaveBeenCalled();
  });
  it('calling getCustomerById method', () => {
    controller.getCustomerById(1);
    expect(service.getCustomerById).toHaveBeenCalled();
    expect(service.getCustomerById).toHaveBeenCalledWith(1);
  });
  it('calling createCustomer method', () => {
    const dto = new CreateCustomerDto();
    controller.createCustomer(dto);
    expect(service.createCustomer).toHaveBeenCalled();
    expect(service.createCustomer).toHaveBeenCalledWith(dto);
  });
});

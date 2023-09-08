import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomersService', () => {
  let service: CustomersService;
  let modRef: TestingModule;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
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

    service = modRef.get<CustomersService>(CustomersService);
  });

  afterEach(async () => {
    await modRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getAllCustomers method', async () => {
    const getAllCustomersSpy = jest.spyOn(service, 'getAllCustomers');
    service.getAllCustomers();
    expect(getAllCustomersSpy).toHaveBeenCalled();
  });
  it('should call getCustomerById method', async () => {
    const getCustomerByIdSpy = jest.spyOn(service, 'getCustomerById');
    service.getCustomerById(1);
    expect(getCustomerByIdSpy).toHaveBeenCalled();
    expect(getCustomerByIdSpy).toHaveBeenCalledWith(1);
  });
  it('should call createCustomer method', async () => {
    const createCustomerSpy = jest.spyOn(service, 'createCustomer');
    const dto = new CreateCustomerDto();
    service.createCustomer(dto);
    expect(createCustomerSpy).toHaveBeenCalled();
    expect(createCustomerSpy).toHaveBeenCalledWith(dto);
  });
});

/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let modRef: TestingModule;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
      providers: [
        {
          provide: OrdersService,
          useFactory: () => ({
            getAllOrders: jest.fn(() => []),
            getOrderByNumber: jest.fn(() => {}),
            getOrderById: jest.fn(() => {}),
            getOrdersByCustomerEmail: jest.fn(() => []),
            createOrder: jest.fn(() => {}),
            importCSV: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    service = modRef.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getAllOrders method', async () => {
    const getAllOrdersSpy = jest.spyOn(service, 'getAllOrders');
    service.getAllOrders();
    expect(getAllOrdersSpy).toHaveBeenCalled();
  });
  it('should call getOrderByNumber method', async () => {
    const getOrderByNumberSpy = jest.spyOn(service, 'getOrderByNumber');
    service.getOrderByNumber('1111');
    expect(getOrderByNumberSpy).toHaveBeenCalled();
    expect(getOrderByNumberSpy).toHaveBeenCalledWith('1111');
  });
  it('should call getOrderById method', async () => {
    const getOrderByIdSpy = jest.spyOn(service, 'getOrderById');
    service.getOrderById(1);
    expect(getOrderByIdSpy).toHaveBeenCalled();
    expect(getOrderByIdSpy).toHaveBeenCalledWith(1);
  });
  it('should call getOrdersByCustomerEmail method', async () => {
    const getOrdersByCustomerEmailSpy = jest.spyOn(
      service,
      'getOrdersByCustomerEmail',
    );
    const dto = new FilterOrdersDto();
    service.getOrdersByCustomerEmail(dto);
    expect(getOrdersByCustomerEmailSpy).toHaveBeenCalled();
    expect(getOrdersByCustomerEmailSpy).toHaveBeenCalledWith(dto);
  });
  it('should call createOrder method', async () => {
    const createOrderSpy = jest.spyOn(service, 'createOrder');
    const dto = new CreateOrderDto();
    service.createOrder(dto);
    expect(createOrderSpy).toHaveBeenCalled();
    expect(createOrderSpy).toHaveBeenCalledWith(dto);
  });
  it('should call importCSV method', async () => {
    const importCSVSpy = jest.spyOn(service, 'importCSV');
    service.importCSV({} as Express.Multer.File);
    expect(importCSVSpy).toHaveBeenCalled();
    expect(importCSVSpy).toHaveBeenCalledWith({});
  });
});

/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let modRef: TestingModule;
  let service: OrdersService;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
      controllers: [OrdersController],
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

    controller = modRef.get<OrdersController>(OrdersController);
    service = modRef.get<OrdersService>(OrdersService);
  });

  afterEach(async () => {
    await modRef.close();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getAllOrders method', () => {
    controller.getAllOrders();
    expect(service.getAllOrders).toHaveBeenCalled();
  });
  it('calling getOrderById method', () => {
    controller.getOrderById(1);
    expect(service.getOrderById).toHaveBeenCalled();
    expect(service.getOrderById).toHaveBeenCalledWith(1);
  });
  it('calling getOrderByNumber method', () => {
    controller.getOrderByNumber('1');
    expect(service.getOrderByNumber).toHaveBeenCalled();
    expect(service.getOrderByNumber).toHaveBeenCalledWith('1');
  });
  it('calling getOrdersByCustomerEmail method', () => {
    const dto = new FilterOrdersDto();
    controller.getOrdersByCustomerEmail(dto);
    expect(service.getOrdersByCustomerEmail).toHaveBeenCalled();
    expect(service.getOrdersByCustomerEmail).toHaveBeenCalledWith(dto);
  });
  it('calling createOrder method', () => {
    const dto = new CreateOrderDto();
    controller.createOrder(dto);
    expect(service.createOrder).toHaveBeenCalled();
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });
  it('calling importOrders method', () => {
    controller.importOrders({} as Express.Multer.File);
    expect(service.importCSV).toHaveBeenCalled();
    expect(service.importCSV).toHaveBeenCalledWith({});
  });
});

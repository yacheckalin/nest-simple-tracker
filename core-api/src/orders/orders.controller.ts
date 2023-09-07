import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../model/order.entity';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(): Promise<Order[] | []> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post('/filter')
  getOrdersByCustomerEmail(
    @Body() body: FilterOrdersDto,
  ): Promise<Order[] | []> {
    return this.ordersService.getOrdersByCustomerEmail(body);
  }

  @Post()
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(body);
  }
}

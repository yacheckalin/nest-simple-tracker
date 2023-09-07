import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../model/order.entity';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders(): Promise<Order[] | []> {
    return this.ordersService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get order by order_id_number' })
  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @ApiOperation({ summary: 'Get all orders by customer email' })
  @Post('/filter')
  getOrdersByCustomerEmail(
    @Body() body: FilterOrdersDto,
  ): Promise<Order[] | []> {
    return this.ordersService.getOrdersByCustomerEmail(body);
  }

  @ApiOperation({ summary: 'Create new order' })
  @Post()
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(body);
  }
}

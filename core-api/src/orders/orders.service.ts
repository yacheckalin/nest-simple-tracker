import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../model/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<Order[] | []> {
    const orders = await this.repo.find();
    return orders;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.repo.findOne({ where: { orderNo: id } });
    if (!order) {
      throw new NotFoundException(`Cound not found order with number: ${id}`);
    }

    return order;
  }

  async getOrdersByCustomerEmail(body: FilterOrdersDto): Promise<Order[] | []> {
    const orders = await this.repo.find({ where: { email: body.email } });
    return orders;
  }

  async createOrder(body: CreateOrderDto): Promise<Order> {
    const order = await this.repo.create(body);
    return this.repo.save(order);
  }
}

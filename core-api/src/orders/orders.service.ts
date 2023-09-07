import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../model/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Readable } from 'stream';
import { parse } from 'papaparse';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<Order[] | []> {
    const orders = await this.repo.find();
    return orders;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order> {
    const order = await this.repo.findOne({ where: { orderNumber } });
    if (!order) {
      throw new NotFoundException(
        `Cound not found order with number: ${orderNumber}`,
      );
    }

    return order;
  }

  async getOrdersByCustomerEmail(body: FilterOrdersDto): Promise<Order[] | []> {
    try {
      const orders = await this.repo.find({
        where: { email: body.email },
        relations: { checkpoints: true },
      });
      return orders;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createOrder(body: CreateOrderDto): Promise<Order> {
    try {
      const order = await this.repo.create(body);
      return await this.repo.save(order);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async importCSV(file: Express.Multer.File): Promise<Order[] | []> {
    try {
      const buffer = Buffer.from(file.buffer.toString('base64'), 'base64');
      const dataStream = Readable.from(buffer);

      const csvToJson = (
        file,
      ): Promise<{ data: any; errors: any; meta: any }> =>
        new Promise((complete, error) =>
          parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete,
            error,
          }),
        );

      const { data } = await csvToJson(dataStream);

      const result = [];
      for (const item of data) {
        // check the data with the same orderNumber
        const check = await this.repo.findOne({
          where: {
            orderNumber: item.orderNo,
            trackingNumber: item.tracking_number,
            articleNumber: item.articleNo,
          },
        });
        // only if it is not in DB yet
        if (!check) {
          const order = await this.repo.save(new Order().toEntity(item));
          // await this.repo.save(order);
          if (order) {
            result.push(order);
          }
        }
      }

      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

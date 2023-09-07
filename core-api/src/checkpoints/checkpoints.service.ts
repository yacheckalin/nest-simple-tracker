import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Checkpoint } from '../model/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { Order } from '../model/order.entity';
import { Readable } from 'stream';
import { parse } from 'papaparse';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(Checkpoint) private readonly repo: Repository<Checkpoint>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async getAllCheckpoints(): Promise<Checkpoint[] | []> {
    return await this.repo.find({ relations: { order: true } });
  }

  async getAllCheckpointsByOrderNumber(
    order: string,
  ): Promise<Checkpoint[] | []> {
    console.log(order);
    const checkpoints = await this.repo
      .createQueryBuilder('checkpoints')
      .innerJoinAndSelect('checkpoints.order', 'orders')
      .where('orders.orderNumber = :order', { order })
      .orderBy('checkpoints.timestamp', 'DESC')
      .getMany();

    return checkpoints;
  }

  async createCheckpoint(body: CreateCheckpointDto): Promise<Checkpoint> {
    const order = await this.orderRepo.findOne({
      where: { orderNumber: body.orderNumber },
    });

    if (!order) {
      throw new NotFoundException(
        `Could not found the order with number : ${body.orderNumber}`,
      );
    }
    try {
      const checkpoint = await this.repo.create({
        ...body,
        order,
      });

      return this.repo.save(checkpoint);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async importCSV(file: Express.Multer.File): Promise<Checkpoint[] | []> {
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
        // check the data with the same trackingNumber
        const check = await this.repo.findOne({
          where: {
            trackingNumber: item.tracking_number,
            timestamp: item.timestamp,
          },
        });
        // check for order by trackingNumber
        const order = await this.orderRepo.findOne({
          where: { trackingNumber: item.tracking_number },
        });

        if (!check && order) {
          const newItem = new Checkpoint().toEntity(item);
          newItem.order = order;

          const checkpoint = await this.repo.save({
            ...newItem,
          });
          if (checkpoint) {
            result.push(checkpoint);
          }
        }
      }

      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

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

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(Checkpoint) private readonly repo: Repository<Checkpoint>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async getAllCheckpointsByOrderNumber(
    order: string,
  ): Promise<Checkpoint[] | []> {
    const checkpoints = await this.repo
      .createQueryBuilder('checkpoints')
      .leftJoinAndSelect('checkpoints.order', 'orders')
      .where('orders.orderNumber = :order', { order })
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
      const checkpoint = await this.repo.create({ ...body, order });

      return this.repo.save(checkpoint);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

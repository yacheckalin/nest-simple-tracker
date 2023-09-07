import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Checkpoint } from '../model/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(Checkpoint) private readonly repo: Repository<Checkpoint>,
  ) {}

  async getAllCheckpointsByTrackingNumber(
    trackingNumber: string,
  ): Promise<Checkpoint[] | []> {
    const checkpoints = await this.repo.find({ where: { trackingNumber } });
    return checkpoints;
  }
}

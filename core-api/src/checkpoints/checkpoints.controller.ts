import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { Checkpoint } from '../model/checkpoint.entity';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @Get('/:order')
  getAllCheckpointsByOrderNumber(
    @Param('order')
    order: string,
  ): Promise<Checkpoint[] | []> {
    return this.checkpointsService.getAllCheckpointsByOrderNumber(order);
  }

  @Post()
  createCheckpoint(@Body() body: CreateCheckpointDto): Promise<Checkpoint> {
    return this.checkpointsService.createCheckpoint(body);
  }
}

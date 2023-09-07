import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { Checkpoint } from '../model/checkpoint.entity';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Checkpoints')
@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @ApiOperation({ summary: 'Get all checkpoints by OrderNumber' })
  @Get('/:order')
  getAllCheckpointsByOrderNumber(
    @Param('order')
    order: string,
  ): Promise<Checkpoint[] | []> {
    return this.checkpointsService.getAllCheckpointsByOrderNumber(order);
  }

  @ApiOperation({ summary: 'Create new checkpoint' })
  @Post()
  createCheckpoint(@Body() body: CreateCheckpointDto): Promise<Checkpoint> {
    return this.checkpointsService.createCheckpoint(body);
  }
}

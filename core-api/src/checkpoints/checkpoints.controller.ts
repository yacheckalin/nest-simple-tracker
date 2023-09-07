import { Controller, Get, Param } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { Checkpoint } from '../model/checkpoint.entity';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @Get('/:track')
  getAllCheckpointsByTrackingNumber(
    @Param('track')
    trackingNumber: string,
  ): Promise<Checkpoint[] | []> {
    return this.checkpointsService.getAllCheckpointsByTrackingNumber(
      trackingNumber,
    );
  }
}

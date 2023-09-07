import { Module } from '@nestjs/common';
import { CheckpointsController } from './checkpoints.controller';
import { CheckpointsService } from './checkpoints.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkpoint } from '../model/checkpoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint])],
  controllers: [CheckpointsController],
  providers: [CheckpointsService],
})
export class CheckpointsModule {}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { Checkpoint } from '../model/checkpoint.entity';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Checkpoints')
@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @ApiOperation({ summary: 'Get all checkpoints' })
  @Get()
  getAllCheckpoints() {
    return this.checkpointsService.getAllCheckpoints();
  }

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

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Import data via csv-file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/import-csv')
  @UseInterceptors(FileInterceptor('file'))
  importCheckpoints(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'csv' })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<Checkpoint[] | []> {
    return this.checkpointsService.importCSV(file);
  }
}

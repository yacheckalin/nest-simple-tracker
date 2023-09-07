import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckpointDto {
  @ApiProperty({ required: true })
  @IsString()
  orderNumber!: string;

  @ApiProperty({ required: true })
  @IsString()
  trackingNumber!: string;

  @ApiProperty({ required: true })
  @IsString()
  location!: string;

  @ApiProperty({ required: true })
  @IsString()
  status!: string;

  @ApiProperty({ required: true })
  @IsString()
  statusText!: string;

  @ApiProperty({ required: true })
  @IsString()
  statusDetail!: string;

  @ApiProperty({ required: true })
  @Type(() => Date)
  @IsDate()
  timestamp!: Date;
}

import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateCheckpointDto {
  @IsString()
  orderNumber: string;

  @IsString()
  trackingNumber: string;

  @IsString()
  location: string;

  @IsString()
  status: string;

  @IsString()
  statusText: string;

  @IsString()
  statusDetail: string;

  @Type(() => Date)
  @IsDate()
  timestamp: Date;
}

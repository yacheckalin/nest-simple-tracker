import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class FilterOrdersDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsOptional()
  email: string;
}

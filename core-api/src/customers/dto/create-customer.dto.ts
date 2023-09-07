import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email!: string;
}

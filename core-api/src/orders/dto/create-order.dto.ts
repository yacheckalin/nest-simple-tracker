import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  @IsString()
  orderNo!: string;

  @ApiProperty({ required: true })
  @IsString()
  trackingNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  courier!: string;

  @ApiProperty({ required: true })
  @IsString()
  street: string;

  @ApiProperty({ required: true })
  @IsNumber()
  zeepCode: number;

  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  destinationCountryIso3: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email!: string;

  @ApiProperty({ required: true })
  @IsString()
  articleNo: string;

  @ApiProperty({ required: true })
  @IsString()
  articleImageUrl: string;

  @ApiProperty({ required: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true })
  @IsString()
  productName: string;
}

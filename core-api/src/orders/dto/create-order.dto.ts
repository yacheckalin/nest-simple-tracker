import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  orderNo!: string;

  @IsString()
  trackingNumber: string;

  @IsString()
  courier!: string;

  @IsString()
  street: string;

  @IsNumber()
  zeepCode: number;

  @IsString()
  city: string;

  @IsString()
  destinationCountryIso3: string;

  @IsEmail()
  email!: string;

  @IsString()
  articleNo: string;

  @IsString()
  articleImageUrl: string;

  @IsNumber()
  quantity: number;

  @IsString()
  productName: string;
}

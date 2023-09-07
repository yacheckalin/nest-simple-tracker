import { IsEmail, IsOptional } from 'class-validator';

export class FilterOrdersDto {
  @IsEmail()
  @IsOptional()
  email: string;
}

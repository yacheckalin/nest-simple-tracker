import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../model/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAllCustomers(): Promise<Customer[] | []> {
    return this.customersService.getAllCustomers();
  }
}

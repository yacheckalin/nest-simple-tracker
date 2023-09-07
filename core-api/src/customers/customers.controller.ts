import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../model/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Get()
  getAllCustomers(): Promise<Customer[] | []> {
    return this.customersService.getAllCustomers();
  }

  @ApiOperation({ summary: 'Get customer info by ID' })
  @Get('/:id')
  getCustomerById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Customer> {
    return this.customersService.getCustomerById(+id);
  }

  @ApiOperation({ summary: 'Create new customer' })
  @Post()
  createCustomer(@Body() body: CreateCustomerDto): Promise<Customer> {
    return this.customersService.createCustomer(body);
  }
}

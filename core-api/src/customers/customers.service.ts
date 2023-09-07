import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../model/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private readonly repo: Repository<Customer>,
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    const customers = await this.repo.find();
    return customers;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.repo.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Could not find the customer with id: ${id}`);
    }
    return customer;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Customer } from './model/customer.entity';
import { Order } from './model/order.entity';
import { Checkpoint } from './model/checkpoint.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [Customer, Order, Checkpoint],
        synchronize: true,
        dropSchema:
          process.env.NODE_ENV !== 'production' || 'development' ? true : false,
      }),
    }),
  ],
})
export class DatabaseModule {}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../model/order.entity';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders(): Promise<Order[] | []> {
    return this.ordersService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get order by order_id_number' })
  @Get('/:id')
  getOrderById(@Param('id') orderNumber: string): Promise<Order> {
    return this.ordersService.getOrderByNumber(orderNumber);
  }

  @ApiOperation({ summary: 'Get all orders by customer email' })
  @Post('/filter')
  getOrdersByCustomerEmail(
    @Body() body: FilterOrdersDto,
  ): Promise<Order[] | []> {
    return this.ordersService.getOrdersByCustomerEmail(body);
  }

  @ApiOperation({ summary: 'Create new order' })
  @Post()
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(body);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Import data via CSV' })
  @Post('/import-csv')
  @UseInterceptors(FileInterceptor('file'))
  importOrders(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'csv' })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<Order[] | []> {
    return this.ordersService.importCSV(file);
  }
}

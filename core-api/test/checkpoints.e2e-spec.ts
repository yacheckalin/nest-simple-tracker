import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Order } from '../src/model/order.entity';

describe('CheckpointController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('return an empty array', () => {
    return request(app.getHttpServer())
      .get('/checkpoints')
      .expect(200)
      .expect([]);
  });

  const createOrder = async (): Promise<Order> => {
    let order = {} as Order;
    await request(app.getHttpServer())
      .post('/orders')
      .send({
        orderNumber: 'some_order_number',
        trackingNumber: '00340000161200000001',
        courier: 'DHL',
        street: 'some_street',
        zipCode: 1111,
        city: 'city',
        destinationCountryIso3: 'string',
        email: 'test@test.tt',
        articleNumber: 'some_article_number',
        articleImageUrl: 'some_article_image_url',
        quantity: 0,
        productName: 'some_product_name',
      })
      .expect(201)
      .then((res) => {
        order = res.body;
      });

    return Promise.resolve(order);
  };

  describe('create new checkpoint', () => {
    it('create a new order with default parameters', async () => {
      const order = await createOrder();

      return request(app.getHttpServer())
        .post('/checkpoints')
        .send({
          orderNumber: order.orderNumber,
          trackingNumber: '00340000161200000001',
          location: 'some_location',
          status: 'some_status',
          statusText: 'some_status_text',
          statusDetail: 'some_status_detail',
          timestamp: new Date('2023-09-10T17:27:21.794Z'),
        })
        .expect(201)
        .then((res) => {
          const {
            id,
            trackingNumber,
            location,
            status,
            statusText,
            statusDetail,
            timestamp,
          } = res.body;
          expect(id).toBeDefined();
          expect(trackingNumber).toEqual('00340000161200000001');
          expect(location).toEqual('some_location');
          expect(status).toEqual('some_status');
          expect(statusText).toEqual('some_status_text');
          expect(statusDetail).toEqual('some_status_detail');
          expect(timestamp).toEqual('2023-09-10T17:27:21.794Z');
        });
    });
    it('return info about checkpoint by orderNumber', () => {
      return request(app.getHttpServer())
        .get('/checkpoints/some_order_number')
        .expect(200)
        .then((res) => {
          const result = res.body;

          expect(result).toBeDefined();
          expect(result.length).toBeGreaterThan(0);
        });
    });
  });
  describe('import data from csv', () => {
    it('returns array of imported checkpoints', () => {
      return request(app.getHttpServer())
        .post('/checkpoints/import-csv')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', './data/checkpoints.csv')
        .expect(201)
        .then((res) => {
          const result = res.body;
          expect(result).toBeDefined();
          expect(result.length).toBeGreaterThan(0);
        });
    });
  });
});

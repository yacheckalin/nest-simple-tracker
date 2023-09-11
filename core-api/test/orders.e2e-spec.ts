import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import path from 'path';

describe('OrdersController (e2e)', () => {
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
    return request(app.getHttpServer()).get('/orders').expect(200).expect([]);
  });

  describe('create new order and get info', () => {
    it('create a new order with default parameters', () => {
      return request(app.getHttpServer())
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
          const {
            id,
            orderNumber,
            trackingNumber,
            courier,
            street,
            zipCode,
            city,
            destinationCountryIso3,
            email,
            articleNumber,
            articleImageUrl,
            quantity,
            productName,
          } = res.body;
          expect(id).toBeDefined();
          expect(orderNumber).toEqual('some_order_number');
          expect(trackingNumber).toEqual('00340000161200000001');
          expect(courier).toEqual('DHL');
          expect(street).toEqual('some_street');
          expect(zipCode).toEqual(1111);
          expect(city).toEqual('city');
          expect(destinationCountryIso3).toEqual('string');
          expect(email).toEqual('test@test.tt');
          expect(articleNumber).toEqual('some_article_number');
          expect(articleImageUrl).toEqual('some_article_image_url');
          expect(quantity).toEqual(0);
          expect(productName).toEqual('some_product_name');
        });
    });

    it('returns info about the order by id', () => {
      return request(app.getHttpServer())
        .get('/orders/1')
        .expect(200)
        .then((res) => {
          const { id, courier } = res.body;

          expect(id).toEqual(1);
          expect(courier).toEqual('DHL');
        });
    });
    it('return info about the order by orderNumber', () => {
      return request(app.getHttpServer())
        .get('/orders/number/some_order_number')
        .expect(200)
        .then((res) => {
          const { id, orderNumber } = res.body;

          expect(id).toEqual(1);
          expect(orderNumber).toEqual('some_order_number');
        });
    });
    it('return info about articles by trackingNumber', () => {
      return request(app.getHttpServer())
        .get('/orders/get-articles/00340000161200000001')
        .expect(200)
        .then((res) => {
          const result = res.body;
          expect(result).toBeDefined();
          expect(result.length).toBeGreaterThan(0);
        });
    });

    it('return all orders by email', () => {
      return request(app.getHttpServer())
        .post('/orders/filter')
        .send({ email: 'test@test.tt' })
        .expect(201)
        .then((res) => {
          const result = res.body;

          expect(result).toBeDefined();
          expect(result.length).toBeGreaterThan(0);
        });
    });
  });
  describe('import data from csv', () => {
    it('returns array of imported orders', () => {
      return request(app.getHttpServer())
        .post('/orders/import-csv')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', './data/trackings.csv')
        .expect(201)
        .then((res) => {
          const result = res.body;
          expect(result).toBeDefined();
          expect(result.length).toBeGreaterThan(0);
        });
    });
  });
});

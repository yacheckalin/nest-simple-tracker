## Description

The application displays the orders and their tracking status for a specific user with ability to import data via csv-files.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stack

<div>Typescript</div>
<div>Nest.js</div>
<div>Next.js</div>
<div>Docker</div>
<div>TypeORM</div>
<div>PostgreSQL</div>
<div>Joi</div>

## The Flow

- specify customer email and filter orders
- open page with the list of orders
- click on specific order item to open order details page
- navigation above give you a chance to move backward and forward

## Use cases

Actors [client, admin]

- as a client, I want to be able filter orders by customer email on a separate screen
- as a client, I want to be able to see the list of orders for specified customer on a separate screen
- as a client, I want to be able navigate to the filter page from each page
- as a client, I want to be able to go to the order details page on a separate screen
- as a client, I want to be able to come back to the orders list page from the details page
- as an admin, I want to be able to add new order by API via import csv-file
- as an admin, I want to be able to add checkpoints info by API call via import csv-file

## Asumptions

- There could be several tracking_number for the item with one orderNumber

  > This extend functionality and give us a chance to send several articles for one order from different places / warehouses at a time. The detailed information with specific tracking_number will be reflected on the order details page

- The checkpoints groups by orderNumber and trackingNumber

## Non-happy pathes

##### Import orders

- if order is already in the DB we ignore it
- if order details do not pass validation check the transaction will be rollback

##### Add orders

- if you add order with the same orderNumber and trackingNumber
  > You can add several order items with the same orderNumber but different trackingNumbers at the same time

##### Add checkpoints

- if you add checkpoint to the order, with orderNumber which doesn't exists yet

##### Import checkpoints

- if checkpoint is already in the DB we ignore it
- if one of the checkpoint is not pass validation check the transaction will be rollback

## API Documentation

Swagger API Documentation is available on:

```bash
http://localhost:3000/api
```

## License

Nest is [MIT licensed](LICENSE).

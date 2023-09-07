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

## Non-happy pathes

##### Import orders

- if order is already in the DB (orderNumber, trackingNumber, articleNumber - constraint) we ignore it
- if order details do not pass validation check the transaction will be rollback

##### Add orders

- if add order with the same orderNumber, trackingNumber, articleNumber

##### Add checkpoints

- if add checkpoint to the order, with trackingNumber which doesn't exists yet (there is no order yet)

##### Import checkpoints

- if checkpoint is already in the DB (trackingNumber, timestamp) we ignore it
- if one of the checkpoint is not pass validation check the transaction will be rollback

## API Documentation

Swagger API Documentation is available on:

```bash
http://localhost:3000/api
```

## License

Nest is [MIT licensed](LICENSE).

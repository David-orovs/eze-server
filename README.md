# urban-coding-challenge

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This is the api server for the eze app.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

1. You'll need to have [Node.js](https://nodejs.org) v12 installed to run it on your local machine.

2. You also need to have access to a [MongoDB](https://www.mongodb.com) database.

### Installing

To install all the project dependencies, run

```
npm install
```

To set the environment variables, create a `.env` file with the following command

```
cp .env.example .env
```

Then, fill in values for the environment variables.

## Available Scripts

### `npm run dev`

Runs the app in the development mode.<br>

The server will restart if you make edits.<br>
Stack traces are sent along with the error responses.<br>
You will also see any API call logs in the console.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It compiles the app to commonjs code.

Your app is ready to be deployed!

### `npm start`

Runs the app in the production mode.

<br>

> **NB:** _This app and all required services (e.g MongoDB) have been containerised with Docker. If you have docker installed, run `docker-compose up` to start the server._

<br>

## API Spec

## Usage <a name = "usage"></a>

Send HTTP requests to the following endpoints.

| Endpoint             | Description            |
| -------------------- | ---------------------- |
| `GET /requests`      | Gets all requests      |
| `GET /requests/buy`  | Gets all buy requests  |
| `GET /requests/sell` | Gets all sell requests |

<br>

### Pagination

You can achieve pagination by passing the `page` and `limit` query parameters to any of the endpoints.

e.g `GET /requests/sell?page=3&limit=5`.

The example request above gets _5_ sell requests starting from the _10th_ request.

> **NOTE:** The default limit is _20_ and requests are ordered by the `createdAt` field in _descending_ order by default.

### Sorting

You can change the sort order by passing the `sort` query parameter to any endpoint.

e.g `GET /requests?sort=price`

The example given above orders the results by `price` in **ascending** order – _To get the results in **descending** order, add a minus sign (-) just before field_. i.e `GET /requests?sort=-price`.

### Filtering

You can filter using fields as the keys of the query params. e.g `GET /requests?grade=new`. This matches _grades_ that are equal _'new'_.

You can also perform complex queries using MongoDB's comparison query operators with the syntax `<field>[<operator>]=<value>`.

e.g `GET /requests/buy?price[lte]=500`

The example above matches all buy requests whose prices are less than or equal to \$500.

Listed below are a full list of supported operators.

| Name   | Description                                                         |
| ------ | ------------------------------------------------------------------- |
| eq     | Matches values that are equal to a specified value.                 |
| gt     | Matches values that are greater than a specified value.             |
| gte    | Matches values that are greater than or equal to a specified value. |
| lt     | Matches values that are less than a specified value.                |
| lte    | Matches values that are less than or equal to a specified value.    |
| ne     | Matches all values that are not equal to a specified value.         |
| exists | Matches documents that have the specified field.                    |

# Welcome to the Tweedr API, VERSION 2.0!!

To get the Tweedr API set up, you know the drill.

- Install dependencies
- Create database (`ada_tweedr_weekend_dev`)
- Run seed & migration
- Start the server!

## Connecting Tweedr 2.0 to React

1. Run `createdb ada_tweedr_weekend_dev` from the terminal. This will create the database that the tweedr express app is set up to use.
2. Run `psql -f migration_05192017.sql` from migration directory of the `tweedr-2` Express app.
3. Run `psql -f seed.sql` from the seed directory of the `tweedr-2` Express app.
4. From `tweedr-2` directory, which is the Express app, run `npm install`.
5. From the `tweedr-2` directory, run `create-react-app client`. This will create a new directory `client` with a react app in it. (It's convention to name the front-end portion of a full-stack build `client`.)
6. In `tweedr-2/client/package.json` add `  "proxy": "http://localhost:3001/"` to line 18.
7. Now, when you want to begin hacking, run `npm start` from the `tweedr-2` directory to start the Express app, and run `npm start` from the `tweedr-2/client` directory (in a new terminal tab) to start the React app.

Happy hacking!

## Endpoints

### GET `/api/tweeds`

Returns all tweeds in database.

```json
{
"message": "ok",
  "data": {
    "tweeds": [
      {
        "id": "1",
        "tweed_text": "Hello World!",
        "tweed_time": "1494788500041"
      },
      {
        "id": "2",
        "tweed_text": "I love using Tweedr... so much better than twitter.",
        "tweed_time": "1494788543350"
      },
      {
        "id": "3",
        "tweed_text": "React is the best!",
        "tweed_time": "1494788564011"
      },
      {
        "id": "4",
        "tweed_text": "testing tweed upload",
        "tweed_time": "1494792188509"
      }
    ]
  }
}
```

### GET `/api/tweeds/:id`

Returns information about one specific tweed.

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "1",
      "tweed_text": "Hello World!",
      "tweed_time": "1494788500041"
    }
  }
}
```

### POST `/api/tweeds`

Adds a tweed to the database. Request body must include a `tweed` property. Refer back to the [Express as an API lecture](https://git.generalassemb.ly/nyc-wdi-ada/LECTURE_U03_D01_Express-as-an-API/blob/master/adaquotesapi-final/public/src/main.js#L34) and the [Ada API docs](http://ada-api.herokuapp.com/#post-to-apiquotes) for how to format a POST request with fetch.

A sample response looks like this:

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "5",
      "tweed_text": "makin that tweed",
      "tweed_time": "1494793073028"
    }
  }
}
```

### PUT `/api/tweeds/:id`

Edits a tweed in the database, based on that tweed's ID in the database. Request body must include a `tweed` property. Refer back to the [Ada Quotes docs](http://ada-api.herokuapp.com/#put-to-apiquotesid) for how to format a `POST` request with `fetch`.

A sample response looks like this:

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "5",
      "tweed_text": "this tweed has been edited",
      "tweed_time": "1494793073028"
    }
  }
}
```


### DELETE `/api/tweeds/:id`

Remove a tweed from the database, based on that tweed's ID in the database.

The response looks like this:

```json
{
  "message": "tweed deleted"
}
```
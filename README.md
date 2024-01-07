Getting started
===============
This is a simple webshop application build with Laravel, Intertia and React.

## Prerequisites
- PHP
- Composer
- Node.js
- MySQL (in this case I am using docker-compose)

## Installation
1. Clone the repository
2. Run `composer install`
3. Run `npm install`

## Database
1. Run `docker-compose up -d` to start the MySQL container
<!-- 2. Run `php artisan migrate` to migrate the database -->
2. Use the sql dump in the root of the project `dump.sql` to populate the database with test data


##### Note
----
The database credentials are set to the following, if you don't want to use docker-compose you can change the credentials in the .env file.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mysql
DB_USERNAME=mysql
DB_PASSWORD=mysql
```

##### Note 2
----
There are 3 dump files.
- `dump.sql` is the full database dump (users, products, carts, orders)
- `dump_register.sql` is the database dump with users and products
- `dump_cart.sql` is the database dump with users, products and carts

## Run the application locally
Run in separate terminals:
1. `php artisan serve`
2. `npm run dev`

## User credentials
### Admin account
```
email: admin@test.com
password: P@ssw0rd1234
```

### Customer account
```
email: johndoe@test.com
password: P@ssw0rd1234
```


## Demo
### User demo
https://github.com/nightspite/laravel-ecom/assets/26671956/47e6b80a-d336-4ba4-b07f-03fd8dc27c94

### Admin demo
https://github.com/nightspite/laravel-ecom/assets/26671956/d44618ce-63bc-457a-9a45-cc2571a65443

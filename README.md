# service-wallet

## Project setup
```
npm install
 or
yarn add
```
## Initial configs
 
---
- `required node >= 18  && Mysql Data Base`
- `.env`
---

## Local Server
### Compiles and hot-reloads for development
```
npm run dev
```

### Server 1
server 1 [http://localhost:3000](http://localhost:3000).

Routes
- `GET POST PUT DELETE | http://localhost:3000/v1/cliente`
- `GET POST PUT DELETE | http://localhost:3000/v1/pago`
- `GET POST PUT DELETE| http://localhost:3000/v1/recarga`
- `GET POST PUT DELETE| http://localhost:3000/v1/wallet`


## extra

### configure mysql on
- `service-wallet\src\config\connection.ts`
```ts
export const AppDataSource = new DataSource({
    type: "mysql",
    host: '127.0.0.1',
    username: 'pandora',
    password: 'pandora',
    database: 'db_wallet_epayco',
    port: 8084,
    synchronize: false, // Set to false in production to prevent data loss
    logging: false,    // Set to true for debugging SQL queries
    entities: Entities,
    //migrations: [],
    subscribers: [],
});

```
## Run MysQL DB

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Entities } from "./entities";

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

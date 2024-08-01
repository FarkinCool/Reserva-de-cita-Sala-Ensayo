
import {DataSource} from "typeorm"
import { Appointment } from "../entities/Appointment"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { DB_HOST, DB_PORT,DB_USERNAME,DB_PASSWORD,DB_NAME } from "./envs"

 export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false, //* EN FALSE EN PRODUCCIÓN
    logging: ["query", "error"], //* EN FALSE EN PRODUCCIÓN // log del sql
    dropSchema: false, //false en produ
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
   });

  

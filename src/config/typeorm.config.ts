import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenv } from 'dotenv';

dotenv();

export const TYPE_ORM_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TYPE_ORM_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_CONFIG } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(TYPE_ORM_CONFIG)
  ],
})
export class AppModule {}

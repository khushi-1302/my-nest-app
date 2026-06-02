/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { ItemModule } from './item/item.module';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(process.env.MONGO_URI!), UserModule, EmployeeModule, ItemModule, LibraryModule ],
  controllers: [AppController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  
}

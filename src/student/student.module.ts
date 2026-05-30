/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema}])
  ]
})
export class StudentModule {}

/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';


@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){};

    @Get()
    getAll(){
        return this.studentService.getAllStudents();
    }

    @Get('db')
    async getStudents(){
        return this.studentService.getAllStudentsfromDb();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.studentService.getStudentById(Number(id))
    }

    @Post()
    create(@Body() body: { name: string; age: number } ){
        return this.studentService.createStudent(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: { name: string; age: number} ){
        return this.studentService.updateStudent(Number(id), body);
    }
    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: Partial<{ name: string; age: number}> ){  //need to only give the data which we want to change in the body
        return this.studentService.patchStudent(Number(id), body);
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.studentService.deleteStudent(Number(id));
    }

    @Post('db')                     // to add data in DB
    async addStudent(@Body() data: Partial<Student>){
        console.log('BODY RECEIVED:', data);
        return this.studentService.createStudentinDb(data);
    }

    // @Get('db')
    // async getStudents(){
    //     return this.studentService.getAllStudentsfromDb();
    // }

    @Get('db/:id')
     async getStudent(@Param('id') id: string){
        return this.studentService.getStudentByIdfromDb(id);
    }

    @Put('db/:id')
    async updateStudent(
        @Param('id') id: string,
        @Body() data: Partial<Student>,
    ){
        return this.studentService.updateStudentinDb(id,data);
    }

    @Patch('db/:id')
    async patchStudent(
        @Param('id') id: string,
        @Body() data: Partial<Student>,
    ){
        return this.studentService.patchStudentinDb(id,data);
    }
}

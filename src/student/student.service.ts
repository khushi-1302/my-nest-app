/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) { }
    private students = [
        { id: 1, name: 'Jack', age: 23 }, //0 index
        { id: 2, name: 'Jate', age: 25 }, //1 index
    ];

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find((s) => s.id === id);
        if(!student) throw new NotFoundException('Student not Found!');
        return student;
    }

    // POST
    createStudent(data: { name: string; age: number} ){
        const newStudent = {
            id: Date.now(),
            ...data,  //spread operator
        };
        this.students.push(newStudent);
        return newStudent;
    }

    // PUT
    updateStudent(id: number, data: {name: string; age: number}){
        const index = this.students.findIndex((s) => s.id === id);
        if(index === -1) throw new NotFoundException('Student not found!');
        this.students[index] = { id, ...data};
        return this.students[index];
    }

    // PATCH
    patchStudent(id: number, data: Partial<{ name: string; age: number}>){
        const student = this.getStudentById(id);
        Object.assign(student, data);  //copy of student with new partial data
        return student;
    }

    // DELETE
    deleteStudent(id: number){
        const index = this.students.findIndex((s) => s.id === id);
        if(index === -1) throw new NotFoundException('Student not found!');
        const deleted = this.students.splice(index,1) //1,1
        return { message: 'Student Deleted', student: deleted[0]};
    }

    //to insert data into db
    async createStudentinDb(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();  //save inserts data into database
    }

    async getAllStudentsfromDb(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async getStudentByIdfromDb(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec();
    }


}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
    ){}

    async createEmployee(): Promise<Employee>{
        const profile = await new this.profileModel({
            age: 20,
            qualification: 'Masters'
        }).save();
        const employee = new this.employeeModel({
            name: 'Khushii',
            profile: profile._id       //Referencing Data Modeling links by ids
        });
        return employee.save();
    }

    async findAll(): Promise<Employee[]> {
            return this.employeeModel.find().populate('profile').exec();   //if we dont use populate, db will populate only _id         field but we want all fields of profile in GET call
        }
}

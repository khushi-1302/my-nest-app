/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(): Promise<User>{
        const user = new this.userModel({
            name: 'Khushi Jalan',
            address: {
                street: '601 Street',
                city: 'Kanpur'
            }
        })
        return user.save();
    }

    async findAll(): Promise<User[]>{
        return this.userModel.find()
    }
}

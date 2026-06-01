/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')//Decorator
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    create(){
        return this.userService.createUser();
    }

    @Get()
    getAll(){
        return this.userService.findAll();
    }
}

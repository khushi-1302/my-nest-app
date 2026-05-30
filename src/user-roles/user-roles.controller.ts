/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
    @Get('admin-data') //route
    @UseGuards(RolesGuard)  //custom guard - can user access this route or not? YES/NO
    @Roles(Role.Admin)  //custom decorator which will set metadata on the below method
    getAdminData(){
        return { message: 'Only admin can access'}
    }
    @Get('user-data')
    getUserData(){
        return { message: 'Anyone can access'}}}
// @Roles(Role.Admin)           //decorators are decoded when app starts
//      ↓
// Roles decorator runs
//      ↓
// SetMetadata('roles', ['admin'])
//      ↓
// Metadata attached to getAdminData()

// REQUEST COMES
//      ↓
// @UseGuards(RolesGuard)
//      ↓
// canActivate() runs
//      ↓
// reflector.getAllAndOverride()
//      ↓
// Reads metadata from getAdminData()
//      ↓
// requiredRoles = ['admin']
//      ↓
// Reads request.headers['x-user-role']
//      ↓
// userRole = 'admin'
//      ↓
// ['admin'].includes('admin')
//      ↓
// true
//      ↓
// Controller method executes

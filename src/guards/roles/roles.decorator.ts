/* eslint-disable prettier/prettier */


//CUSTOM DECORATOR with name as Roles
import { SetMetadata } from "@nestjs/common"; //helper function to attach custom metadata to class/method
import { Role } from "./roles.enums";

export const ROLES_KEY = 'roles'; //metadata key name is ROLES_KEY - Later the guard will use this key to retrieve metadata.

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);  //ALLOWED ROLES read by REFLECTOR later
// here it will be like SetMetaData('roles',['admin']) where admin came from Role.Admin
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student{
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    age!: number;

    @Prop()
    email?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Tag } from "./tag.schema";

@Schema()
export class Item extends Document{
    @Prop()
    title!: string;

    @Prop({ type: [Tag] }) //one product can have multiple tags i.e. one to many
    tags!: Tag[];
}
export const ItemSchema = SchemaFactory.createForClass(Item);
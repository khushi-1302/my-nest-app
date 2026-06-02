/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Item } from './schemas/item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>){}

    async createItem(): Promise<Item> {
        const item = new this.itemModel({
            title: 'Gaming Laptop',
            tags: [
                { name: 'electronics'},
                { name: 'gaming'},
                { name: 'laptop'},
            ]
        })
        return item.save();
    }

    async getAllItems(): Promise<Item[]>{
        return this.itemModel.find();
    }
}

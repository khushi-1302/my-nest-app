/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}

    @Post()
    create(){
        return this.itemService.createItem();
    }

    @Get()
    getAll(){
        return this.itemService.getAllItems();
    }
}

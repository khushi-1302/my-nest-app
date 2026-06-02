/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema';
import { Book } from './schemas/book.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        @InjectModel(Library.name) private libraryModel: Model<Library>,
    ){}

    async createLibrary(): Promise<Library>{
        const book1 = await this.bookModel.create({
            title: 'JS Ka Champion', author: 'Khushi',
        })
        const book2 = await this.bookModel.create({
            title: 'HTML Ka Champion', author: 'Jack',
        })
        const library = new this.libraryModel({
            name: 'Central Library',
            books: [book1._id, book2._id]  //one to many using referencing
        })
        return library.save();
    }
    async getLibraries(): Promise<Library[]>{
        return this.libraryModel.find().populate('books');
    }
}

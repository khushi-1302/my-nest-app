/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService){}

    @Post()
    createLibrary(){
        return this.libraryService.createLibrary();
    }

    @Get()
    getLibraries(){
        return this.libraryService.getLibraries();
    }
}

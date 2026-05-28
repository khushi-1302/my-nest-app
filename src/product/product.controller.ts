/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')    //endpoint
export class ProductController {
    //here we will inject the service into the controller using constructor injection
    constructor(private readonly productService: ProductService){}
    @Get()
    @UseGuards(AuthGuard)
    getProducts(){
        return this.productService.getAllProducts();
    }
    @Get(':id')
    getProduct(@Param('id') id:string){  //this id is coming from frontend in string form
        return this.productService.getProductById(Number(id));
    }

}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable() //Decorator  used with services to inject the service into controller
export class ProductService {
    private products= [
        {id: 1, name: "Mobile", price: 20000},
        {id: 2, name: "Laptop", price: 80000},
        {id: 3, name: "Tablet", price: 50000}
    ];
    getAllProducts(){
        return this.products;
    }
    getProductById(id: number){
        return this.products.find((product)=> product.id === id);
    }
}

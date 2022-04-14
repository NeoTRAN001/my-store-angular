import { Injectable } from '@angular/core';
import { Product } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];

  constructor() { }

  addProduct(product: Product): void {
    this.myShoppingCart.push(product);
  }

  getTotal(): number {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getMyShoppingCart(): Product[] {
    return this.myShoppingCart;
  }
}

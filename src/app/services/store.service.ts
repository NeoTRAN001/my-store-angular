import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCartState: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() { }

  get myCart$() {
    return this.myCartState.asObservable();
  }

  addProduct(product: Product): void {
    this.myShoppingCart.push(product);
    this.myCartState.next(this.myShoppingCart);
  }

  getTotal(): number {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getMyShoppingCart(): Product[] {
    return this.myShoppingCart;
  }
}

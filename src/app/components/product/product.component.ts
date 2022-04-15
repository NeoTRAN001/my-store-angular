import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = { id: '', title: '', images: [], price: 0, description: '', category: { id: '', name: '', typeImg: '' } };
  @Output() addedProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() showProduct: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(): void {
    this.showProduct.emit(this.product.id);
  }
}

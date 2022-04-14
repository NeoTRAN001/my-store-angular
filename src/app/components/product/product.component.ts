import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = { id: '', title: '', image: '', price: 0, description: '', category: '' };
  @Output() addedProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }
}

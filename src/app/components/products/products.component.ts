import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      id: '1',
      name: 'Product',
      image: './assets/images/toy.jpg',
      price: 100
    },
    {
      id: '2',
      name: 'Product',
      image: './assets/images/toy.jpg',
      price: 100
    },
    {
      id: '3',
      name: 'Product',
      image: './assets/images/toy.jpg',
      price: 100
    },
    {
      id: '4',
      name: 'Product',
      image: './assets/images/toy.jpg',
      price: 100
    },
    {
      id: '5',
      name: 'Product',
      image: './assets/images/toy.jpg',
      price: 100
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.dto';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  productChosen: Product = { id: '', category: { id: '', name: '', typeImg: '' }, description: '', images: [], price: 0, title: '' };
  total: number = 0;
  showProductDetail: boolean = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data.filter(product => product.images.length > 0);
      });
  }

  onAddToShoppingCart(product: Product): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string): void {
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail();
        this.productChosen = data;
      });
  }

  createNewProduct(): void {
    const product: CreateProductDTO = {
      categoryId: 1,
      description: 'Blabalbala',
      images: ['https://placeimg.com/640/480/any'],
      price: 1560,
      title: 'Nuevo Producto'
    };

    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      });
  }

  updateProduct(): void {
    const changes: UpdateProductDTO = {
      title: 'Nuevo title 4'
    }

    this.productsService.update(this.productChosen.id, changes)
      .subscribe(data => {
        const productIndex: number = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex] = data;
        this.productChosen = data;
        this.toggleProductDetail();
      });
  }

  deleteProduct(): void {
    const id: string = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex: number = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.toggleProductDetail();
      });
  }
}

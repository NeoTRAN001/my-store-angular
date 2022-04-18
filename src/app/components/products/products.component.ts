import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
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
  limit: number = 10;
  offset: number = 0;
  statusDetail: 'loading' | 'sucess' | 'error' | 'init' | 'complete' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string): void {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
      .subscribe({
        next: (data) => {
          this.toggleProductDetail();
          this.productChosen = data;
          this.statusDetail  = 'sucess';
        },
        error: (e) => {
          this.statusDetail  = 'error';
          window.alert(e);
        },
        complete: () => this.statusDetail = 'complete'
      });
  }

  readAndUpdate(id: string): void {
    this.productsService.getProduct(id)
   .pipe( // EJecutar dos observadores cuando uno depende del anterior
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log(data);
    });

    this.productsService.fetchReadAndUpdate(id, {title: 'Change Title'})
    .subscribe(response => { // Ejecutar dos observadores sin que dependan entre ellos
      const read = response[0];
      const update = response[1];
    })
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

  loadMore() {
    this.productsService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }
}

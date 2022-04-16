import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'http://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<boolean>  {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}

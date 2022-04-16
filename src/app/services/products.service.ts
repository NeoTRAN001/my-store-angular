import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, retry } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'http://young-sands-07814.herokuapp.com/api/products';
  // private apiUrl: string = '/api/products'; // Ahora el archivo proxy.config.json se hace cargo de la URL

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) : Observable<Product[]> {
    let params: HttpParams = new HttpParams();

    if(limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(this.apiUrl, { params })
      .pipe(retry(3));
  }

  getProductsByPage(limit: number, offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset}
    }).pipe(retry(3));
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

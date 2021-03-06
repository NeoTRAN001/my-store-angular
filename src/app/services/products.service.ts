import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, retry, throwError, map, zip } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.dto';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = `${environment.API_URL}/api/products`; // proxy.config.json solución CORS

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    let params: HttpParams = new HttpParams();

    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }

  getProductsByPage(limit: number, offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset }
    }).pipe(retry(3));
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          switch (error.status) {
            case HttpStatusCode.InternalServerError:
              return throwError(() => new Error('Ups algo ha salido mal en el servidor'));

            case HttpStatusCode.Unauthorized:
              return throwError(() => new Error('Ups no tienes permisos para esto'));

            case HttpStatusCode.NotFound:
              return throwError(() => new Error('Ups al parecer el producto no existe'));

            default: return throwError(() => new Error('Ups algo ha salido mal'));
          }
        })
      );
  }

  create(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO): Observable<[Product, Product]> {
    return zip( // Ejecutar dos observadores sin que dependan entre ellos
      this.getProduct(id),
      this.update(id, dto)
    );
  }
}

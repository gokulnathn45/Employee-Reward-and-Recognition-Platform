import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCatalogModel } from '../Models/Product-catalog';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5065/api/products/';

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}productdetails`)
  }

  addProduct(product: Partial<ProductCatalogModel>): Observable<ProductCatalogModel> {
    return this.httpClient.post<ProductCatalogModel>(`${this.apiUrl}productsadd`, product)
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}editproduct/${id}`, product)
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}deleteproduct/${id}`)
  }



  buyProduct(userId: number, productId: number): Observable<any> {
    const buyUrl = `${this.apiUrl}buyproduct`;

    const requestBody = {
      userId: userId,
      productId: productId
    };

    return this.httpClient.post(buyUrl, requestBody);
  }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCatalogModel } from '../Models/Product-catalog';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private apiUrl = 'http://localhost:5065/api/rewards/';

  constructor(private http: HttpClient) { }

  getRewards(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}rewardpointdetails`);
  }
  getReward(id: number): Observable<ProductCatalogModel> {
    return this.http.get<ProductCatalogModel>(`${this.apiUrl}/${id}`);
  }
  CreateReward(reward: Partial<ProductCatalogModel>): Observable<ProductCatalogModel> {
    return this.http.post<ProductCatalogModel>(`${this.apiUrl}/add`, reward);
  }
  updateProduct(id: number, reward: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reward);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}

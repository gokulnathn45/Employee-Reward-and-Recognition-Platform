import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PointallocationService {

  apiUrl = "http://localhost:5065/api/allocation/";
  httpclient: any;

  constructor(private http: HttpClient) { }


  allocatePoints(allocate: any): Observable<any> {
    console.log(allocate);
    return this.http.post<any>(`${this.apiUrl}pointadd`, allocate, httpOptions);
  }


  getredeempoints(allocatepoints: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/pointallocation`, allocatepoints, { responseType: 'text' });

  }

  userAllocationlist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}allocationdetails`)
  }

  getTopThreeAllocation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}topthreeallocation`)
  }
  getTopThreeReward(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}recentallocation/${id}`)
  }

  getTransactionDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}transactiondetails`)
  }

  getTransactionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}transactiondetails/${id}`)
  }

  getTopThreeTransaction(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}topthreetransaction`)
  }


}

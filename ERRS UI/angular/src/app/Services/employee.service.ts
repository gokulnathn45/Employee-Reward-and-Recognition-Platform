import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5065/api/allocation/'

  constructor(private http: HttpClient) { }

  getPoint(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}currentpoint/${id}`)
  }
  getredeempoint(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}redeemedpoint/${id}`)
  }
}



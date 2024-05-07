import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, concatWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  getCurrentUserId(): Observable<any> {

    const userId = localStorage.getItem('userId')
    return this.http.get<any>(`${this.baseUrl}/${userId}`)

  }

  isLoggedIn(): boolean {
    if(localStorage.getItem("userId"))
    {
      return true;
    }
    else
    {
      return false
    }
    
  }

  signin(userId:any): void {
    localStorage.setItem('userId',userId)
    this.isAuthenticated = true;
  }
  signout(): void {
    localStorage.clear()
    this.isAuthenticated = false;
  }
  private baseUrl: string = 'http://localhost:5065/api/login/';

  constructor(private http: HttpClient) { }
  signup(model: any) {
    var url = `${this.baseUrl}signup`;
    console.log('url',url);
    return this.http.post<any>(url, model);
  }
  login(logindto: any) {
    var url = `${this.baseUrl}loginendpoint`;
    console.log('url', url);
    return this.http.post<any>(url, logindto);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectnameService {
  private apiUrl = 'http://localhost:5065/api/login/'

  constructor(private http: HttpClient) { }
  // getUsers(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl).pipe(map(users => users.filter((user: { id: number; }) => user.id !== 1)));;
  // }
  getUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}approvedemployee`)
  }
  getuser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }
  adduser(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addname`, newUser)
  }
  getRewards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rewarddetails`)
  }
  getTopThree(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}topthreeusers`)
  }
  getnumberofemployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}employeecount`)
  }

 
}

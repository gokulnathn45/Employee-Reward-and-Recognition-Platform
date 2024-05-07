import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRewardService {

  apiUrl = "http://localhost:5065/api/rewards/";
  httpclient: any;

  constructor(public http: HttpClient) { }

  getadminrewards() {
    return this.http.get<any>(`${this.apiUrl}rewarddetails`)
  }
  addadminreward(reward: any) {
    return this.http.post(`${this.apiUrl}rewardadd`,reward)
  }
  deletereward(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}deletereward/${id}`)
  }
  editreward(id: number, reward: any): Observable<any> {
    return this.http.put(`${this.apiUrl}editreward/${id}`, { ...reward, id: id })
  }
}

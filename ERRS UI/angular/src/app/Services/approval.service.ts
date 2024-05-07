import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private apiUrl = 'http://localhost:5065/api/login/'

  constructor(private http: HttpClient) { }

  getPendingEmployees() {
    return this.http.get(`${this.apiUrl}loginstatuspending`)

  }
  updateEmployeeStatus(id: number, status: string) {
    console.log(status, "status");
    return this.http.patch(`${this.apiUrl}loginstatuschange/${id}`, { loginstatus: status })
  }

}

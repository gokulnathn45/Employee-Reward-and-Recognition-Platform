import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PointallocationService } from 'src/app/Services/pointallocation.service';
import { SelectnameService } from 'src/app/Services/selectname.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userId!: number;
  firstName!: string;
  lastName!: string;
  topThreeUsers: any[] = []
  pointsGained!: number;
  numberofemployees!: number;
  topThreeRewards: any;
  topThreeTransactions: any;
  constructor(private authService: AuthService,
    private router: Router, private http: HttpClient, private employeeservice: EmployeeService, private selectnameservice: SelectnameService, private pointallocationservice: PointallocationService) {

  }
  ngOnInit(): void {
    this.fetchTopThreeusers()
    this.getNumberofEmployees()
    this.fetchTopThreeRewards()
    this.fetchTopThreeTransactions()

    this.userId = Number(localStorage.getItem('userId'));
    this.employeeservice.getPoint(this.userId).subscribe((Response) => {
      this.firstName = Response.firstName;
      this.lastName = Response.lastName;
    },
      (error) => {
        console.error('Error fteching points');
      }
    )

  }

  fetchTopThreeusers() {
    this.selectnameservice.getTopThree().subscribe({
      next: (res: any) => {
        console.log(res)
        this.topThreeUsers = res
      },
      error: (err: any) => console.log(err),
    })
  }

  getNumberofEmployees() {
    this.selectnameservice.getnumberofemployees().subscribe({
      next: (res: any) => {
        this.numberofemployees = res
      },
      error: (err: any) => console.log(err),
    })



  }

  fetchTopThreeRewards() {
    this.pointallocationservice.getTopThreeAllocation().subscribe({
      next: (res: any) => {
        console.log(res)
        this.topThreeRewards = res;
      },
      error: (err: any) => console.log(err),
    })
  }
  fetchTopThreeTransactions() {
    this.pointallocationservice.getTopThreeTransaction().subscribe({
      next: (res: any) => {
        this.topThreeTransactions = res;
      },
      error: (err: any) => console.log(err),
    })

  }
}



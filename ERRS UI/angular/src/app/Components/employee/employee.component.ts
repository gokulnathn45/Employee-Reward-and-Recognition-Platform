import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { Reward } from 'src/app/Models/reward';
import { AuthService } from 'src/app/Services/auth.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PointallocationService } from 'src/app/Services/pointallocation.service';
import { SelectnameService } from 'src/app/Services/selectname.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  userId!: number
  bytePoints!: number;
  pointsGained!: number;
  redeemedPoints!: number;
  firstName!: string;
  lastName!: string;
  topThreeUsers: any[] = [];
  fetchTopThreeRewards!: any[];

  constructor(private authService: AuthService, private employeeservice: EmployeeService, private selectnameservice: SelectnameService, private pointallocationservice: PointallocationService) {

  }

  ngOnInit(): void {
    this.fetchTopThreeUsers()
    this.userId = Number(localStorage.getItem('userId'));
    this.getredeemedPoints(this.userId)
    this.fetchTopThreeReward(this.userId)


    this.employeeservice.getPoint(this.userId).subscribe((Response) => {
      this.bytePoints = Response.bytePoints;
      this.firstName = Response.firstName;
      this.lastName = Response.lastName
      console.log('Reward points', Response)
    },
      (error) => {
        console.error('Error fetching points');
      })



  }

  fetchTopThreeUsers() {
    this.selectnameservice.getTopThree().subscribe({
      next: (res: any) => {
        console.log(res)
        this.topThreeUsers = res
      },
      error: (err: any) => console.log(err),
    })


  }
  getredeemedPoints(userId: number) {
    this.employeeservice.getredeempoint(userId).subscribe({
      next: (res: any) => {
        console.log("points" + res)
        this.redeemedPoints = res
      },
      error: (err: any) => console.log(err),
    })
  }
  fetchTopThreeReward(userId: number) {
    this.pointallocationservice.getTopThreeReward(userId).subscribe({
      next: (res: any) => {
        this.fetchTopThreeRewards = res
      },
      error: (err: any) => console.log(err),
    })
  }
}
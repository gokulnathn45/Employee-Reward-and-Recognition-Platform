import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { SelectnameService } from '../../Services/selectname.service';
import { PointallocationService } from '../../Services/pointallocation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RewardService } from '../../Services/reward.service';
import { SnackService } from 'src/app/Services/snack.service';



@Component({
  selector: 'app-point-allocate',
  templateUrl: './point-allocate.component.html',
  styleUrls: ['./point-allocate.component.css']
})
export class PointAllocateComponent implements OnInit {

  PointForm: FormGroup = new FormGroup({
    employeeNames: new FormControl(''),
    rewardName: new FormControl(''),
    points: new FormControl(''),
    allocationDate: new FormControl('')

  })



  rewards$!: Observable<any[]>;

  employees$!: Observable<any[]>

  selectedEmployee = new FormControl();

  selectedReward: any

  selectedPoints: number = 0;

  pointallocation: any;

  selectedDate: Date = new Date();
  // employees$ = Observable<Employee[]>;


  constructor(private formBuilder: FormBuilder, private selectNameService: SelectnameService, private rewardService: RewardService, private pointallocationservice: PointallocationService, private snackService: SnackService,
    public dialogRef: MatDialogRef<PointAllocateComponent>,

  ) {

  }
  ngOnInit(): void {


    this.employees$ = this.selectNameService.getUsers()

    this.rewards$ = this.rewardService.getRewards()




  }




  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    ``
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  onRewardSelectionChange() {
    
    
    if (this.selectedReward) {
      this.selectedPoints = this.selectedReward.points;
      console.log("reward point", this.selectedPoints)
    }
  }
  onFormSubmit() {

    if (!this.selectedEmployee.value || !this.selectedReward) {
      this.snackService.openSnackBar("Employee or Reward is not selected");

      return;
    }
    const selectedUserIds =
      this.selectedEmployee.value.map((element: any) => element.id);
    const requestPayload =
      [{
        selectedUserIds: selectedUserIds,
        rewardId: this.selectedReward.rewardId,
        points: this.selectedPoints,
        allocationDate: this.selectedDate
      }]

    console.log(requestPayload);



    this.pointallocationservice.allocatePoints(requestPayload).subscribe((res: any) => {
      console.log(res);
      this.snackService.openSnackBar("Point allocated successfully");
      this.dialogRef.close();
    },
      (error: any) => {
        console.error('Error while allocating points:', error);
      }
    )


  }

}



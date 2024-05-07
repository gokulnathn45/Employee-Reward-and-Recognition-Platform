import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminRewardService } from 'src/app/Services/admin-reward.service';
import { RewardAddEditComponent } from 'src/app/Components/reward-add-edit/reward-add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  [x: string]: any;
  showDialogue:boolean=false;
  dialogMessage!:string;
  rewardToBeDeleted:number = 0 

  displayedColumns: string[] = ['rewardName', 'points', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private adminrewardservice: AdminRewardService, private router: Router, private snackService: SnackService) { }
  ngOnInit(): void {
    this.getRewardList();


  }



  AddingForm() {
    const dialogRef = this._dialog.open(RewardAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRewardList();
        }

      },
    })
  }

  getRewardList() {
    this.adminrewardservice.getadminrewards().subscribe({
      next: (res: any
      ) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteReward(id:number) {
  this.dialogMessage = "Are You Sure To Delete ?"
  this.showDialogue=true;
  this.rewardToBeDeleted = id

  }
  onDialogueConfirm(){
    console.log(this.rewardToBeDeleted)
     
      this.adminrewardservice.deletereward(this.rewardToBeDeleted).subscribe({
        next: (res) => {
          this.snackService.openSnackBar("Reward Deleted")
          this.getRewardList();
          this.showDialogue=false;
          this.rewardToBeDeleted = 0
        },
        error: console.log,
      })
  }
  onDialogueCancel(){
    this.showDialogue=false;
  }
  OpenEditForm(data: any) {
    const dialogRef = this._dialog.open(RewardAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getRewardList();
        }
      },
    });

  }
}











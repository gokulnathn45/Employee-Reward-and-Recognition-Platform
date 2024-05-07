import { Component, OnInit, ViewChild, ɵNG_ELEMENT_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApprovalService } from 'src/app/Services/approval.service';
import { AuthService } from 'src/app/Services/auth.service';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.css']
})
export class EmployeeStatusComponent implements OnInit {

  showDialogue: boolean = false;
  dialogMessage!: string;
  showDialogueApprove: boolean = false;
  displayedColumns: string[] = ['firstName', 'lastName', 'loginStatus', 'activity']
  dataSource!: MatTableDataSource<any>;
  selectedId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private authService: AuthService,
    private approvalService: ApprovalService, private snackService: SnackService,
    private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }


  rejectuser(id: number) {
    this.dialogMessage = "Are You Sure to Reject?"
    this.showDialogue = true;
    this.selectedId = id;
  }
  onDialogueReject(id: number) {
    this.approvalService.updateEmployeeStatus(this.selectedId, 'reject').subscribe(
      (res: any) => {
        this.snackService.openSnackBar("Rejected")
        console.log(res)
        this.getApprovalList()
        this.showDialogue = false;
      }
    )

  }
  onDialogueRejectCancel() {
    this.showDialogue = false;
  }
  Approveuser(id: number) {
    this.selectedId = id;
    this.dialogMessage = "Are You Sure to Approve?"
    this.showDialogueApprove = true;
  }
  onDialogueApprove(id: number) {
    console.log("approved", id);
    this.approvalService.updateEmployeeStatus(this.selectedId, 'approved').subscribe(
      (res: any) => {
        this.snackService.openSnackBar("Accepted")
        console.log(res)

        this.getApprovalList()
        this.showDialogueApprove = false;


      }
    )
  }
  onDialogueApproveCancel() {
    this.showDialogueApprove = false;
  }



  getApprovalList() {
    this.approvalService.getPendingEmployees().subscribe({
      next: (res: any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      },
      error:
        console.log,
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}

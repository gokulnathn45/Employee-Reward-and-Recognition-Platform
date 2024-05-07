import { Component, OnInit, ViewChild } from '@angular/core';
import { PointallocationService } from '../../Services/pointallocation.service';
import { UserDto } from 'src/app/Models/user-model';
import { SelectnameService } from 'src/app/Services/selectname.service';
import { AuthService } from 'src/app/Services/auth.service';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PointAllocateComponent } from 'src/app/Components/point-allocate/point-allocate.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {


  displayedColumns: string[] = ['firstname', 'rewardName', 'points', 'allocationDate',]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private pointAllocationService: PointallocationService, private selectnameservice: SelectnameService, private authservice: AuthService, private router: Router) { }

  allocatepoint() {
    const dialogRef = this._dialog.open(PointAllocateComponent)
    dialogRef.afterClosed().subscribe(res => this.ngOnInit())
  }
  ngOnInit(): void {

    this.getAllocateList();

  }
  getAllocateList() {
    this.pointAllocationService.userAllocationlist().subscribe({
      next: (res: any) => {
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
}
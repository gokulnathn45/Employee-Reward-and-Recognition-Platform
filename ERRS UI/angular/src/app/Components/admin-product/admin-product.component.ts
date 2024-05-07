import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { RewardService } from '../../Services/reward.service';
import { ProductCatalogModel } from 'src/app/Models/Product-catalog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductAddEditComponent } from 'src/app/Components/admin-product-add-edit/admin-product-add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/Services/product.service';
import { SnackService } from 'src/app/Services/snack.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  showDialogue:boolean=false;
  dialogMessage!:string;
  productToBeDeleted:number = 0

  openAddEditForm() {
    const DialogRef = this._dialog.open(AdminProductAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    })
  }

  displayedColumns: string[] = ['productName', 'category', 'manufacturer', 'bytesValue', 'quantity', 'productImage', 'action']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rewards: ProductCatalogModel[] = [];
  editedRewards: any[] = []


  constructor(private _dialog: MatDialog, private productservice: ProductService,private snackService:SnackService) {


  }

  getProductList() {
    this.productservice.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.getProductList();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id:number) {
    this.dialogMessage = "Are You Sure To Delete?"
    this.showDialogue = true;
    this.productToBeDeleted = id
  }
  onDialogueConfirm()
  {
    this.productservice.deleteProduct(this.productToBeDeleted).subscribe({
      next: (res) => {
        this.snackService.openSnackBar("Product Deleted");
        this.getProductList();
        this.showDialogue = false;
      },
      error: console.log,
    })
  }
  onDialogueCancel(){
    this.showDialogue = false;
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AdminProductAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getProductList();
        }
      }
    })



  }
}

;


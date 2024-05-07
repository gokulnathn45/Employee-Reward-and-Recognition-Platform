import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { AuthService } from 'src/app/Services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  showDialogue: boolean = false;
  dialogMessage!: string;
  productToBuy: any

  displayedColumns: string[] = ['productName', 'category', 'manufacturer', 'bytesValue', 'quantity', 'imageurl', 'action']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private productService: ProductService, private authService: AuthService, private snackService: SnackService) { }
  ngOnInit(): void {
    this.getProductList();

  }
  getProductList() {
    this.productService.getAllProducts().subscribe({
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
  
  
  
  buyproduct(product: any): void {
    this.dialogMessage = "Are You Sure to Buy This Item?"
    this.showDialogue = true;
    this.productToBuy = product
    
  }
    onDialogueConfirm(){

      console.log(this.productToBuy);
      if (this.productToBuy.quantity > 0) {
        const userId: number = Number(localStorage.getItem('userId'))!;
        console.log(userId);
        console.log(this.productToBuy.id)
        this.productService.buyProduct(userId, this.productToBuy.id).subscribe(

          (Response) => {
            if (Response.statusCode === 400) {
              console.error('Error buying product:', Response.value)
              this.snackService.openSnackBar("Insufficient points to buy the reward")
            }
            else {
              console.log('Product bought successfully:', Response.value);
              this.snackService.openSnackBar(`${this.productToBuy.productName} bought successfully`)

            }

            this.getProductList();
            this.showDialogue = false;
            this.productToBuy = null
          },

        )


      } else {
        this.snackService.openSnackBar("Sorry! Product out of stock")
      }
      
    }
    onDialogueCancel(){
      this.showDialogue = false;
    }
    



  
  }


  


 
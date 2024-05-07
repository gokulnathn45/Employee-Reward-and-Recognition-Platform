import { Component, Inject, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-admin-product-add-edit',
  templateUrl: './admin-product-add-edit.component.html',
  styleUrls: ['./admin-product-add-edit.component.css']
})
export class AdminProductAddEditComponent implements OnInit {
  onSelectFile(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.productForm.value.productImage = e.target?.result!
      };
      reader.readAsDataURL(file);
    }

  }
  productForm: FormGroup = new FormGroup({
    productName: new FormControl(''),
    category: new FormControl(''),
    manufacturer: new FormControl(''),
    quantity: new FormControl(''),
    bytesValue: new FormControl(''),
    productImage: new FormControl()
  });
  submitted = false;

  category: string[] = [
    'Electronics',
    'Apparels',
    'GiftCard'
  ];

  constructor(private formBuilder: FormBuilder, private productservice: ProductService, private snackService: SnackService,
    private _dialogRef: MatDialogRef<AdminProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.formBuilder.group({
      productName: '',
      category: '',
      manufacturer: '',
      quantity: '',
      bytesValue: '',
      productImage: ''

    })
  }
  ngOnInit(): void {


    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      manufacturer: ['', Validators.required],
      quantity: ['', Validators.required],
      bytesValue: ['', Validators.required],
      productImage: ['', Validators.required]
    });
    this.productForm.patchValue(this.data);
  }

  get productFunction(): { [key: string]: AbstractControl } {

    return this.productForm.controls;


  }

  onFormSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      if (this.data) {
        this.productservice.updateProduct(this.data.id, { ...this.productForm.value, id: this.data.id }).subscribe({
          next: (val: any) => {
            this.snackService.openSnackBar("Product Details Updated");
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      else {
        this.productservice.addProduct(this.productForm.value).subscribe({
          next: (res: any) => {
            this.snackService.openSnackBar("Product Added Successfully");
            this._dialogRef.close(true);

          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }

    }



  }
}

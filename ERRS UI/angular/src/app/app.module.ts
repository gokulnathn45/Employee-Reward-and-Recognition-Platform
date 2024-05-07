import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './Components/admin/admin.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { PointsComponent } from './Components/points/points.component';
import { EditComponent } from './Components/edit/edit.component';
import { ProductsComponent } from './Components/products/products.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeStatusComponent } from './Components/employee-status/employee-status.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './Components/admin-product/admin-product.component';
import { EmployeeDashboardComponent } from './Components/employee-dashboard/employee-dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RewardsComponent } from './Components/rewards/rewards.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RewardAddEditComponent } from './Components/reward-add-edit/reward-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PointAllocateComponent } from './Components/point-allocate/point-allocate.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminProductAddEditComponent } from './Components/admin-product-add-edit/admin-product-add-edit.component';
import { MatSelect } from '@angular/material/select';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { EmployeeTransactionComponent } from './Components/employee-transaction/employee-transaction.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogBoxComponent } from './Components/dialog-box/dialog-box.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    EmployeeComponent,
    AdminProductComponent,
    PointsComponent,
    EditComponent,
    ProductsComponent,
    EmployeeStatusComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    RewardsComponent,
    RewardAddEditComponent,
    PointAllocateComponent,
    AdminProductAddEditComponent,
    TransactionHistoryComponent,
    EmployeeTransactionComponent,
    DialogBoxComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, MatSelectModule, MatTableModule, MatButtonModule, MatToolbarModule,
    MatIconModule, MatDialogModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatPaginatorModule, MatInputModule, MatSortModule,
    MatSelectModule,MatSnackBarModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

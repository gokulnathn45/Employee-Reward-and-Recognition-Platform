import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { AdminProductComponent } from './Components/admin-product/admin-product.component';
import { PointsComponent } from './Components/points/points.component';
import { EditComponent } from './Components/edit/edit.component';
import { ProductsComponent } from './Components/products/products.component';
import { AuthGuard } from './auth.guard';
import { EmployeeStatusComponent } from './Components/employee-status/employee-status.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './Components/employee-dashboard/employee-dashboard.component';
import { RewardsComponent } from './Components/rewards/rewards.component';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { EmployeeTransactionComponent } from './Components/employee-transaction/employee-transaction.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employee', component: EmployeeDashboardComponent,canActivate:[AuthGuard], children: [
      { path: '', component: EmployeeComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'employee-transaction', component: EmployeeTransactionComponent }

    ]
  },
  {
    path: 'admin', component: AdminDashboardComponent,canActivate:[AuthGuard],children: [
      { path: '', component: AdminComponent },
      { path: 'admin-product', component: AdminProductComponent },
      { path: 'point', component: PointsComponent },
      { path: 'edit', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'employee-status', component: EmployeeStatusComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent }



    ]
  }

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

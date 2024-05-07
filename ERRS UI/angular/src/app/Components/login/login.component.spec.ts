// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent, } from "./login.component";
import { AuthService } from "src/app/Services/auth.service";
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { SnackService } from "src/app/Services/snack.service";
import { Router, RouterEvent } from "@angular/router";
import { RouterTestingHarness, RouterTestingModule } from "@angular/router/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
let authServiceSpy: jasmine.SpyObj<AuthService>;
let snackServiceSpy: jasmine.SpyObj<SnackService>;
let routerSpy: jasmine.SpyObj<Router>;
let formGroupSpy: jasmine.SpyObj<FormGroup>;

let beforeEachFunction = async () => {
  authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signin']);
  formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['FormBuilder']);
  snackServiceSpy = jasmine.createSpyObj('SnackService', ['openSnackBar']);
  // snackServiceSpy = jasmine.createSpyObj('SnackService',['openSnackBar'])
  routerSpy = jasmine.createSpyObj('Router', ['Router']);
  formGroupSpy = jasmine.createSpyObj('FormGroup', ['FormGroup', 'FormControl'])

  await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    providers: [
      { provide: AuthService, useValue: authServiceSpy },
      { provide: FormBuilder, useValue: formBuilderSpy },
      { provide: SnackService, useValue: snackServiceSpy },
      { provide: Router, useValue: routerSpy },
      { provide: FormGroup, useValue: formGroupSpy }
    ],
    imports: [
      RouterTestingModule,
      MatSnackBarModule,
      FormsModule,
      ReactiveFormsModule

    ]
  })
    .compileComponents();

  fixture = TestBed.createComponent(LoginComponent);
  component = fixture.componentInstance;

  routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
  authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  snackServiceSpy = TestBed.inject(SnackService) as jasmine.SpyObj<SnackService>;
  formGroupSpy = TestBed.inject(FormGroup) as jasmine.SpyObj<FormGroup>;

}
describe('onlogin', () => {
  beforeEach(async () => {
    await beforeEachFunction();
  })
  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });
  it('check login is successfull', () => {
    spyOn(routerSpy, 'navigate');

    let user: any;
    user = {
      role: "employee"
    }
    const ngFormMock = {
      value: user,
      valid: true,
    }
    authServiceSpy.login.and.returnValue(of(user))
    component.onlogin()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['employee'])
  })

})





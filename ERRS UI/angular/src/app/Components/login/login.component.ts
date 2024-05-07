import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  });
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackService: SnackService
  ) { }
  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    
  }
  get loginfunction(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onlogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // debugger;

          console.log(res.value);
          localStorage.setItem('userId', res.id)
          this.auth.signin(res.id);
          if (res.userType == 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['employee']);
          }



        },
        error: (err) => {

          this.snackService.openSnackBar(err?.error.errors?.user[0]);
        },
      });
    }
  }
}

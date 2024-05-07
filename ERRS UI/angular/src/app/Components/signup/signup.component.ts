import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackService: SnackService
  ) { }

  get signupFunction(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  Onsignup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth
        .signup({
          ...this.signupForm.value,
        })
        .subscribe({
          next: (res) => {
            if (res)
              this.snackService.openSnackBar(res);
            // this.signupForm.reset();

            if (res == "user created successfully") {
              this.router.navigate(['']);

            }

          },
          error: (err) => {
            if (err.error?.Identifier == "User") {
              this.snackService.openSnackBar(err.ErrorMessage);
            } else {
              console.error("An unexpected error occurred")
            }
          },
        });
    }
  }
}

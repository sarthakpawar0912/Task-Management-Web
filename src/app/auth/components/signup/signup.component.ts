import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
 
  signupForm: FormGroup;
  hidePassword = true;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.snackbar.open('Please fill all fields correctly.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: (res) => {
        console.log("Signup Response:", res); // Debugging: Check the actual response
        
        if (res?.userId || res?.id) {  // Ensure response contains user data
          this.snackbar.open('Signup successful! Redirecting...', 'Close', {
            duration: 2000, // Show message for 2 sec
            panelClass: 'success-snackbar',
          });
          
          setTimeout(() => {
            this.signupForm.reset();
            this.router.navigateByUrl('/login'); // Redirect faster (1 sec)
          }, 1000);
        } else {
          this.snackbar.open('Signup failed. Unexpected response.', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
        }
      },
      error: (err) => {
        console.error("Signup Error:", err); // Debugging: Check the actual error
        let errorMsg = 'Signup failed. Please try again.';
        
        // Check if the error contains a specific message from the backend
        if (err?.error?.message) {
          errorMsg = err.error.message;
        } else if (typeof err?.error === 'string') {
          errorMsg = err.error;
        }

        this.snackbar.open(errorMsg, 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
      },
    });
  }
  
}
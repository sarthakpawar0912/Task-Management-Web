import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe((res)=>{
    console.log(res);
    if(res.userId != null){
      const user={
        id:res.userId,
        role:res.userRole
      }
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);
      if(StorageService.isAdminLoggedIn())
        this.router.navigateByUrl("/admin/dashboard");
      else if(StorageService.isEmployeeLoggedIn())
        this.router.navigateByUrl("/employee/dashboard");
    
      this.snackbar.open(" Login successful","close",{duration:5000});
    }else{
      this.snackbar.open("Invalid Credentails","Close",{duration:5000,panelClass:"error-snackbar"});
    }
  })
  }
  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
  isEmployeeLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.checkLoginStatus();

    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
  }

  logout() {
    StorageService.logout();
    this.checkLoginStatus(); // Update login state after logout
    this.router.navigateByUrl("/login");
  }
}
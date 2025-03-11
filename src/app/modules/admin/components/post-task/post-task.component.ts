import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: false,
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})

export class PostTaskComponent implements OnInit {
  taskForm!: FormGroup;
  listOfEmployees: any[] = [];
  listOfPriorities: string[] = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUsers();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
    });
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.listOfEmployees = res;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.snackBar.open('Error fetching employees. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  postTask(): void {
    if (this.taskForm.valid) {
      this.adminService.postTask(this.taskForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Task Posted Successfully', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (error) => {
          console.error('Error posting task:', error);
          this.snackBar.open('Failed to post task', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      console.error('Form is invalid:', this.taskForm.errors);
    }
  }
}
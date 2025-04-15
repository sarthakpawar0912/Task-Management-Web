import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})

export class UpdateTaskComponent {

  id!: number;  // Task ID from URL
  updateTaskForm!: FormGroup;  // Reactive form for updating tasks
  listOfEmployees: any[] = [];  // Employee list
  listOfPriorities: string[] = ['LOW', 'MEDIUM', 'HIGH'];  // Priority levels
  listOfTaskStatus: string[] = ["PENDING","INPROGRESS","COMPLETED","DEFERRED","CANCELLED"];  // Priority levels
  isLoading: boolean = false;  // Loading state

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get("id");
this.id = idParam ? Number(idParam) : 0;

if (isNaN(this.id) || this.id <= 0) {
  console.error("Invalid task ID:", idParam);
  this.snackBar.open('Invalid Task ID. Redirecting...', 'Close', { duration: 3000 });
  this.router.navigate(['/admin/tasks']); // Redirect if ID is invalid
}
    this.initializeForm(); // Initialize the form structure
    this.getUsers(); // Fetch the employee list
    this.getTaskById(); // Fetch the task details
  }
  // Initialize the form with required fields
  initializeForm(): void {
    this.updateTaskForm = this.fb.group({
      employeeId: ['', [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
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

  // Fetch task details and populate the form
  getTaskById() {
   this.adminService.getTaskById(this.id).subscribe((res)=>{
    this.updateTaskForm.patchValue(res);
    console.log(res);
  })}

  // Update task function
  updateTask(): void {
  console.log("Task data before update:", this.updateTaskForm.value); // Debugging

  this.adminService.updateTask(this.id, this.updateTaskForm.value).subscribe({
    next: (res) => {
      console.log("Task updated successfully:", res); // Debugging response
      this.snackBar.open("Task updated successfully", "Close", { duration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
    },
    error: (error) => {
      console.error("Error updating task:", error); // Debugging error
      this.snackBar.open("Error updating task", "Close", { duration: 5000, panelClass: "error-snackbar" });
    }
  });
}

}
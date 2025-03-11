import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  employeeName: string;
  priority: string;
  taskStatus: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any=[];
  constructor(private service:EmployeeService,
    private snackbar:MatSnackBar
  ) { 
    this.getTasks();
  }

  getTasks(): void {
    this.service.getEmployeeTaskById().subscribe({
      next: (res) => {
        console.log('Employee Tasks:', res);
        this.listOfTasks = res;
      },
      error: (error) => {
        console.error('Error fetching employee tasks:', error);
      }
    });
  }

  updateStatus(id: number, status: string): void {
    this.service.updateStatus(id, status).subscribe({
      next: (res) => {
        console.log('Update response:', res);
        if (res) { // ✅ Ensure response exists
          this.snackbar.open('Task status updated successfully', 'Close', {
            duration: 5000
          });
          this.getTasks(); // Refresh tasks after update
        } else {
          this.snackbar.open('Error while updating task', 'Close', {
            duration: 5000
          });
        }
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.snackbar.open('Error while updating task', 'Close', {
          duration: 5000
        });
      }
    });
  }
}
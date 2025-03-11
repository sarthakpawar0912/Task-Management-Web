import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { title } from 'process';

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
  listofTasks: Task[] = [];
  searchForm!: FormGroup;
  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!StorageService.getToken()) {
      this.snackBar.open('Please log in to access this page.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.router.navigateByUrl('/login');
      return;
    }
    this.getTasks();
    this.searchForm = this.fb.group({
    title:[null]})
  }

  getTasks(): void {
    this.service.getAllTasks().subscribe({
      next: (res) => {
        console.log('Tasks from API:', res); // ✅ Debugging
        this.listofTasks = res;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }
  

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe((res) => {
      this.snackBar.open('Task deleted successfully', 'Close', {
        duration: 5000,
      });
      this.getTasks();
    });
  }

  searchTask() {
    const title = this.searchForm.get('title')?.value?.trim();
  
    if (!title) {
      this.getTasks(); // Reset list when search is empty
      return;
    }
  
    this.service.searchTask(title).subscribe({
      next: (res) => {
        console.log("Search results for:", title, res);
        this.listofTasks = res;
      },
      error: (err) => {
        console.error("Error fetching search results:", err);
        this.listofTasks = []; // Reset list on error
      }
    });
  }
  
  
  
  
}
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  standalone: false,
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {

 
  taskId: number = 0;
  taskData: any;
  comments: any[] = [];
  commentForm!: FormGroup;

  constructor(
    private service: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  
    if (this.taskId) {
      this.getTaskById();
      this.getComments();
      this.commentForm = this.fb.group({
        content: ['', Validators.required],
      });
    } else {
      this.snackBar.open('Task ID not found!', 'Close', { duration: 3000 });
    }
  }

  getTaskById() {
    this.service.getTaskById(this.taskId).subscribe({
      next: (res) => {
        this.taskData = res;
        localStorage.setItem('taskData', JSON.stringify(res)); // Persist data
      },
      error: (err) => {
        console.error('Error fetching task:', err);
        this.snackBar.open('Failed to load task details.', 'Close', { duration: 3000 });
      }
    });
  }

  getComments() {
    this.service.getCommentsByTask(this.taskId).subscribe({
      next: (res) => {
        this.comments = res ?? [];
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      }
    });
  }

  publishComment() {
    if (this.commentForm.invalid) return;

    const content = this.commentForm.get('content')?.value;

    this.service.createComment(this.taskId, content).subscribe({
      next: (res) => {
        if (res?.id) {
          this.snackBar.open('Comment posted successfully', 'Close', { duration: 3000 });
          this.commentForm.reset();
          this.comments.unshift(res); // Add the new comment to the top of the list
        } else {
          this.snackBar.open('Something went wrong', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error posting comment:', err);
        this.snackBar.open('Failed to post comment. Try again.', 'Close', { duration: 3000 });
      },
    });
  }

  trackByCommentId(index: number, comment: any) {
    return comment.id;
  }
}

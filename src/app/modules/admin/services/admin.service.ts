import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/'; // Adjust the base URL if necessary

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    if (!token) {
      console.warn('No token found! Requests may fail.');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(BASE_URL + "api/admin/users", {
      headers: this.createAuthorizationHeader(),
    });
  }

  postTask(taskDTO: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL}api/admin/task`, taskDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}api/admin/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}api/admin/tasks`, {
      headers: this.createAuthorizationHeader(),
    });
  }


  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}api/admin/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCommentsByTask(taskId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}api/admin/comments/${taskId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }


  
  createComment(taskId: number, content: string): Observable<any> {
    const body = { content }; // Send JSON body
    return this.http.post<any>(`${BASE_URL}api/admin/task/comment/${taskId}`, body, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateTask(id: number, taskDTO: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL}api/admin/task/${id}`, taskDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  searchTask(title: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}api/admin/task/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  
}
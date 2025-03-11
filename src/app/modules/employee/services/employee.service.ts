import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080/'; // Adjust the base URL if necessary
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeTaskById():Observable<any[]>{
    return this.http.get<any[]>(`${BASIC_URL}api/employee/tasks`,{headers:this.createAuthorizationHeader()});
  }


  updateStatus(id: number, status: string): Observable<any> {
    return this.http.get<any>(
      `${BASIC_URL}api/employee/task/updateStatus?id=${id}&status=${status}`,
      { headers: this.createAuthorizationHeader() }
    );
  }

  
    getTaskById(id: number): Observable<any> {
      return this.http.get<any>(`${BASIC_URL}api/employee/task/${id}`, {
        headers: this.createAuthorizationHeader(),
      });
    }
  
    getCommentsByTask(taskId: number): Observable<any[]> {
      return this.http.get<any[]>(`${BASIC_URL}api/employee/comments/${taskId}`, {
        headers: this.createAuthorizationHeader(),
      });
    }
  
    createComment(taskId: number, content: string): Observable<any> {
      const body = { content }; // Send JSON body
      return this.http.post<any>(`${BASIC_URL}api/employee/task/comment/${taskId}`, body, {
        headers: this.createAuthorizationHeader(),
      });
    }
   
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
}

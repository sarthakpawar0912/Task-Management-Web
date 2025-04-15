import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static isLocalStorageAvailable(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  static saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string {
    if (!this.isLocalStorageAvailable()) return ''; // Ensure localStorage is available
    const token = localStorage.getItem(TOKEN) || '';
    console.log("Retrieved Token from Storage:", token); // Debugging
    return token;
  }

  static getUser(): any {
    if (!this.isLocalStorageAvailable()) return null;
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role || '' : ''; // Ensure user exists before accessing properties
  }


  static isAdminLoggedIn(): boolean {
    if (!this.isLocalStorageAvailable()) return false;
    const token = this.getToken();
    if (!token) return false; // Ensure token is not empty
    return this.getUserRole() === "ADMIN";
  }

  static isEmployeeLoggedIn(): boolean {
    if (!this.isLocalStorageAvailable()) return false;
    const token = this.getToken();
    if (!token) return false; // Ensure token is not empty
    return this.getUserRole() === "EMPLOYEE";
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id || '' : ''; // Ensure user exists before accessing ID
  }

  static logout(): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
  
}

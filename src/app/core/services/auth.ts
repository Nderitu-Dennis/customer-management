import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(`${this.base}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.base}/register`, data);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  registerFormData(formData: FormData) {
  return this.http.post(`${this.base}/register`, formData);
}
}
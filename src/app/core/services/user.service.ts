import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient) {}

  getAllUsers() { return this.http.get<any[]>(`${this.base}/users`); }
}
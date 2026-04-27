import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private base = 'http://localhost:8090/api/customers';

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<any[]>(this.base); }

  add(customer: any) { return this.http.post(this.base, customer); }
  
  delete(id: string) { return this.http.delete(`${this.base}/${id}`); }
}
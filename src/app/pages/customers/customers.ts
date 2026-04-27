import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../core/services/customer';
import { AuthService } from '../../core/services/auth';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customers.html'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  msg = '';

  form: any;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private customerSvc: CustomerService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      custName: ['', Validators.required],
      custAdd: ['', Validators.required],

      custPhone: ['', [Validators.required, 
        Validators.pattern(/^\d{10}$/),
      Validators.maxLength(10)]],
      
      custEmail: ['', [Validators.required, Validators.email]],
      custType: ['', Validators.required]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.customerSvc.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load customers', err)
    });
  }

  addCustomer() {
    if (this.form.invalid) return;
    this.customerSvc.add(this.form.value).subscribe({
      next: () => { this.msg = 'Customer added!'; this.form.reset(); this.load(); },
      error: () => this.msg = 'Failed to add customer'
    });
  }

  delete(id: string) {
    this.customerSvc.delete(id).subscribe(() => this.load());
  }
}
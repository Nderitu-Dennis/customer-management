import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { AuthService } from '../../core/services/auth';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customers.html',
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  customerForm: any;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private customerSvc: CustomerService,
    private cdr: ChangeDetectorRef,
  ) {
    this.customerForm = this.fb.group({
      custName: ['',
         [Validators.required,
          Validators.minLength(4),
           Validators.pattern(/^[a-zA-Z\s]+$/)]],

      custAdd: ['', Validators.required],

      custPhone: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)],
      ],

      custEmail: ['', [Validators.required, Validators.email]],
      custType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.customerSvc.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load customers', err),
    });
  }

  addCustomer() {
    if (this.customerForm.invalid) return;
    this.customerSvc.add(this.customerForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon:'success',
          text:'Customer added successfully!',
          title:'Success'
        }).then(()=>{
        this.customerForm.reset();
        this.load();
      })},
      error: () => {
        Swal.fire({
          icon:'error',
          text:'Failed to add customers'
        })
      },
    });
  }

  delete(id: string) {
    Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be reverted",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete!'
  }).then((result) =>{
if(result.isConfirmed){
  this.customerSvc.delete(id).subscribe({
    next: ()=>{
      this.load();
      Swal.fire({
        title:'success',
            text:'Customer deleted successfully!',
            icon:'success'
      }
          );
    },
    error: (err) => {
          console.error(err);
          Swal.fire(
            'Error!',
            'Something went wrong while deleting.',
            'error'
          );
        }});
      }
    })}
  }

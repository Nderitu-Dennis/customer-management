import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth'; //todo visit this
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {
  registrationForm: any;
  msg = '';
  selectedPhoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],

      userPhone: ['', [Validators.required,
         Validators.pattern(/^\d{10}$/),
        Validators.maxLength(10)]],
        
      userEmail: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    });
  
  }

  onPhotoSelected(event: any) {
    this.selectedPhoto = event.target.files[0] || null;
  }

  submit() {
    if (this.registrationForm.invalid) return;

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(this.registrationForm.value)], { type: 'application/json' }));
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.auth.registerFormData(formData).subscribe({
      next: () => { this.msg = 'Registered! Redirecting...'; setTimeout(() => this.router.navigate(['/login']), 1500); },
      error: () => this.msg = 'Registration failed',
    });
  }
}

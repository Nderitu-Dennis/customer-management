import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth'; //todo visit this
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {
  registrationForm: any;
  selectedPhoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],

      userPhone: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)],
      ],

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
    formData.append(
      'data',
      new Blob([JSON.stringify(this.registrationForm.value)], { type: 'application/json' }),
    );
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.auth.registerFormData(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          text: 'Registration successful!',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          text: 'Registration failed!',
        });
      },
    });
  }
}

/* ====NOTE====
todo -why photo has to be sent as form data? why not json? - because we are sending a file and json cannot handle files. FormData is used to send files along with other data in a multipart/form-data format. but You can technically send files in JSON using
Base64 encoding, but it is not efficient and can lead to larger payloads. FormData is more suitable for this use case.
*/

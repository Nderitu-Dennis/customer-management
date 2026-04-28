import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    //todo check this form thing fb
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      userName: ['',
         [Validators.required,
           Validators.minLength(5)]],

      password: ['',
         [Validators.required,
           Validators.minLength(5)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        Swal.fire({
          icon: 'success',
          text: 'Login Success!',
        }).then(() => {
          //then-> navigation waits until user dismisses alert
          // success runs b4 redirect
          // admin  goes to dashboard User goes to customers
          this.router.navigate([res.role === 'ADMIN' ? '/dashboard' : '/customers']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          text: 'Invalid Credentials',
        });
      },
    });
  }
}

import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(
    public auth: AuthService,
    private userSvc: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userSvc.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users loaded:', this.users);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }
}

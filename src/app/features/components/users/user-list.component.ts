import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';
import { UserService } from '@core/services/user.service';
import { LoadingErrorWrapperComponent } from "@shared/components/loading-error-wrapper/loading-error-wrapper.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, LoadingErrorWrapperComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    return this.userService.fetchUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
    })
  }
}
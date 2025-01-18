import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '@shared/models/user.model';
import { UserService } from '@core/services/user.service';
import { LoadingErrorWrapperComponent } from "../../../shared/components/loading-error-wrapper/loading-error-wrapper.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, LoadingErrorWrapperComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isError: boolean = false;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    return this.userService.fetchUsers().subscribe({
      next: (data: User[]) => {
        this.isError = false;
        this.users = data;
      },
      error: (_) => {
        this.isError = true;
      }
    })
  }
}
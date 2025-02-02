import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingErrorWrapperComponent } from "@shared/components/loading-error-wrapper/loading-error-wrapper.component";
import { User } from '@shared/models/user.model';
import { UserService } from '@core/services/user.service';
import { BreadcrumbsComponent } from "@shared/components/breadcrumbs/breadcrumbs.component";
import Breadcrumb from '@shared/models/breadcrumb.model';

@Component({
  selector: 'app-user-detail',
  imports: [LoadingErrorWrapperComponent, BreadcrumbsComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  userId: number | null = null;
  breadcrumbs: Breadcrumb[] = [
    { label: 'Users', url: '/' },
    { label: 'User Detail', url: '' },
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.params['id']);
    this.fetchUserDetail()
  }

  fetchUserDetail() {
    if (this.userId === null) return;

    return this.userService.fetchUserDetail(this.userId).subscribe({
      next: (data: User) => {
        this.user = data;
      },
    })
  }

  get transformedBS(): string {
    return this.user?.company?.bs.replace(/ /g, ', ') || '';
  }
}

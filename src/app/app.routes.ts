import { Routes } from '@angular/router';
import { UserListComponent } from '@features/components/users/user-list.component';
import { UserDetailComponent } from '@features/components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
];

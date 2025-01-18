import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '@core/services/user.service';
import { of } from 'rxjs';
import { User } from '@shared/models/user.model';
import { LoadingErrorWrapperComponent } from '@shared/components/loading-error-wrapper/loading-error-wrapper.component';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { usersResponse } from '@test/mock-data/users.mock';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = usersResponse;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['fetchUsers']);

    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        LoadingErrorWrapperComponent,
        NgFor,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockUserService.fetchUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUsers on init', () => {
    expect(mockUserService.fetchUsers).toHaveBeenCalled();
  });

  it('should display a list of users', () => {
    const compiled = fixture.nativeElement;

    // in Jest, I usually just use .toMatchSnapshot() for this kind of test (making sure the rendered output is correct)
    // I saw that jasmine doesn't really have a built-in snapshot feature
    // Though there is a jasmine snapshot plugin, but I'm not sure if it's a good practice to use it
    // https://github.com/horvay/jasmine-snapshot
    expect(compiled.querySelectorAll('[data-test="user-row"]').length).toBe(mockUsers.length);
    mockUsers.forEach((user, index) => {
      expect(compiled.querySelectorAll('[data-test="name"]')[index].textContent).toContain(user.name);
      expect(compiled.querySelectorAll('[data-test="email"]')[index].textContent).toContain(user.email);
      expect(compiled.querySelectorAll('[data-test="website"]')[index].textContent).toContain(user.website);
    })
  });

  // showing loading, error message, and retry function is not really this component's responsibility
  // it's loading-error-wrapper component's responsibility
  // so the test to show loading, error, or retry function will be in loading-error-wrapper component spec instead of this component spec
});

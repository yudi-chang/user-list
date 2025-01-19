import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '@core/services/user.service';
import { of } from 'rxjs';
import { User } from '@shared/models/user.model';
import { LoadingErrorWrapperComponent } from '@shared/components/loading-error-wrapper/loading-error-wrapper.component';
import { NgFor, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { usersResponse } from '@test/mock-data/users.mock';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let router: Router;
  let location: Location;

  const mockUsers: User[] = usersResponse;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['fetchUsers']);

    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        LoadingErrorWrapperComponent,
        NgFor,
        RouterModule.forRoot([
          { path: 'user/:id', component: UserDetailComponent },
        ])
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

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

  it('should navigate to user detail page when view detail is clicked', async () => {
    const userDetailLink = fixture.debugElement.queryAll(By.css('[data-test="user-detail-link"]'));

    userDetailLink[0].nativeElement.click();

    await fixture.whenStable();
    fixture.detectChanges();
    
    expect(location.path()).toBe(`/user/${mockUsers[0].id}`);

    // test click other user detail link
    // though can test all user detail link click (using forEach), I dont think it's necessary, just pick 1 other url should suffice
    userDetailLink[9].nativeElement.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(location.path()).toBe(`/user/${mockUsers[9].id}`);
  });

  // showing loading, error message, and retry function is not really this component's responsibility
  // it's loading-error-wrapper component's responsibility
  // so the test to show loading, error, or retry function will be in loading-error-wrapper component spec instead of this component spec
});

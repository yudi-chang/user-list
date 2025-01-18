import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '@core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { User } from '@shared/models/user.model';
import { RouterModule } from '@angular/router';
import { userDetailResponse } from '@test/mock-data/user-detail.mock';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockUser: User = userDetailResponse;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['fetchUserDetail']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    mockActivatedRoute.snapshot = { params: { id: '1' } } as any;

    await TestBed.configureTestingModule({
      imports: [
        UserDetailComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    mockUserService.fetchUserDetail.and.returnValue(of(mockUser));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUserDetail on init', () => {
    expect(mockUserService.fetchUserDetail).toHaveBeenCalledWith(1);
  });

  it('should render user details correctly', () => {
    const compiled = fixture.nativeElement;

    // in Jest, I usually just use .toMatchSnapshot() for this kind of test (making sure the rendered output is correct)
    // I saw that jasmine doesn't really have a built-in snapshot feature
    // Though there is a jasmine snapshot plugin, but I'm not sure if it's a good practice to use it
    // https://github.com/horvay/jasmine-snapshot
    expect(compiled.querySelector('[data-test="user-name"]').textContent).toContain(mockUser.name);
    expect(compiled.querySelector('[data-test="username"]').textContent).toContain(mockUser.username);
    expect(compiled.querySelector('[data-test="email"]').textContent).toContain(mockUser.email);
    expect(compiled.querySelector('[data-test="phone"]').textContent).toContain(mockUser.phone);
    expect(compiled.querySelector('[data-test="website"]').textContent).toContain(mockUser.website);
    expect(compiled.querySelector('[data-test="adress-street"]').textContent).toContain(mockUser.address.street);
    expect(compiled.querySelector('[data-test="address-suite"]').textContent).toContain(mockUser.address.suite);
    expect(compiled.querySelector('[data-test="address-city"]').textContent).toContain(mockUser.address.city);
    expect(compiled.querySelector('[data-test="address-zipcode"]').textContent).toContain(mockUser.address.zipcode);
    expect(compiled.querySelector('[data-test="location"]').textContent).toContain(`${mockUser.address.geo.lat}, ${mockUser.address.geo.lng}`);
    expect(compiled.querySelector('[data-test="company-name"]').textContent).toContain(mockUser.company.name);
    expect(compiled.querySelector('[data-test="company-catchPhrase"]').textContent).toContain(mockUser.company.catchPhrase);
    expect(compiled.querySelector('[data-test="company-bs"]').textContent).toContain(mockUser.company.bs.replace(/ /g, ', '));
  });

  // showing loading, error message, and retry function is not really this component's responsibility
  // it's loading-error-wrapper component's responsibility
  // so the test to show loading, error, or retry function will be in loading-error-wrapper component spec instead of this component spec
});

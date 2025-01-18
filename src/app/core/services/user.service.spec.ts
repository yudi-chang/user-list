import { TestBed } from '@angular/core/testing'; 
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '@shared/models/user.model';
import { usersResponse } from '@test/mock-data/users.mock';
import { userDetailResponse } from '@test/mock-data/user-detail.mock';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchUsers', () => {
    it('should fetch users list', () => {
      const mockUsers: User[] = usersResponse;

      service.fetchUsers().subscribe((users) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('fetchUserDetail', () => {
    it('should fetch users details with correct id', () => {
      const userId = 1;
      const mockUser: User = userDetailResponse;

      service.fetchUserDetail(userId).subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });
});
